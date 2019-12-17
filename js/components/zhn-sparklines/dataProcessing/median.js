"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _default = function _default(data) {
  return data.sort(function (a, b) {
    return a - b;
  })[Math.floor(data.length / 2)];
};

exports["default"] = _default;
//# sourceMappingURL=median.js.map