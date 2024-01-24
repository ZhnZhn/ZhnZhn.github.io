"use strict";

exports.__esModule = true;
exports.default = void 0;
var _fToKline = require("../fToKline");
const toKline = (0, _fToKline.fToKline)({
  ...(0, _fToKline.crOptionsFromStr)(false),
  d: 't',
  o: 'o',
  h: 'h',
  l: 'l',
  c: 'c',
  v: 'v'
});
var _default = exports.default = toKline;
//# sourceMappingURL=toKline.js.map