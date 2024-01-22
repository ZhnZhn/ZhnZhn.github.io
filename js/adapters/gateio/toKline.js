"use strict";

exports.__esModule = true;
exports.default = void 0;
var _fToKline = require("../fToKline");
/*
From Gate.io Documentation
[[
  0: TS: string Unix timestamp in seconds
  1: VOLUME: string Quote currency trading volume
  2: CLOSE: string Close price
  3: HIGH: string Highest price
  4: LOW: string Lowest price
  5: OPEN: string Open price
  6: TURNOUT: string: Base currency trading amount
]]
*/

const toKline = (0, _fToKline.fToKline)({
  ...(0, _fToKline.crOptionsFromStr)(),
  o: 5,
  h: 3,
  l: 4,
  c: 2,
  v: 6
});
var _default = exports.default = toKline;
//# sourceMappingURL=toKline.js.map