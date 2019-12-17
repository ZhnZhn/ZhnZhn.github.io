"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _BeaApi = _interopRequireDefault(require("./BeaApi"));

var _BeaAdapter = _interopRequireDefault(require("./BeaAdapter"));

var Bea = {
  api: _BeaApi["default"],
  adapter: _BeaAdapter["default"]
};
var _default = Bea;
exports["default"] = _default;
//# sourceMappingURL=Bea.js.map