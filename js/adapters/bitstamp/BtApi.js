"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
const API_URL = "https://www.bitstamp.net/api/v2";
const _crDfUrl = option => {
  const {
      items = []
    } = option,
    {
      v: pair
    } = items[0],
    {
      v: timeframe
    } = items[1],
    {
      v: limit
    } = items[2];
  option.timeframe = timeframe;
  return `${API_URL}/ohlc/${pair}?step=${timeframe}&limit=${limit}`;
};
const _crObUrl = option => {
  const {
      items = []
    } = option,
    {
      v: pair
    } = items[0];
  return `${API_URL}/order_book/${pair}?order=0`;
};
const _rCrUrl = {
  DF: _crDfUrl,
  OB: _crObUrl
};
const BtApi = {
  getRequestUrl(option) {
    const {
        dfSubId
      } = option,
      _crUrl = dfSubId && _rCrUrl[dfSubId] || _rCrUrl.DF;
    return _crUrl(option);
  },
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