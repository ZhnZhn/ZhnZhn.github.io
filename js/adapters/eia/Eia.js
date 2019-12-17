"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _EiaApi = _interopRequireDefault(require("./EiaApi"));

var _EiaAdapter = _interopRequireDefault(require("./EiaAdapter"));

var Eia = {
  api: _EiaApi["default"],
  adapter: _EiaAdapter["default"]
};
var _default = Eia;
exports["default"] = _default;
//# sourceMappingURL=Eia.js.map