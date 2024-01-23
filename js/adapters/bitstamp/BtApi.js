"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _ApiFn = require("../ApiFn");
const API_URL = "https://www.bitstamp.net/api/v2";
const _getData = (json, option) => {
  const {
      data,
      bids,
      asks
    } = json || {},
    {
      ohlc,
      pair
    } = data || {},
    {
      items = []
    } = option,
    {
      c
    } = items[0];
  return c === pair && (0, _AdapterFn.isArr)(ohlc) ? ohlc : (0, _AdapterFn.isArr)(bids) && (0, _AdapterFn.isArr)(asks) ? json : void 0;
};
const _crDfUrl = (pair, timeframe, limit) => `${API_URL}/ohlc/${pair}?step=${timeframe}&limit=${limit}`;
const _crObUrl = pair => `${API_URL}/order_book/${pair}?order=0`;
const BtApi = (0, _ApiFn.crRouteDfObApi)(_crDfUrl, _crObUrl, _getData);
var _default = exports.default = BtApi;
//# sourceMappingURL=BtApi.js.map