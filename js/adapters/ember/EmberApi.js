"use strict";

exports.__esModule = true;
exports.default = void 0;
var _fnAdapter = require("./fnAdapter");
const API_URL = 'https://ember-data-api-scg3n.ondigitalocean.app/ember',
  GENERATION = "generation",
  JSON_TOKEN = "json",
  YEARLY_SUFFIX = `yearly.${JSON_TOKEN}`,
  MONTHLY_SUFFIX = `monthly.${JSON_TOKEN}`,
  YEARLY_JSON = `${GENERATION}_${YEARLY_SUFFIX}`,
  MONTHLY_JSON = `${GENERATION}_${MONTHLY_SUFFIX}`,
  US_YEARLY_JSON = `${GENERATION}_usa_${YEARLY_SUFFIX}`,
  US_MONTHLY_JSON = `${GENERATION}_usa_${MONTHLY_SUFFIX}`
  //, QUERY_TAIL = "&_sort=rowid&_shape=array"
  ,
  QUERY_TAIL = "&_shape=array",
  DATE = 'date',
  YEAR = 'year';
const _fCrProperty = suffix => (name, value) => `${name}__${suffix}=${value}`,
  _crExactProperty = _fCrProperty('exact'),
  _crGteProperty = _fCrProperty('gte'),
  _crDateProperty = options => _crExactProperty(options.pnDate, options.time);

// geo, _sourceQuery
const _crSourceQueryParam = option => {
  const source = (0, _fnAdapter.getSourceValue)(option);
  return (0, _fnAdapter.isTotalData)(source) ? '' : `&${_crExactProperty('variable', source)}`;
};
const _fCrUrl = geoParamName => (pathToken, options) => `${API_URL}/${pathToken}?${_crExactProperty(geoParamName, (0, _fnAdapter.getGeoCaption)(options))}${QUERY_TAIL}`,
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
    pathToken = _getPathToken(isMonthlyRoute, option);
  return `${API_URL}/${pathToken}?${_crDateProperty(option)}${QUERY_TAIL}${_sourceQuery}`;
};
const _crTreeMapUrl = (isMonthlyRoute, option) => {
  option.dfTmTitle = (0, _fnAdapter.getMetricCaption)(option);
  return `${_crRouteApiUrl(isMonthlyRoute, option)}&${_crDateProperty(option)}`;
};
const _crLineUrl = (isMonthlyRoute, option) => {
  const queryDateParam = isMonthlyRoute ? `&${_crGteProperty(DATE, option.fromDate)}` : '';
  return `${_crRouteApiUrl(isMonthlyRoute, option)}${_crSourceQueryParam(option)}${queryDateParam}`;
};
const EmberApi = {
  getRequestUrl(option) {
    const {
        seriaType
      } = option,
      _isMonthlyRoute = option.dfRId === 'M',
      _crUrl = (0, _fnAdapter.isTreeMap)(seriaType) ? _crTreeMapUrl : (0, _fnAdapter.isCategory)(seriaType) ? _crCategoryUrl : _crLineUrl;
    option.pnDate = _isMonthlyRoute ? DATE : YEAR;
    if (_isMonthlyRoute) {
      option.time = option.time + '-01';
    }
    return _crUrl(_isMonthlyRoute, option);
  },
  checkResponse(json) {
    if (!(0, _fnAdapter.isArr)(json)) {
      throw (0, _fnAdapter.crError)();
    }
  }
};
var _default = exports.default = EmberApi;
//# sourceMappingURL=EmberApi.js.map