'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var YAXIS = 'yAxis';

var _crYAxisId = function _crYAxisId(indexOrChart) {
  return indexOrChart && Array.isArray(indexOrChart.yAxis) ? YAXIS + indexOrChart.yAxis.length : YAXIS + indexOrChart;
};

var _checkYAxis = function _checkYAxis(index, chart) {
  var isNewYAxis = index === -1,
      id = isNewYAxis ? _crYAxisId(chart) : index === 0 ? undefined : _crYAxisId(index);
  return { id: id, isNewYAxis: isNewYAxis };
};

var _crAxis = function _crAxis(id, color) {
  return {
    id: id,
    opossite: true,
    title: {
      text: ''
    },
    lineColor: color,
    tickColor: color,
    gridLineWidth: 0,
    labels: {
      style: {
        color: color
      }
    },
    showEmpty: false
  };
};

var _crSeria = function _crSeria(_ref, options) {
  var id = _ref.id,
      color = _ref.color,
      data = _ref.data;
  return (0, _extends3.default)({
    type: 'spline',
    yAxis: id,
    color: color,
    data: data
  }, options);
};

var zhAddSeriaToYAxis = function zhAddSeriaToYAxis(options, seriaOptions) {
  try {
    var data = options.data,
        color = options.color,
        _options$index = options.index,
        index = _options$index === undefined ? -1 : _options$index;

    var _checkYAxis2 = _checkYAxis(index, this),
        id = _checkYAxis2.id,
        isNewYAxis = _checkYAxis2.isNewYAxis;

    if (isNewYAxis) {
      this.addAxis(_crAxis(id, color), false, true);
    }
    var _seria = this.addSeries(_crSeria({
      id: id, color: color, data: data }, seriaOptions), false);
    this.redraw();
    return _seria;
  } catch (err) {
    console.log(err.message);
  }
};

exports.default = zhAddSeriaToYAxis;
//# sourceMappingURL=zhAddSeriaToYAxis.js.map