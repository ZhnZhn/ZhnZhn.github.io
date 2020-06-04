"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var getV = function getV(item, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      isUpper = _ref.isUpper,
      _ref$dfValue = _ref.dfValue,
      dfValue = _ref$dfValue === void 0 ? '' : _ref$dfValue;

  var _ref2 = item != null ? item : {},
      value = _ref2.value,
      v = _ref2.v,
      _v = value != null ? value : v,
      _value = typeof _v === 'number' ? '' + _v : _v != null ? _v : '' + dfValue;

  return isUpper ? _value.toUpperCase() : _value;
};

var _default = getV;
exports["default"] = _default;
//# sourceMappingURL=getV.js.map