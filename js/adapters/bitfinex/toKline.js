"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _fToKline = require("../fToKline");
/*
From Bitfinex Documentation
[[
 MTS:	int	millisecond time stamp,
 OPEN:	float	First execution during the time frame,
 CLOSE:	float	Last execution during the time frame,
 HIGH:	float	Highest execution during the time frame,
 LOW:	float	Lowest execution during the timeframe,
 VOLUME:	float	Quantity of symbol traded within the timeframe
]]
*/

const toKline = (0, _fToKline.fToKline)({
  crValue: v => (0, _AdapterFn.roundByOHLC)(v)
});
var _default = exports.default = toKline;
//# sourceMappingURL=toKline.js.map