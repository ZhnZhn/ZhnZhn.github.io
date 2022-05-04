"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.stockSeriesLegend = exports.legendItem = void 0;

var _Color = _interopRequireDefault(require("../constants/Color"));

const _crItem = function (index, color, name, is) {
  if (is === void 0) {
    is = false;
  }

  return {
    index,
    color,
    name,
    isVisible: is
  };
};

const legendItem = _crItem;
exports.legendItem = legendItem;

const stockSeriesLegend = () => [_crItem(0, _Color.default.S_STOCK_CLOSE, 'Close', true), _crItem(1, _Color.default.S_HIGH, 'High'), _crItem(2, _Color.default.S_LOW, 'Low'), _crItem(3, _Color.default.S_OPEN, 'Open')];

exports.stockSeriesLegend = stockSeriesLegend;
//# sourceMappingURL=legendFn.js.map