'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _big = require('big.js');

var _big2 = _interopRequireDefault(_big);

var _Type = require('../../../constants/Type');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MIN_STR = String(Number.MIN_SAFE_INTEGER);
var ABS_PROP = 'Abs';

var _getValueMoving = function _getValueMoving(item) {
  return (item || {}).valueMoving || {};
};

var _crBigForValue = function _crBigForValue(item, propName) {
  return (0, _big2.default)(_getValueMoving(item)[propName] || MIN_STR);
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

exports.default = fCompareBy;
//# sourceMappingURL=fCompareBy.js.map