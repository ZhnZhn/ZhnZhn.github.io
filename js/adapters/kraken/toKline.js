"use strict";

exports.__esModule = true;
exports.default = void 0;
var _fToKline = require("../fToKline");
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

const toKline = (0, _fToKline.fToKline)({
  ...(0, _fToKline.crOptionsFromStr)(),
  o: 1,
  h: 2,
  l: 3,
  c: 4,
  v: 6
});
var _default = exports.default = toKline;
//# sourceMappingURL=toKline.js.map