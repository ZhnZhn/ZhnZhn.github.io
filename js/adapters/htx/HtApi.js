"use strict";

exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _ApiFn = require("../ApiFn");
const API_URL = "https://api.huobi.pro";
const _getData = json => json && (0, _isTypeFn.isArr)(json.data) ? json.data : void 0;
const _crDfUrl = (pair, timeframe, limit) => `${API_URL}/market/history/kline?symbol=${pair}&period=${timeframe}&size=${limit}`;
const _crObUrl = () => {};
const HtApi = (0, _ApiFn.crRouteDfObApi)(_crDfUrl, _crObUrl, _getData);
var _default = exports.default = HtApi;
//# sourceMappingURL=HtApi.js.map