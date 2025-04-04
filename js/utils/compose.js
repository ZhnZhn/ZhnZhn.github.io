"use strict";

exports.__esModule = true;
exports.default = void 0;
var _arrFn = require("./arrFn");
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

const compose = function () {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }
  const _fns = (0, _arrFn.filterBoolean)(fns);
  return _fns.length === 0 ? arg => arg : _fns.length === 1 ? _fns[0] : _fns.reduce((a, b) => function () {
    return a(b(...arguments));
  });
};
var _default = exports.default = compose;
//# sourceMappingURL=compose.js.map