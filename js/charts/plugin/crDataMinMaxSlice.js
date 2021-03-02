"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _isArr = Array.isArray;

var _findDataIndex = function _findDataIndex(data, v) {
  var _max = data.length;
  var i = 0;

  for (i; i < _max; i++) {
    if (data[i][0] >= v) {
      return i;
    }
  }

  return i;
};

var crDataMinMaxSlice = function crDataMinMaxSlice(_ref) {
  var data = _ref.data,
      userMin = _ref.userMin,
      userMax = _ref.userMax;

  if (!_isArr(data) || !_isArr(data[0]) || !userMin || !userMax) {
    return data;
  }

  var _fromIndex = _findDataIndex(data, userMin),
      _toIndex = _findDataIndex(data, userMax);

  return _fromIndex <= _toIndex ? data.slice(_fromIndex, _toIndex + 1) : data;
};

var _default = crDataMinMaxSlice;
exports["default"] = _default;
//# sourceMappingURL=crDataMinMaxSlice.js.map