"use strict";

exports.__esModule = true;
exports.default = void 0;
var _ApiFn = require("../ApiFn");
const API_URL = "https://api.gateio.ws/api/v4/spot";
const _crDfUrl = (pair, timeframe, limit) => `${API_URL}/candlesticks?currency_pair=${pair}&interval=${timeframe}&limit=${limit}`;
const _crObUrl = (pair, limit) => `${API_URL}/order_book?currency_pair=${pair}&limit=${limit}`;
const GtApi = (0, _ApiFn.crRouteDfObApi)(_crDfUrl, _crObUrl);
var _default = exports.default = GtApi;
//# sourceMappingURL=GtApi.js.map