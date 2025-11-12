"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _fToKline = require("../fToKline");
const toHistorical = (0, _fToKline.fToKline)({
  isAth: true,
  d: 'date',
  v: 'volume',
  l: 'low',
  h: 'high',
  o: 'open',
  c: 'close',
  crDate: _AdapterFn.ymdhmsToUTC,
  getData: json => json.reverse()
});
var _default = exports.default = toHistorical;
//# sourceMappingURL=toHistorical.js.map