"use strict";

exports.__esModule = true;
exports.default = void 0;
var _ApiFn = require("../ApiFn");
const API_URL = "https://www.okx.com/api/v5/market";
const getData = json => (json || {}).data;
const _crDfUrl = (pair, timeframe, limit) => `${API_URL}/mark-price-candles?instId=${pair}&bar=${timeframe}&limit=${limit}`;
const KxApi = (0, _ApiFn.crRouteDfObApi)(_crDfUrl, void 0, getData);
var _default = exports.default = KxApi;
//# sourceMappingURL=KxApi.js.map