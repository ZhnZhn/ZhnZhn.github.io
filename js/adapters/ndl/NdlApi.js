"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
const API_V3 = 'https://data.nasdaq.com/api/v3',
  SET_URL = `${API_V3}/datasets/`,
  TABLE_URL = `${API_V3}/datatables/`,
  LIMIT_REMAINING = 'X-RateLimit-Remaining';
const _crIdB_A = items => `${(0, _AdapterFn.getValue)(items[1])}_${(0, _AdapterFn.getValue)(items[0])}`;
const _rIdFn = {
  df: items => (0, _AdapterFn.getValue)(items[0]),
  ab: items => `${(0, _AdapterFn.getValue)(items[0])}${(0, _AdapterFn.getValue)(items[1])}`,
  jg: items => `JODI/GAS_${_crIdB_A(items)}`,
  jo: items => `JODI/OIL_${(0, _AdapterFn.getValue)(items[1])}${(0, _AdapterFn.getValue)(items[2])}_${(0, _AdapterFn.getValue)(items[0])}`
};
const _crQueryToken = (name, value) => value ? `&${name}=${value}` : '',
  _crApiKeyQuery = option => _crQueryToken('api_key', option.apiKey);
const _crSetUrl = option => {
  const {
      proxy,
      items,
      fromDate,
      dfIdFn,
      dfDbId
    } = option,
    _crId = dfIdFn && _rIdFn[dfIdFn] || _rIdFn.df,
    id = _crId(items),
    tokenPath = dfDbId ? dfDbId + '/' : '',
    _trimStartQuery = _crQueryToken('trim_start', fromDate),
    _apiKeyQuery = _crApiKeyQuery(option);
  return `${proxy}${SET_URL}${tokenPath}${id}.json?sort_order=asc${_apiKeyQuery}${_trimStartQuery}`;
};
const _crTableUrl = option => {
  const {
      proxy,
      dfTable,
      dfFromDate,
      value,
      key,
      fromDate
    } = option,
    _apiKeyQuery = _crApiKeyQuery(option),
    _dateQuery = dfFromDate ? _crQueryToken('date.gte', fromDate) : '';
  option.key = key || value;
  return `${proxy}${TABLE_URL}${dfTable}.json?${value || ''}${_apiKeyQuery}${_dateQuery}`;
};
const _checkErr = err => {
  if (err) {
    throw (0, _AdapterFn.crError)('', err.message);
  }
};
const _checkDataEmpty = (dataset, datatable) => {
  if (!dataset && !datatable) {
    throw (0, _AdapterFn.crError)();
  }
};
const _checkDataset = (dataset, datatable) => {
  const {
    data,
    newest_available_date,
    oldest_available_date
  } = dataset || datatable || {};
  if (!(0, _AdapterFn.isArr)(data) || data.length === 0) {
    throw (0, _AdapterFn.crError)('', `Result dataset for request is empty:
        Newest Date: ${newest_available_date || ''}
        Oldest Date: ${oldest_available_date || ''}`);
  }
};
const NdlApi = {
  getRequestUrl(option) {
    return option.dfTable ? _crTableUrl(option) : _crSetUrl(option);
  },
  // headers && headers.get existed
  getLimitRemaiming: headers => headers.get(LIMIT_REMAINING),
  checkResponse(json) {
    const {
      quandl_error,
      dataset,
      datatable
    } = json || {};
    _checkErr(quandl_error);
    _checkDataEmpty(dataset, datatable);
    _checkDataset(dataset, datatable);
  }
};
var _default = exports.default = NdlApi;
//# sourceMappingURL=NdlApi.js.map