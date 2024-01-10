"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _ApiFn = require("../ApiFn");
const API_URL = "https://api.kucoin.com/api/v1/market";
const _getData = json => (json || {}).data;
const _crDfUrl = option => {
  const {
      proxy,
      items = []
    } = option,
    pair = (0, _AdapterFn.getValue)(items[0]),
    timeframe = (0, _AdapterFn.getValue)(items[1]);
  option.timeframe = timeframe;
  return (0, _ApiFn.crAllOriginsUrl)(proxy, `${API_URL}/candles?symbol=${pair}&type=${timeframe}`);
};
const _crObUrl = _ref => {
  let {
    proxy,
    items = []
  } = _ref;
  return (0, _ApiFn.crAllOriginsUrl)(proxy, `${API_URL}/orderbook/level2_20?symbol=${(0, _AdapterFn.getValue)(items[0])}`);
};
const _rCrUrl = {
  DF: _crDfUrl,
  OB: _crObUrl
};
const KcApi = (0, _ApiFn.fRouteApi)(_rCrUrl, _getData);
var _default = exports.default = KcApi;
//# sourceMappingURL=KcApi.js.map