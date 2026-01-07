"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _big = _interopRequireDefault(require("big.js"));
var _DirectionType = require("../../../constants/DirectionType");
var _strFn = require("../../../utils/strFn");
const MIN_STR = String(Number.MIN_SAFE_INTEGER);
const ABS_PROP = 'Abs';
const _getValueMoving = item => (item || {}).valueMoving || {};
const _crBigForValue = (item, propName) => (0, _big.default)(_getValueMoving(item)[propName] || MIN_STR);
const _crBigForAbsValue = (item, propName) => {
  const _b = _crBigForValue(item, propName),
    {
      direction
    } = _getValueMoving(item);
  return direction === _DirectionType.DT_DOWN ? _b.times(-1) : _b;
};
const fCompareBy = propName => {
  const _crBig = (0, _strFn.isTokenInStr)(propName, ABS_PROP) ? _crBigForAbsValue : _crBigForValue;
  return (aC, bC) => {
    const a = _crBig(aC, propName),
      b = _crBig(bC, propName);
    return a.gt(b) ? 1 : b.gt(a) ? -1 : 0;
  };
};
var _default = exports.default = fCompareBy;
//# sourceMappingURL=fCompareBy.js.map