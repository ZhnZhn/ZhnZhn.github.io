"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _isUndef = function _isUndef(v) {
  return typeof v === 'undefined';
};

var _isStrNotEmpty = function _isStrNotEmpty(str) {
  return typeof str === 'string' && str;
};

var _isNumber = function _isNumber(n) {
  return typeof n === 'number' && n - n === 0;
};

var _crId = function _crId() {
  return (Date.now().toString(36) + Math.random().toString(36).substr(2, 4)).toUpperCase();
}; //toChart.yAxis[].userOptions.id


var _getAxisId = function _getAxisId(yAxis) {
  var _ref = yAxis || {},
      userOptions = _ref.userOptions,
      _ref2 = userOptions || {},
      id = _ref2.id;

  return id;
};

var _getYAxis = function _getYAxis(chart) {
  var yAxis = chart.yAxis;
  return yAxis || [];
};

var _isUniqueId = function _isUniqueId(chart, name) {
  var yAxis = _getYAxis(chart);

  var i = 0;

  for (i; i < yAxis.length; i++) {
    if (name === _getAxisId(yAxis[i])) {
      return false;
    }
  }

  return true;
}; //yIndex = void 0 | 0 | number
//result = [boolean, void 0 | string]


var crYAxisId = function crYAxisId(chart, yIndex, name) {
  if (_isUndef(yIndex)) {
    var _id = _isStrNotEmpty(name) ? name : _crId();

    return [_isUniqueId(chart, _id), _id];
  }

  if (yIndex === 0) {
    return [false, void 0];
  }

  if (_isNumber(yIndex)) {
    var yAxis = _getYAxis(chart),
        id = _getAxisId(yAxis[yIndex]),
        _isNew = _isUndef(id),
        _id2 = _isNew ? _crId() : id;

    return [_isNew, _id2];
  }

  return [true, _crId()];
};

var _default = crYAxisId;
exports["default"] = _default;
//# sourceMappingURL=crYAxisId.js.map