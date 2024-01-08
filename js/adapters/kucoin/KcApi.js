"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
const API_URL = "https://api.kucoin.com/api/v1/market/candles";
const _getData = json => (json || {}).data;
const KcApi = {
  getRequestUrl(option) {
    const {
        proxy,
        items = []
      } = option,
      {
        v: pair
      } = items[0],
      {
        v: timeframe
      } = items[1];
    option.timeframe = timeframe;
    return (0, _AdapterFn.crAllOriginsUrl)(proxy, `${API_URL}?symbol=${pair}&type=${timeframe}`);
  },
  checkResponse: (0, _AdapterFn.fCheckResponse)(_getData)
};
var _default = exports.default = KcApi;
//# sourceMappingURL=KcApi.js.map