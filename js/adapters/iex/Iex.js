"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _IexApi = _interopRequireDefault(require("./IexApi"));

var _IexAdapter = _interopRequireDefault(require("./IexAdapter"));

var Iex = {
  api: _IexApi["default"],
  adapter: _IexAdapter["default"]
};
var _default = Iex;
exports["default"] = _default;
//# sourceMappingURL=Iex.js.map