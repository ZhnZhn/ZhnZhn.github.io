"use strict";

exports.__esModule = true;
exports.default = void 0;
var _fnAdapter = require("./fnAdapter");
const API_URL = 'https://ember-data-api-scg3n.ondigitalocean.app/ember',
  YEARLY_JSON = 'generation_yearly.json',
  MONTHLY_JSON = 'generation_monthly.json',
  QUERY_TAIL = '&_shape=array';
const _fCrProperty = suffix => (name, value) => name + "__" + suffix + "=" + value,
  _crExactProperty = _fCrProperty('exact'),
  _crGteProperty = _fCrProperty('gte');

// geo, _sourceQuery
const _crQueryParams = options => {
  const source = (0, _fnAdapter.getSourceValue)(options);
  return [(0, _fnAdapter.getGeoCaption)(options), (0, _fnAdapter.isTotalData)(source) ? '' : "&" + _crExactProperty('variable', source)];
};
const _crUrl = (pathToken, options) => {
  const [geo, sourceQuery] = _crQueryParams(options);
  return API_URL + "/" + pathToken + "?" + _crExactProperty('country_or_region', geo) + QUERY_TAIL + sourceQuery;
};
const DATE = 'date',
  YEAR = 'year';
const _crCategoryUrl = (isMonthlyRoute, options) => {
  if (isMonthlyRoute) {
    options.time = options.time + '-01';
  }
  const _sourceQuery = _crQueryParams(options)[1],
    _queryTail = "" + QUERY_TAIL + _sourceQuery,
    _date = options.time;
  return isMonthlyRoute ? API_URL + "/" + MONTHLY_JSON + "?" + _crExactProperty(DATE, _date) + _queryTail : API_URL + "/" + YEARLY_JSON + "?" + _crExactProperty(YEAR, _date) + _queryTail;
};
const _crTreeMapUrl = (isMonthlyRoute, options) => {
  const _date = options.time,
    geo = _crQueryParams(options)[0];
  options.dfTmTitle = (0, _fnAdapter.getMetricCaption)(options);
  return API_URL + "/" + YEARLY_JSON + "?" + _crExactProperty(YEAR, _date) + "&" + _crExactProperty('country_or_region', geo) + QUERY_TAIL;
};
const EmberApi = {
  getRequestUrl(options) {
    const _isMonthlyRoute = options.dfRId === 'M';
    options.pnDate = _isMonthlyRoute ? DATE : YEAR;
    return (0, _fnAdapter.isTreeMap)(options.seriaType) ? _crTreeMapUrl(_isMonthlyRoute, options) : (0, _fnAdapter.isCategory)(options.seriaType) ? _crCategoryUrl(_isMonthlyRoute, options) : _isMonthlyRoute ? _crUrl(MONTHLY_JSON, options) + "&" + _crGteProperty(DATE, options.fromDate) : _crUrl(YEARLY_JSON, options);
  },
  checkResponse(json) {
    if (!(0, _fnAdapter.isArr)(json)) {
      throw (0, _fnAdapter.crError)('', 'There are no data');
    }
  }
};
var _default = exports.default = EmberApi;
//# sourceMappingURL=EmberApi.js.map