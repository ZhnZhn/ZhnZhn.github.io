"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _isNaN = function _isNaN(v) {
  return Number.isNaN(v);
};

var _compMaybeNaN = function _compMaybeNaN(v1, v2) {
  if (_isNaN(v1)) {
    if (_isNaN(v2)) {
      return 0;
    } else {
      return 1;
    }
  }

  if (_isNaN(v2)) {
    return -1;
  }

  return 2;
};

var _compNumber = function _compNumber(v1, v2) {
  var _r = _compMaybeNaN(v1, v2);

  if (_r !== 2) return _r;
  if (v1 < v2) return 1;
  if (v1 > v2) return -1;
  return 0;
};

var _compStr = function _compStr(v1, v2) {
  if (v1 < v2) return 1;
  if (v1 > v2) return -1;
  return 0;
};

var compFactory = {
  compBy: function compBy(TOKEN_NAN, pn) {
    return function (a, b) {
      var v1 = a[pn],
          v2 = b[pn];

      if (typeof v1 === 'number' || v1 === TOKEN_NAN) {
        return _compNumber(v1, v2);
      } else {
        return _compStr(v1, v2);
      }
    };
  },
  opCompBy: function opCompBy(pn, fn) {
    return function (a, b) {
      var _r = _compMaybeNaN(a[pn], b[pn]);

      if (_r !== 2) return _r;
      return fn(b, a);
    };
  }
};
var _default = compFactory;
exports["default"] = _default;
//# sourceMappingURL=compFactory.js.map