"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _isArr = Array.isArray,
    _isNumber = function _isNumber(n) {
  return typeof n === "number" && n - n === 0;
},
    _isUndef = function _isUndef(v) {
  return typeof v === "undefined";
};

var seriaHelperFn = {
  isNumber: _isNumber,
  crPointGetter: function crPointGetter(data) {
    var getX = _isUndef(data[0].x) ? function (p) {
      return p[0];
    } : function (p) {
      return p.x;
    },
        getY = _isUndef(data[0].y) ? function (p) {
      return p[1];
    } : function (p) {
      return p.y;
    };
    return {
      getX: getX,
      getY: getY
    };
  },
  fGetY: function fGetY(point) {
    if (!point) {
      return;
    }

    if (_isArr(point)) {
      return function (p) {
        return p[1];
      };
    }

    if (_isNumber(point.y)) {
      return function (p) {
        return p.y;
      };
    }

    return;
  },
  getZeroCountFromStart: function getZeroCountFromStart(arr, getY) {
    var _toIndex = -1,
        i = 0;

    for (; i < arr.length; i++) {
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