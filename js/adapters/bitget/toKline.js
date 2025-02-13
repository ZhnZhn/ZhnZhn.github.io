"use strict";

exports.__esModule = true;
exports.default = void 0;
var _fToKline = require("../fToKline");
const toKline = (0, _fToKline.fToKline)({
  ...(0, _fToKline.crOptionsFromStr)(false),
  h: '2',
  l: '3',
  c: '4'
});
var _default = exports.default = toKline;
//# sourceMappingURL=toKline.js.map