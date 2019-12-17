"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _compose = _interopRequireDefault(require("./compose"));

var pipe = function pipe() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  if (fns.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (fns.length === 1) {
    return fns[0];
  }

  return _compose["default"].apply(void 0, fns.slice().reverse());
};

var _default = pipe;
exports["default"] = _default;
//# sourceMappingURL=pipe.js.map