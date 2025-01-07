"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.PlgAdapter = void 0;
var _crAdapterOHLCV = _interopRequireDefault(require("../crAdapterOHLCV"));
var _fnAdapter = require("./fnAdapter");
const _getData = _ref => {
  let {
    results
  } = _ref;
  return results.map(_ref2 => {
    let {
      t,
      v,
      l,
      h,
      c,
      o
    } = _ref2;
    return {
      date: t,
      volume: v,
      low: l,
      high: h,
      open: o,
      close: c
    };
  });
};
const PlgAdapter = exports.PlgAdapter = (0, _crAdapterOHLCV.default)({
  //crCaption,
  getArr: _getData,
  crAddConfig: _fnAdapter.crAddConfig,
  toDate: t => t
});
//# sourceMappingURL=PlgAdapter.js.map