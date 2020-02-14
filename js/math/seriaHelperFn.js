"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _isArr = Array.isArray;

var _isNumber = function _isNumber(n) {
  return typeof n === 'number' && n - n === 0;
};

var seriaHelperFn = {
  isPointArr: function isPointArr(data) {
    return _isArr(data) && data.length > 1 && _isArr(data[0]);
  },
  fGetY: function fGetY(point) {
    if (!point) {
      return;
    } else if (_isArr(point)) {
      return function (p) {
        return p[1];
      };
    } else if (point && _isNumber(point.y)) {
      return function (p) {
        return p.y;
      };
    }

    return;
  },
  getZeroCountFromStart: function getZeroCountFromStart(arr, getY) {
    var _toIndex = -1;

    for (var i = 0; i < arr.length; i++) {
      var _y = getY(arr[i]);

      if (_y === 0 || _y === null) {
        _toIndex = i;
      } else {
        break;
      }
    }

    return _toIndex + 1;
  },
  getZeroIndexFromEnd: function getZeroIndexFromEnd(arr, getY) {
    var _zeroIndex = 0;

    for (var i = arr.length - 1; i > -1; i--) {
      var _y = getY(arr[i]);

      if (_y === 0 || _y === null) {
        _zeroIndex = i;
      } else {
        break;
      }
    }

    return _zeroIndex;
  }
};
var _default = seriaHelperFn;
exports["default"] = _default;
//# sourceMappingURL=seriaHelperFn.js.map