"use strict";

exports.__esModule = true;
exports.default = void 0;
var _fToKline = require("../fToKline");
var _fnAdapter = require("./fnAdapter");
const _getData = (json, _ref) => {
  let {
    dfPn
  } = _ref;
  return json[dfPn].reverse();
};
const toHistorical = (0, _fToKline.fToKline)({
  ..._fnAdapter.klineOptions,
  getData: _getData,
  c: 'adjClose'
});
var _default = exports.default = toHistorical;
//# sourceMappingURL=toHistorical.js.map