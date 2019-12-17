"use strict";

exports.__esModule = true;
exports["default"] = void 0;

/**
 * from redux compose
 *
 * @param {...Function} fns The functions to compose.
 * @returns {Function} A function obtained by composing
 * the argument functions from right to left
 *
 * For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 *
 */
var compose = function compose() {
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

  return fns.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
};

var _default = compose;
exports["default"] = _default;
//# sourceMappingURL=compose.js.map