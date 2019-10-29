'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var YAXIS = 'yAxis';

var _isArr = Array.isArray;

var _crYAxisId = function _crYAxisId(indexOrChart) {
  return indexOrChart && _isArr(indexOrChart.yAxis) ? YAXIS + indexOrChart.yAxis.length : YAXIS + indexOrChart;
};

var _checkYAxis = function _checkYAxis(index, chart) {
  var isNewYAxis = index === -1,
      id = isNewYAxis ? _crYAxisId(chart) : index === 0 ? void 0 : _crYAxisId(index);
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

var _findDataIndex = function _findDataIndex(data, v) {
  var _max = data.length;
  var i = 0;
  for (i; i < _max; i++) {
    if (data[i][0] === v) {
      return i;
    }
  }
  return i;
};

var _crData = function _crData(_ref2) {
  var data = _ref2.data,
      userMin = _ref2.userMin,
      userMax = _ref2.userMax;

  if (!_isArr(data) || !_isArr(data[0]) || !userMin || !userMax) {
    return data;
  }
  var _fromIndex = _findDataIndex(data, userMin),
      _toIndex = _findDataIndex(data, userMax);
  return _fromIndex <= _toIndex ? data.slice(_fromIndex, _toIndex + 1) : data;
};

var zhAddSeriaToYAxis = function zhAddSeriaToYAxis() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var seriaOptions = arguments[1];

  try {
    var color = options.color,
        _options$yIndex = options.yIndex,
        yIndex = _options$yIndex === undefined ? -1 : _options$yIndex,
        _checkYAxis2 = _checkYAxis(yIndex, this),
        id = _checkYAxis2.id,
        isNewYAxis = _checkYAxis2.isNewYAxis;

    if (isNewYAxis) {
      this.addAxis(_crAxis(id, color), false, true);
    }
    var _seria = this.addSeries(_crSeria({
      id: id, color: color, data: _crData(options) }, seriaOptions), false);
    this.redraw();
    return _seria;
  } catch (err) {
    console.log(err.message);
  }
};

exports.default = zhAddSeriaToYAxis;
//# sourceMappingURL=zhAddSeriaToYAxis.js.map