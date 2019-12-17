"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _throttle = _interopRequireDefault(require("./throttle"));

var DF_WAIT = 800;

var throttleOnce = function throttleOnce(fn, wait) {
  if (wait === void 0) {
    wait = DF_WAIT;
  }

  return (0, _throttle["default"])(fn, wait, {
    trailing: false
  });
};

var _default = throttleOnce;
exports["default"] = _default;
//# sourceMappingURL=throttleOnce.js.map