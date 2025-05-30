"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
const URL = 'https://api.twelvedata.com',
  QUERY_TAIL = 'dp=2&order=ASC&timezone=UTC';
const TwApi = {
  getRequestUrl(option) {
    const {
        apiKey
      } = option,
      [symbol, interval, outputsize] = (0, _AdapterFn.getValues)(option);
    option.apiKey = null;
    option.itemCaption = symbol;
    return `${URL}/time_series?symbol=${symbol}&apikey=${apiKey}&interval=${interval}&outputsize=${outputsize}&${QUERY_TAIL}`;
  },
  checkResponse: (0, _AdapterFn.fCheckResponse)(json => (json || {}).values, json => (json || {}).message)
};
var _default = exports.default = TwApi;
//# sourceMappingURL=TwApi.js.map