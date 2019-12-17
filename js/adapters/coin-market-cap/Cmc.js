"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _CmcApi = _interopRequireDefault(require("./CmcApi"));

var _CmcAdapter = _interopRequireDefault(require("./CmcAdapter"));

var Cmc = {
  api: _CmcApi["default"],
  adapter: _CmcAdapter["default"]
};
var _default = Cmc;
exports["default"] = _default;
//# sourceMappingURL=Cmc.js.map