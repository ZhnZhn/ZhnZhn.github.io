"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _ApiFn = require("../ApiFn");
const API_URL = "https://api-pub.bitfinex.com/v2";
const _crDfUrl = option => {
  const {
      proxy,
      items = []
    } = option,
    pair = (0, _AdapterFn.getValue)(items[0]),
    timeframe = (0, _AdapterFn.getValue)(items[1]),
    limit = (0, _AdapterFn.getValue)(items[2]);
  option.timeframe = timeframe;
  return (0, _ApiFn.crAllOriginsUrl)(proxy, `${API_URL}/candles/trade:${timeframe}:t${pair}/hist?limit=${limit}`);
};
const _crObUrl = _ref => {
  let {
    proxy,
    items = []
  } = _ref;
  const {
      v: pair
    } = items[0],
    {
      v: len
    } = items[1];
  return (0, _ApiFn.crAllOriginsUrl)(proxy, `${API_URL}/book/t${pair}/P0?len=${len}`);
};
const _rCrUrl = {
  DF: _crDfUrl,
  OB: _crObUrl
};
const BfApi = (0, _ApiFn.fRouteApi)(_rCrUrl);
var _default = exports.default = BfApi;
//# sourceMappingURL=BfApi.js.map