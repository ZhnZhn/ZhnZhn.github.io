"use strict";

exports.__esModule = true;
exports.default = void 0;
var _fToKline = require("../fToKline");
/*
From HTX Documentation
[{
id: long false The UNIX timestamp in seconds as response id
amount:	float	false	Accumulated trading volume, in base currency
count:	integer	false	The number of completed trades
open:	float	false	The opening price
close:	float	false	The closing price
low:	float	false	The low price
high:	float	false	The high price
vol:	float	false	Accumulated trading value, in quote currency
}]
*/

const toKline = (0, _fToKline.fToKline)({
  ...(0, _fToKline.crOptionsFromStr)(),
  d: "id",
  o: "open",
  h: "high",
  l: "low",
  c: "close",
  v: "amount"
});
var _default = exports.default = toKline;
//# sourceMappingURL=toKline.js.map