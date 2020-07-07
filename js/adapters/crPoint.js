"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _big = _interopRequireDefault(require("big.js"));

var _Color = _interopRequireDefault(require("../constants/Color"));

var _assign = Object.assign;
var crPoint = {
  crVolumePoint: function crVolumePoint(_ref) {
    var date = _ref.date,
        open = _ref.open,
        close = _ref.close,
        volume = _ref.volume,
        option = _ref.option;

    var _color;

    if (open && close > open) {
      _color = _Color["default"].GREEN;
    } else if (open && close < open) {
      _color = _Color["default"].RED;
    } else {
      _color = _Color["default"].GRAY;
    }

    return _assign({
      x: date,
      y: volume,
      color: _color,
      _open: open,
      _close: close
    }, option);
  },
  //date, prevClose as close, open
  crAthPoint: function crAthPoint(_ref2) {
    var date = _ref2.date,
        close = _ref2.close,
        open = _ref2.open;

    var _bDelta = open && close ? (0, _big["default"])(close).minus(open) : (0, _big["default"])('0.0'),
        _bPercent = close ? _bDelta.times(100).div(close).abs().toFixed(2) : (0, _big["default"])('0.0');

    var _color;

    if (_bDelta.gt(0.0)) {
      _color = _Color["default"].RED;
    } else if (!_bDelta.gte(0.0)) {
      _color = _Color["default"].GREEN;
    } else {
      _color = open ? _Color["default"].GRAY : _Color["default"].WHITE;
    }

    return {
      x: date,
      y: parseFloat(_bPercent),
      close: close,
      open: open ? open : 'Unknown',
      color: _color
    };
  }
};
var _default = crPoint;
exports["default"] = _default;
//# sourceMappingURL=crPoint.js.map