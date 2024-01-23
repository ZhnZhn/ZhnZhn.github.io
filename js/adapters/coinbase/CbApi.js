"use strict";

exports.__esModule = true;
exports.default = void 0;
var _ApiFn = require("../ApiFn");
const API_URL = "https://api.exchange.coinbase.com/products";
const _crDfUrl = (pair, timeframe) => `${API_URL}/${pair}/candles?granularity=${timeframe}`;
const CbApi = (0, _ApiFn.crRouteDfObApi)(_crDfUrl);
var _default = exports.default = CbApi;
//# sourceMappingURL=CbApi.js.map