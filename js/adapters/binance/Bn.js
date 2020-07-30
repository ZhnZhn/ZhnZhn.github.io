"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _BnApi = _interopRequireDefault(require("./BnApi"));

var _BnAdapter = _interopRequireDefault(require("./BnAdapter"));

var Bn = {
  api: _BnApi["default"],
  adapter: _BnAdapter["default"]
};
var _default = Bn;
exports["default"] = _default;
//# sourceMappingURL=Bn.js.map