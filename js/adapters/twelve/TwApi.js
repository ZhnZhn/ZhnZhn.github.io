"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
const URL = 'https://api.twelvedata.com',
  QUERY_TAIL = 'dp=2&order=ASC&timezone=UTC';
const _isArr = Array.isArray;
const TwApi = {
  getRequestUrl(option) {
    const {
        apiKey,
        items
      } = option,
      symbol = (0, _AdapterFn.getValue)(items[0], {
        isUpper: true
      }),
      interval = (0, _AdapterFn.getValue)(items[1]),
      outputsize = (0, _AdapterFn.getValue)(items[2]);
    option.itemCaption = symbol;
    return `${URL}/time_series?symbol=${symbol}&apikey=${apiKey}&interval=${interval}&outputsize=${outputsize}&${QUERY_TAIL}`;
  },
  checkResponse(json, option) {
    const {
      values,
      message
    } = json || {};
    if (!_isArr(values)) {
      throw (0, _AdapterFn.crError)('', message);
    }
  }
};
var _default = exports.default = TwApi;
//# sourceMappingURL=TwApi.js.map