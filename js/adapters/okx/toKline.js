"use strict";

exports.__esModule = true;
exports.default = void 0;
var _fToKline = require("../fToKline");
/*
From OKX Documentation
[[
 S: string time bucket start time in miliseconds
 OPEN: string lowest price during the bucket interval
 HIGHT: string highest price during the bucket interval
 LOW: string opening price (first trade) in the bucket interval
 CLOSE: string closing price (last trade) in the bucket interval
 CONFIRM: string volume of trading activity during the bucket interval
]]
*/

const toKline = (0, _fToKline.fToKline)({
  ...(0, _fToKline.crOptionsFromStr)(false),
  h: 2,
  l: 3,
  c: 4,
  v: -1
});
var _default = exports.default = toKline;
//# sourceMappingURL=toKline.js.map