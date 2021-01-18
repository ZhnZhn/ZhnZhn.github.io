"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _isArr = Array.isArray;

var _getCn = function _getCn(arrOrStr) {
  return _isArr(arrOrStr) ? arrOrStr[0] ? arrOrStr[1] : '' : arrOrStr || '';
};

var crCn = function crCn() {
  var _cl1 = _getCn(arguments.length <= 0 ? undefined : arguments[0]),
      _cl2 = _getCn(arguments.length <= 1 ? undefined : arguments[1]);

  return _cl1 ? _cl2 ? _cl1 + " " + _cl2 : _cl1 : _cl2 || void 0;
};

var _default = crCn;
exports["default"] = _default;
//# sourceMappingURL=crCn.js.map