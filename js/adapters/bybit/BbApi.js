"use strict";

exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _ApiFn = require("../ApiFn");
const API_URL = "https://api.bybit.com/v5/market";
const SYMBOL = "category=spot&symbol";
const _getData = json => {
  const {
    list,
    a,
    b
  } = (json || {}).result || {};
  return (0, _isTypeFn.isArr)(list) ? list : (0, _isTypeFn.isArr)(a) && (0, _isTypeFn.isArr)(b) ? {
    asks: a,
    bids: b
  } : void 0;
};
const _crDfUrl = (pair, timeframe, limit) => `${API_URL}/kline?${SYMBOL}=${pair}&interval=${timeframe}&limit=${limit}`;
const _crObUrl = (pair, limit) => `${API_URL}/orderbook?${SYMBOL}=${pair}&limit=${limit}`;
const BbApi = (0, _ApiFn.crRouteDfObApi)(_crDfUrl, _crObUrl, _getData);
var _default = exports.default = BbApi;
//# sourceMappingURL=BbApi.js.map