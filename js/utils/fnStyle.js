"use strict";

exports.__esModule = true;
exports.getFromNullable = exports.Box = void 0;

var Box = function Box(x) {
  return {
    map: function map(f) {
      return Box(f(x));
    },
    fold: function fold(f) {
      return f(x);
    }
  };
};

exports.Box = Box;

var getFromNullable = function getFromNullable(x, df) {
  if (df === void 0) {
    df = {};
  }

  return x != null ? x : df;
};

exports.getFromNullable = getFromNullable;
//# sourceMappingURL=fnStyle.js.map