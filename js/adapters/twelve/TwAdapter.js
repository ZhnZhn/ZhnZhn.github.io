"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crAdapterOHLCV = _interopRequireDefault(require("../crAdapterOHLCV"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var crAddConfig = _fnAdapter["default"].crAddConfig,
    crCaption = _fnAdapter["default"].crCaption;

var _getData = function _getData(_ref) {
  var values = _ref.values;
  return values.map(function (_ref2) {
    var datetime = _ref2.datetime,
        volume = _ref2.volume,
        low = _ref2.low,
        high = _ref2.high,
        close = _ref2.close,
        open = _ref2.open;
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

var TwAdapter = (0, _crAdapterOHLCV["default"])({
  crCaption: crCaption,
  getArr: _getData,
  crAddConfig: crAddConfig
});
var _default = TwAdapter;
exports["default"] = _default;
//# sourceMappingURL=TwAdapter.js.map