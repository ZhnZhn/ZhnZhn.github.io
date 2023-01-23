"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _compose = _interopRequireDefault(require("./compose"));
const flow = function () {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }
  return fns.length === 0 ? arg => arg : fns.length === 1 ? fns[0] : (0, _compose.default)(...fns.slice().reverse());
};
var _default = flow;
exports.default = _default;
//# sourceMappingURL=flow.js.map