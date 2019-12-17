"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _big = _interopRequireDefault(require("big.js"));

var _Type = require("../../../constants/Type");

var MIN_STR = String(Number.MIN_SAFE_INTEGER);
var ABS_PROP = 'Abs';

var _getValueMoving = function _getValueMoving(item) {
  return (item || {}).valueMoving || {};
};

var _crBigForValue = function _crBigForValue(item, propName) {
  return (0, _big["default"])(_getValueMoving(item)[propName] || MIN_STR);
};

var _crBigForAbsValue = function _crBigForAbsValue(item, propName) {
  var _b = _crBigForValue(item, propName),
      _getValueMoving2 = _getValueMoving(item),
      direction = _getValueMoving2.direction;

  return direction === _Type.Direction.DOWN ? _b.times(-1) : _b;
};

var fCompareBy = function fCompareBy(propName) {
  var _crBig = propName.indexOf(ABS_PROP) !== -1 ? _crBigForAbsValue : _crBigForValue;

  return function (aC, bC) {
    var a = _crBig(aC, propName),
        b = _crBig(bC, propName);

    if (a.gt(b)) return 1;
    if (b.gt(a)) return -1;
    return 0;
  };
};

var _default = fCompareBy;
exports["default"] = _default;
//# sourceMappingURL=fCompareBy.js.map