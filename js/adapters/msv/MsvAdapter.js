"use strict";

exports.__esModule = true;
exports.MsvAdapter = void 0;
var _fToKline = require("../fToKline");
const MsvAdapter = exports.MsvAdapter = (0, _fToKline.fToKline)({
  isAth: true,
  getData: json => json.results,
  d: 't',
  v: 'v',
  l: 'l',
  h: 'h',
  c: 'c',
  o: 'o',
  n: 'n'
});
//# sourceMappingURL=MsvAdapter.js.map