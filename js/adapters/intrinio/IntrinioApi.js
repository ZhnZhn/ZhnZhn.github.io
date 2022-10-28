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

const _getErr = json => json && Array.isArray(json.errors) && json.errors[0] ? json.errors[0] : void 0;

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
      value,
      fromDate,
      toDate,
      item = {},
      one,
      two,
      three
    } = option;
    option.resErrStatus = RES_ERR_STATUS;

    if (two && three) {
      return API_URL + "?identifier=" + one + "&item=" + two + "&start_date=" + fromDate + "&end_date=" + toDate + "&type=" + three;
    }

    if (two) {
      //return `${C.URL}?identifier=${one}&item=${two}&start_date=${fromDate}&end_date=${toDate}&frequency=quarterly`;
      return API_URL + "?identifier=" + one + "&item=" + two + "&start_date=" + fromDate + "&end_date=" + toDate + "&type=QTR";
    }

    const _frq = FRQ[item.frq] || FRQ.DF;

    return API_URL + "?identifier=" + value + "&start_date=" + fromDate + "&end_date=" + toDate + "&frequency=" + _frq + "&" + TAIL;
  },

  checkResponse(json) {
    const _err = _getErr(json);

    if (_err) {
      throw (0, _AdapterFn.crError)(_err.human, _err.message);
    }

    return json && (0, _AdapterFn.isArr)(json.data);
  }

};
var _default = IntrinioApi;
exports.default = _default;
//# sourceMappingURL=IntrinioApi.js.map