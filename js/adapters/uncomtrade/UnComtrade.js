"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _Api = _interopRequireDefault(require("./Api"));

var _UnComtradeAdapter = _interopRequireDefault(require("./UnComtradeAdapter"));

const UnComtrade = {
  api: _Api.default,
  adapter: _UnComtradeAdapter.default
};
var _default = UnComtrade;
exports.default = _default;
//# sourceMappingURL=UnComtrade.js.map