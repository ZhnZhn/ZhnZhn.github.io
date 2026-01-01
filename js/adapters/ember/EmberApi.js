"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _mathFn = require("../../math/mathFn");
var _CategoryFn = require("../CategoryFn");
var _AdapterFn = require("../AdapterFn");
var _fnAdapter = require("./fnAdapter");
var _fCrLineCategoryUrl = _interopRequireDefault(require("../fCrLineCategoryUrl"));
const API_URL = "https://ember-data-api-scg3n.ondigitalocean.app/ember",
  GENERATION = "generation",
  JSON_TOKEN = "json",
  YEARLY_SUFFIX = `yearly.${JSON_TOKEN}`,
  MONTHLY_SUFFIX = `monthly.${JSON_TOKEN}`,
  YEARLY_JSON = `${GENERATION}_${YEARLY_SUFFIX}`,
  MONTHLY_JSON = `${GENERATION}_${MONTHLY_SUFFIX}`,
  US_YEARLY_JSON = `${GENERATION}_usa_${YEARLY_SUFFIX}`,
  US_MONTHLY_JSON = `${GENERATION}_usa_${MONTHLY_SUFFIX}`,
  QUERY_ARRAY_TAIL = "&_shape=array",
  DATE = "date",
  YEAR = "year";
const DATA_URL = "./data/ember",
  [_crTimeSeriesLineUrl, _crTimeSeriesCategoryUrl] = (0, _fCrLineCategoryUrl.default)(DATA_URL);
const _fCrProperty = suffix => (name, value) => `${name}__${suffix}=${value}`,
  _crExactProperty = _fCrProperty("exact"),
  _crGteProperty = _fCrProperty("gte"),
  _crDateProperty = options => _crExactProperty(options.pnDate, options.time);

// geo, _sourceQuery
const _crSourceQueryParam = option => {
  const source = (0, _fnAdapter.getSourceValue)(option);
  return (0, _fnAdapter.isTotalData)(source) ? "" : `&${_crExactProperty("variable", source)}`;
};
const _fCrUrl = geoParamName => (pathToken, option) => `${API_URL}/${pathToken}?${_crExactProperty(geoParamName, (0, _fnAdapter.getGeoCaption)(option))}${QUERY_ARRAY_TAIL}`,
  _crUrl = _fCrUrl("country_or_region"),
  _crUsUrl = _fCrUrl("state");
const _getPathToken = (isMonthlyRoute, option) => {
  const [monthlyToken, yearlyToken] = (0, _fnAdapter.isUsRoute)(option) ? [US_MONTHLY_JSON, US_YEARLY_JSON] : [MONTHLY_JSON, YEARLY_JSON];
  return isMonthlyRoute ? monthlyToken : yearlyToken;
};
const _crRouteApiUrl = (isMonthlyRoute, option) => {
  const pathToken = _getPathToken(isMonthlyRoute, option),
    crUrlRoute = (0, _fnAdapter.isUsRoute)(option) ? _crUsUrl : _crUrl;
  return crUrlRoute(pathToken, option);
};
const _crCategoryUrl = (isMonthlyRoute, option) => {
  const _sourceQuery = _crSourceQueryParam(option),
    _queryToken = `${_crDateProperty(option)}${QUERY_ARRAY_TAIL}`,
    pathToken = _getPathToken(isMonthlyRoute, option);
  return `${API_URL}/${pathToken}?${_queryToken}${_sourceQuery}`;
};
const _crTreeMapUrl = (isMonthlyRoute, option) => {
  option.dfTmTitle = (0, _fnAdapter.getMetricCaption)(option);
  return `${_crRouteApiUrl(isMonthlyRoute, option)}&${_crDateProperty(option)}`;
};
const _crLineUrl = (isMonthlyRoute, option) => {
  const queryDateParam = isMonthlyRoute ? `&${_crGteProperty(DATE, option.fromDate)}` : "";
  return `${_crRouteApiUrl(isMonthlyRoute, option)}${_crSourceQueryParam(option)}${queryDateParam}`;
};
const _crTimeSeriesTreeMapUrl = (option, _isTreeMap) => {
  const {
      items,
      time
    } = option,
    geo = (0, _AdapterFn.getValue)(items[0]),
    metricItem = items[2],
    metricCaption = (0, _AdapterFn.getCaption)(metricItem),
    metricValue = (0, _AdapterFn.getValue)(metricItem);
  if (metricItem.isTm !== 1) {
    throw (0, _AdapterFn.crErrorByMessage)(`TreeMap and Bar charts by Source for ${metricCaption} not available`);
  }
  if (!(0, _mathFn.isInRange)((0, _isTypeFn.parseIntBy10)(time), 2020, 2025)) {
    const _typeOfChartToken = _isTreeMap ? 'TreeMap' : 'Bar by Source';
    throw (0, _AdapterFn.crErrorByMessage)(`${_typeOfChartToken} only available for 2021-2024`);
  }
  if (!_isTreeMap) {
    option.subtitle = option.title;
    option.title = metricCaption;
  }
  return `${DATA_URL}/${metricValue}-tm/${geo}-${time}.json`;
};
const EmberApi = {
  getRequestUrl(option) {
    if ((0, _fnAdapter.isTsRoute)(option)) {
      const _isTreeMap = (0, _CategoryFn.isTreeMap)(option);
      return _isTreeMap || (0, _CategoryFn.isBarTreeMap)(option) ? _crTimeSeriesTreeMapUrl(option, _isTreeMap) : (0, _CategoryFn.isCategory)(option) ? _crTimeSeriesCategoryUrl(option) : _crTimeSeriesLineUrl(option);
    }
    const _isMonthlyRoute = option.dfRId === "M",
      _crUrl = (0, _CategoryFn.isTreeMap)(option) || (0, _CategoryFn.isBarTreeMap)(option) ? _crTreeMapUrl : (0, _CategoryFn.isCategory)(option) ? _crCategoryUrl : _crLineUrl;
    option.pnDate = _isMonthlyRoute ? DATE : YEAR;
    if (_isMonthlyRoute) {
      option.time = option.time + "-01";
    }
    return _crUrl(_isMonthlyRoute, option);
  },
  checkResponse(json) {
    if (!(0, _isTypeFn.isArr)(json) && !(0, _isTypeFn.isArr)((json || {}).data)) {
      throw (0, _fnAdapter.crError)();
    }
  }
};
var _default = exports.default = EmberApi;
//# sourceMappingURL=EmberApi.js.map