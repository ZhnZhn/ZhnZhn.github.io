"use strict";

exports.__esModule = true;
exports.default = void 0;
var _ApiFn = require("../ApiFn");
const API_URL = "https://api.bitget.com/api/v2/spot/market";
const _crPairLimitQueryToken = (pair, limit) => `symbol=${pair}&limit=${limit}`;
const _crDfUrl = (pair, timeframe, limit) => `${API_URL}/candles?${_crPairLimitQueryToken(pair, limit)}&granularity=${timeframe}`;
const _crObUrl = (pair, limit) => `${API_URL}/orderbook?${_crPairLimitQueryToken(pair, limit)}&type=step0`;
const _getData = json => (json || {}).data;
const BgApi = (0, _ApiFn.crRouteDfObApi)(_crDfUrl, _crObUrl, _getData);
var _default = exports.default = BgApi;
//# sourceMappingURL=BgApi.js.map