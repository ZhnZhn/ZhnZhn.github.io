"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
const API_V3 = 'https://data.nasdaq.com/api/v3',
  SET_URL = API_V3 + "/datasets/",
  TABLE_URL = API_V3 + "/datatables/",
  LIMIT_REMAINING = 'X-RateLimit-Remaining',
  _isArr = Array.isArray;
const _crIdB_A = items => (0, _AdapterFn.getValue)(items[1]) + "_" + (0, _AdapterFn.getValue)(items[0]);
const _rIdFn = {
  df: items => (0, _AdapterFn.getValue)(items[0]),
  ab: items => "" + (0, _AdapterFn.getValue)(items[0]) + (0, _AdapterFn.getValue)(items[1]),
  b_a: _crIdB_A,
  jg: items => "JODI/GAS_" + _crIdB_A(items),
  jo: items => "JODI/OIL_" + (0, _AdapterFn.getValue)(items[1]) + (0, _AdapterFn.getValue)(items[2]) + "_" + (0, _AdapterFn.getValue)(items[0])
};
const _crSetUrl2 = _ref => {
  let {
    proxy,
    items,
    fromDate,
    apiKey,
    dfIdFn,
    dfDbId
  } = _ref;
  const _crId = dfIdFn && _rIdFn[dfIdFn] || _rIdFn.df,
    id = _crId(items),
    tokenPath = dfDbId ? dfDbId + '/' : '',
    queryTail = fromDate ? "&trim_start=" + fromDate : '';
  return "" + proxy + SET_URL + tokenPath + id + ".json?sort_order=asc&api_key=" + apiKey + queryTail;
};
const _addTo = (q, pN, pV) => pV ? q ? q + "&" + pN + "=" + pV : pN + "=" + pV : q || '';
const _crSetUrl = _ref2 => {
  let {
    proxy,
    value,
    fromDate,
    toDate,
    apiKey,
    transform
  } = _ref2;
  let _q = 'sort_order=asc';
  _q = _addTo(_q, 'trim_start', fromDate);
  _q = _addTo(_q, 'trim_end', toDate);
  _q = _addTo(_q, 'transform', transform);
  _q = _addTo(_q, 'api_key', apiKey);
  return "" + proxy + SET_URL + value + ".json?" + _q;
};
const _crTableUrl = option => {
  const {
      proxy,
      dfTable,
      dfFromDate,
      value,
      key,
      fromDate,
      apiKey
    } = option,
    _dateQuery = dfFromDate && fromDate ? "&date.gte=" + fromDate : '';
  option.key = key || value;
  return "" + proxy + TABLE_URL + dfTable + ".json?" + (value || '') + "&api_key=" + apiKey + _dateQuery;
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
  if (!_isArr(data) || data.length === 0) {
    throw (0, _AdapterFn.crError)('', "Result dataset for request is empty:\n        Newest Date: " + (newest_available_date || '') + "\n        Oldest Date: " + (oldest_available_date || ''));
  }
};
const NdlApi = {
  getRequestUrl(option) {
    return option.dfTable ? _crTableUrl(option) : option.items && !option.value ? _crSetUrl2(option) : _crSetUrl(option);
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