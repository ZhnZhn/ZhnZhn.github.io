"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _ApiFn = require("../ApiFn");
const API_URL = "https://api.gateio.ws/api/v4/spot";
const _crDfUrl = option => {
  const {
      proxy,
      items = []
    } = option,
    pair = (0, _AdapterFn.getValue)(items[0]),
    timeframe = (0, _AdapterFn.getValue)(items[1]),
    limit = (0, _AdapterFn.getValue)(items[2]);
  option.timeframe = timeframe;
  return (0, _ApiFn.crAllOriginsUrl)(proxy, `${API_URL}/candlesticks?currency_pair=${pair}&interval=${timeframe}&limit=${limit}`);
};
const _crObUrl = (pair, limit) => `${API_URL}/order_book?currency_pair=${pair}&limit=${limit}`;
const _rCrUrl = {
  DF: _crDfUrl,
  OB: (0, _ApiFn.fCrObUrl)(_crObUrl)
};
const GtApi = (0, _ApiFn.fRouteApi)(_rCrUrl);
var _default = exports.default = GtApi;
//# sourceMappingURL=GtApi.js.map