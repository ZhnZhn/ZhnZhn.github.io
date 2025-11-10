"use strict";

exports.__esModule = true;
exports.default = void 0;
var _fToKline = require("../fToKline");
var _fnAdapter = require("./fnAdapter");
const toHistorical = (0, _fToKline.fToKline)(Object.assign({}, _fnAdapter.klineOptions, {
  getData: _fnAdapter.getData,
  c: 'close'
}));
var _default = exports.default = toHistorical;
//# sourceMappingURL=toHistorical.js.map