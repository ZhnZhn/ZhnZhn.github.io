"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _fToKline = _interopRequireDefault(require("../fToKline"));
/*
From Kraken Documentation
[[
 MTS:	number second timestamp,
 ? string	First execution during the time frame,
 OPEN:	string	First execution during the time frame,
 HIGH:	string	Highest execution during the time frame,
 LOW:	string	Lowest execution during the timeframe,
 CLOSE:	string	Last execution during the time frame,
 VOLUME:	string	Quantity of symbol traded within the timeframe
 NmbOfTr: number of trades
]]
*/

const _parseFloat = parseFloat;
const toKline = (0, _fToKline.default)({
  o: 1,
  h: 2,
  l: 3,
  c: 4,
  v: 6,
  crDate: v => _parseFloat(v) * 1000,
  crValue: v => (0, _AdapterFn.roundByOHLC)(_parseFloat(v)),
  crVolume: v => _parseFloat(v)
});
var _default = exports.default = toKline;
//# sourceMappingURL=toKline.js.map