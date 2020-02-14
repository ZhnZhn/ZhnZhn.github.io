"use strict";

exports.__esModule = true;
exports["default"] = void 0;

/*
const getFromNullable = (x, df={}) => {
   return x != null ? x : df;
};
*/
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

var _default = Box;
exports["default"] = _default;
//# sourceMappingURL=Box.js.map