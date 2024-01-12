"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _ApiFn = require("../ApiFn");
const API_URL = "https://www.bitstamp.net/api/v2";
const _crDfUrl = (pair, timeframe, limit) => `${API_URL}/ohlc/${pair}?step=${timeframe}&limit=${limit}`;
const _crObUrl = pair => `${API_URL}/order_book/${pair}?order=0`;
const _rCrUrl = {
  DF: (0, _ApiFn.fCrDfUrl)(_crDfUrl),
  OB: (0, _ApiFn.fCrObUrl)(_crObUrl)
};
const BtApi = {
  getRequestUrl: (0, _ApiFn.fGetRequestUrl)(_rCrUrl),
  checkResponse(json, option) {
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
    if (c === pair && (0, _AdapterFn.isArr)(ohlc) || (0, _AdapterFn.isArr)(bids) && (0, _AdapterFn.isArr)(asks)) {
      return json;
    }
    throw (0, _AdapterFn.crError)();
  }
};
var _default = exports.default = BtApi;
//# sourceMappingURL=BtApi.js.map