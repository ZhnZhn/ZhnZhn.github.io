"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
const API_URL = 'https://api.intrinio.com/historical_data',
  TAIL = 'item=level',
  RES_ERR_STATUS = [401];
const FRQ = {
  A: 'yearly',
  Q: 'quarterly',
  W: 'weekly',
  D: 'daily',
  M: 'monthly',
  DF: 'monthly'
};
const _getErr = json => json && (0, _AdapterFn.isArr)(json.errors) && json.errors[0];
const _crUrl = (identifier, fromDate) => API_URL + "?identifier=" + identifier + "&start_date=" + fromDate;
const IntrinioApi = {
  crOptionFetch(option) {
    const {
      apiKey
    } = option;
    return {
      headers: {
        'X-Authorization-Public-Key': apiKey
      }
    };
  },
  getRequestUrl(option) {
    const {
      fromDate,
      toDate,
      one,
      two,
      three = 'QTR',
      items
    } = option;
    let {
      value,
      item = {}
    } = option;
    option.resErrStatus = RES_ERR_STATUS;
    if (two) {
      return _crUrl(one, fromDate) + "&item=" + two + "&end_date=" + toDate + "&type=" + three;
    }
    if ((0, _AdapterFn.isArr)(items)) {
      option.item = item = items[0];
      option.value = value = (0, _AdapterFn.getValue)(item);
    }
    const _frq = FRQ[item.frq] || FRQ.DF;
    return _crUrl(value, fromDate) + "&frequency=" + _frq + "&" + TAIL;
  },
  checkResponse(json) {
    const _jsonErr = _getErr(json);
    if (_jsonErr) {
      throw (0, _AdapterFn.crError)(_jsonErr.human, _jsonErr.message);
    }
    if (!(0, _AdapterFn.isArr)(json.data)) {
      throw (0, _AdapterFn.crError)();
    }
  }
};
var _default = IntrinioApi;
exports.default = _default;
//# sourceMappingURL=IntrinioApi.js.map