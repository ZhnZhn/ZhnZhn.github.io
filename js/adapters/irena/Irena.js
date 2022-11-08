"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _IrenaApi = _interopRequireDefault(require("./IrenaApi"));

var _IrenaAdapter = _interopRequireDefault(require("./IrenaAdapter"));

const Irena = {
  api: _IrenaApi.default,
  adapter: _IrenaAdapter.default
};
var _default = Irena;
exports.default = _default;
//# sourceMappingURL=Irena.js.map