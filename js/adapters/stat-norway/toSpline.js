"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crConfigType = _interopRequireDefault(require("../../charts/crConfigType1"));

var _fnUtil = _interopRequireDefault(require("./fnUtil"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var toUTC = _fnUtil["default"].toUTC,
    compose = _fnUtil["default"].compose,
    crDsValuesTimes = _fnAdapter["default"].crDsValuesTimes,
    crConfOption = _fnAdapter["default"].crConfOption;
var _isArr = Array.isArray;

var _filterLeadingNulls = function _filterLeadingNulls(data) {
  var _len = data.length;
  var i = 0;

  for (i; i < _len; i++) {
    if (data[i][1] !== null) break;
  }

  var j = _len - 1;

  for (j; j > -1; j--) {
    if (data[j][1] !== null) break;
  }

  return data.slice(i, j + 1);
};

var _isReverse = function _isReverse(data) {
  return data.length > 2 && data[0][0] > data[1][0];
};

var _checkOrder = function _checkOrder(data) {
  return _isReverse(data) ? data.reverse() : data;
};

var _fCrDataPoint = function _fCrDataPoint(values) {
  return function (time, i) {
    var _pIndex = time.length - 1,
        isP = time[_pIndex] === '*',
        _time = isP ? time.slice(0, _pIndex) : time,
        x = toUTC(_time),
        y = values[i] ? values[i].value : null;

    return isP ? [x, y, 'p'] : [x, y];
  };
};

var _postProcessData = compose(_filterLeadingNulls, _checkOrder);

var _toData = function _toData(values, times) {
  var _values = _isArr(values) ? values : [values],
      _crPoint = _fCrDataPoint(_values);

  return _isArr(times) ? _postProcessData(times.map(_crPoint)) : [];
};

var toArea = {
  crConfig: function crConfig(json, option) {
    var _crDsValuesTimes = crDsValuesTimes(json, option),
        ds = _crDsValuesTimes.ds,
        values = _crDsValuesTimes.values,
        times = _crDsValuesTimes.times,
        data = _toData(values, times),
        confOption = crConfOption(ds, option);

    return (0, _crConfigType["default"])({
      option: option,
      data: data,
      confOption: confOption
    });
  }
};
var _default = toArea;
exports["default"] = _default;
//# sourceMappingURL=toSpline.js.map