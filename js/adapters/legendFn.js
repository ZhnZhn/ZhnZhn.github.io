"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _Color = _interopRequireDefault(require("../constants/Color"));

var _crItem = function _crItem(index, color, name, is) {
  if (is === void 0) {
    is = false;
  }

  return {
    index: index,
    color: color,
    name: name,
    isVisible: is
  };
};

var legendFn = {
  legendItem: _crItem,
  stockSeriesLegend: function stockSeriesLegend() {
    return [_crItem(0, _Color["default"].S_STOCK_CLOSE, 'Close', true), _crItem(1, _Color["default"].S_HIGH, 'High'), _crItem(2, _Color["default"].S_LOW, 'Low'), _crItem(3, _Color["default"].S_OPEN, 'Open')];
  }
};
var _default = legendFn;
exports["default"] = _default;
//# sourceMappingURL=legendFn.js.map