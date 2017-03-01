"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Box = exports.Box = function Box(x) {
  return {
    map: function map(f) {
      return Box(f(x));
    },
    fold: function fold(f) {
      return f(x);
    }
  };
};

var getFromNullable = exports.getFromNullable = function getFromNullable(x) {
  var df = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return x != null ? x : df;
};
//# sourceMappingURL=fnStyle.js.map