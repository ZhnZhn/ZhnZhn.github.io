"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _fToKline = _interopRequireDefault(require("../fToKline"));
/*
From KuCoin Documentation
[[
 MTS:	string	millisecond time stamp,
 OPEN:	string	First execution during the time frame,
 CLOSE:	string	Last execution during the time frame,
 HIGH:	string	Highest execution during the time frame,
 LOW:	string	Lowest execution during the timeframe,
 VOLUME:	string	Quantity of symbol traded within the timeframe
]]
*/

const _parseFloat = parseFloat;
const toKline = (0, _fToKline.default)({
  crDate: v => _parseFloat(v) * 1000,
  crValue: v => (0, _AdapterFn.roundByOHLC)(_parseFloat(v)),
  crVolume: v => _parseFloat(v)
});
var _default = exports.default = toKline;
//# sourceMappingURL=toKline.js.map