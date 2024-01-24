"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _ApiFn = require("../ApiFn");
const API_URL = 'https://api.crypto.com/exchange/v1/public';
const _getData = json => {
  const {
      data
    } = (json || {}).result || {},
    _ob = (data || [])[0],
    {
      asks,
      bids
    } = _ob || {};
  return (0, _AdapterFn.isArr)(asks) && (0, _AdapterFn.isArr)(bids) ? {
    asks,
    bids
  } : (0, _AdapterFn.isArr)(data) ? data : void 0;
};
const _crDfUrl = (pair, timeframe, limit) => `${API_URL}/get-candlestick?instrument_name=${pair}-PERP&timeframe=${timeframe}&count=${limit}`;
const _crObUrl = (pair, limit) => `${API_URL}/get-book?instrument_name=${pair}-PERP&depth=${limit}`;
const CrApi = (0, _ApiFn.crRouteDfObApi)(_crDfUrl, _crObUrl, _getData);
var _default = exports.default = CrApi;
//# sourceMappingURL=CrApi.js.map