"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var polyfill = function polyfill() {
  if (!Array.isArray) {
    Array.isArray = function (arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    };
  } //IE


  if (!Number.isInteger) {
    Number.isInteger = function (value) {
      return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
    };
  }
};

var _default = polyfill;
exports["default"] = _default;
//# sourceMappingURL=polyfill.js.map