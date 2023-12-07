"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.crExportStyleOptions = void 0;
var _merge = _interopRequireDefault(require("../utils/merge"));
const _STYLE_COLOR_BLACK = {
  style: {
    color: 'black'
  }
};
const BLACK_AXIS = {
  xAxis: {
    labels: _STYLE_COLOR_BLACK
  },
  yAxis: {
    tickColor: 'black',
    labels: _STYLE_COLOR_BLACK
  }
};
const BLACK_TITLE = {
  title: _STYLE_COLOR_BLACK
};
const BLACK_SERIES = {
  plotOptions: {
    area: {
      color: 'black'
    },
    spline: {
      color: 'black'
    },
    line: {
      color: 'black'
    }
  }
};
const _crStyleBlackAxis = () => (0, _merge.default)(false, {}, BLACK_AXIS),
  _crStyleBlackAxisTitle = () => (0, _merge.default)(false, {}, BLACK_AXIS, BLACK_TITLE),
  _crStyleBlackAll = () => (0, _merge.default)(false, {}, BLACK_AXIS, BLACK_TITLE, BLACK_SERIES);
const _crStyleItem = (caption, value) => ({
  caption,
  value
});
const crExportStyleOptions = () => [_crStyleItem('Default', {}), _crStyleItem('Default + Black Axis', _crStyleBlackAxis()), _crStyleItem('Default + Black Axis + Black Title', _crStyleBlackAxisTitle()), _crStyleItem('All Black', _crStyleBlackAll())];
exports.crExportStyleOptions = crExportStyleOptions;
//# sourceMappingURL=ChartExportConfig.js.map