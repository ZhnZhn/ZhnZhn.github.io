'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var polyfill = function polyfill() {
  if (!Array.isArray) {
    Array.isArray = function (arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    };
  }
  //IE
  if (!Number.isInteger) {
    Number.isInteger = function (value) {
      return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
    };
  }
};

exports.default = polyfill;
//# sourceMappingURL=polyfill.js.map