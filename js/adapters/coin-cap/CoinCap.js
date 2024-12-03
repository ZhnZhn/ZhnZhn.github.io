"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _CoinCapApi = _interopRequireDefault(require("./CoinCapApi"));
var _CoinCapAdapter = _interopRequireDefault(require("./CoinCapAdapter"));
const CoinCap = {
  api: _CoinCapApi.default,
  adapter: _CoinCapAdapter.default
};
var _default = exports.default = CoinCap;
//# sourceMappingURL=CoinCap.js.map