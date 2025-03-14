"use strict";

exports.__esModule = true;
exports.PlgAdapter = void 0;
var _fToKline = require("../fToKline");
const PlgAdapter = exports.PlgAdapter = (0, _fToKline.fToKline)({
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
//# sourceMappingURL=PlgAdapter.js.map