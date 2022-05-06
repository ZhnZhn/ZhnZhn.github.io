"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _crAdapterOHLCV = _interopRequireDefault(require("../crAdapterOHLCV"));

var _fnAdapter = require("./fnAdapter");

const _getData = _ref => {
  let {
    values
  } = _ref;
  return values.map(_ref2 => {
    let {
      datetime,
      volume,
      low,
      high,
      close,
      open
    } = _ref2;
    return {
      date: datetime,
      volume: parseFloat(volume),
      low: parseFloat(low),
      high: parseFloat(high),
      open: parseFloat(open),
      close: parseFloat(close)
    };
  });
};

const TwAdapter = (0, _crAdapterOHLCV.default)({
  crCaption: _fnAdapter.crCaption,
  getArr: _getData,
  crAddConfig: _fnAdapter.crAddConfig
});
var _default = TwAdapter;
exports.default = _default;
//# sourceMappingURL=TwAdapter.js.map