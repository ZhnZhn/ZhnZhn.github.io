"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _ApiFn = require("../ApiFn");
const API_URL = "https://api.bybit.com/v5/market";
const SYMBOL = "category=spot&symbol";
const _getData = json => {
  const {
      result
    } = json || {},
    {
      list,
      a,
      b
    } = result || {};
  if ((0, _AdapterFn.isArr)(list)) {
    return list;
  }
  if ((0, _AdapterFn.isArr)(a) && (0, _AdapterFn.isArr)(b)) {
    return {
      asks: a,
      bids: b
    };
  }
};
const _crDfUrl = (pair, timeframe, limit) => `${API_URL}/kline?${SYMBOL}=${pair}&interval=${timeframe}&limit=${limit}`;
const _crObUrl = (pair, limit) => `${API_URL}/orderbook?${SYMBOL}=${pair}&limit=${limit}`;
const _rCrUrl = {
  DF: (0, _ApiFn.fCrDfUrl)(_crDfUrl),
  OB: (0, _ApiFn.fCrObUrl)(_crObUrl)
};
const BbApi = (0, _ApiFn.fRouteApi)(_rCrUrl, _getData);
var _default = exports.default = BbApi;
//# sourceMappingURL=BbApi.js.map