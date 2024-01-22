"use strict";

exports.__esModule = true;
exports.default = void 0;
var _fToKline = require("../fToKline");
/*
From Coinbase Documentation
[[
 S: number time bucket start time in second
 LOW: number lowest price during the bucket interval
 HIGHT: number highest price during the bucket interval
 OPEN: number opening price (first trade) in the bucket interval
 CLOSE: number closing price (last trade) in the bucket interval
 Volume: number volume of trading activity during the bucket interval
]]
*/

const toKline = (0, _fToKline.fToKline)({
  o: 3,
  h: 2,
  l: 1,
  c: 4,
  crDate: v => v * 1000
});
var _default = exports.default = toKline;
//# sourceMappingURL=toKline.js.map