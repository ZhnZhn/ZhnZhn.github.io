"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _CrApi = _interopRequireDefault(require("./CrApi"));
var _CrAdapter = _interopRequireDefault(require("./CrAdapter"));
const Cr = {
  api: _CrApi.default,
  adapter: _CrAdapter.default
};
var _default = exports.default = Cr;
//# sourceMappingURL=Cr.js.map