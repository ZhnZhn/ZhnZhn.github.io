"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _fToKline = require("../fToKline");
var _fnAdapter = require("./fnAdapter");
const _crNumber = str => parseFloat(str);
const TwAdapter = (0, _fToKline.fToKline)({
  isAth: true,
  getData: json => json.values,
  d: 'datetime',
  v: 'volume',
  l: 'low',
  h: 'high',
  c: 'close',
  o: 'open',
  crDate: _AdapterFn.ymdhmsToUTC,
  crValue: _crNumber,
  crVolume: _crNumber,
  crCaption: _fnAdapter.crCaption
});
var _default = exports.default = TwAdapter;
//# sourceMappingURL=TwAdapter.js.map