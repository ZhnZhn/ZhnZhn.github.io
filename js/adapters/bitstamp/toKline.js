"use strict";

exports.__esModule = true;
exports.default = void 0;
var _fToKline = require("../fToKline");
/*
From Bitstamp API Documentation
  {
     "high": "18638.71",
     "timestamp": "1606723200",
     "volume": "402.30570712",
     "low": "18390.00",
     "close": "18471.42",
     "open": "18633.43"
   }
*/

const toKline = (0, _fToKline.fToKline)({
  ...(0, _fToKline.crOptionsFromStr)(),
  d: 'timestamp',
  o: 'open',
  h: 'high',
  l: 'low',
  c: 'close',
  v: 'volume'
});
var _default = exports.default = toKline;
//# sourceMappingURL=toKline.js.map