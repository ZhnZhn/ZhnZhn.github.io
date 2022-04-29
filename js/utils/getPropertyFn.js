"use strict";

exports.__esModule = true;
exports.getV = exports.getC = void 0;

const getC = item => {
  var _ref;

  const {
    caption,
    c
  } = item != null ? item : {};
  return '' + ((_ref = caption != null ? caption : c) != null ? _ref : '');
};

exports.getC = getC;

const getV = function (item, _temp) {
  let {
    isUpper,
    dfValue = ''
  } = _temp === void 0 ? {} : _temp;

  const {
    value,
    v
  } = item != null ? item : {},
        _v = value != null ? value : v,
        _value = typeof _v === 'number' ? '' + _v : _v != null ? _v : '' + dfValue;

  return isUpper ? _value.toUpperCase() : _value;
};

exports.getV = getV;
//# sourceMappingURL=getPropertyFn.js.map