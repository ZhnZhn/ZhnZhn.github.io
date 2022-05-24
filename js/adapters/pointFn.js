"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.crVolumePoint = exports.crAthPoint = void 0;

var _big = _interopRequireDefault(require("big.js"));

var _Color = require("../constants/Color");

const _assign = Object.assign;

const crVolumePoint = _ref => {
  let {
    date,
    open,
    close,
    volume,
    option
  } = _ref;

  const _color = open && close > open ? _Color.COLOR_GREEN : open && close < open ? _Color.COLOR_RED : _Color.COLOR_GREY;

  return _assign({
    x: date,
    y: volume,
    color: _color,
    _open: open,
    _close: close
  }, option);
}; //date, prevClose as close, open


exports.crVolumePoint = crVolumePoint;

const crAthPoint = _ref2 => {
  let {
    date,
    close,
    open
  } = _ref2;

  const _bDelta = open && close ? (0, _big.default)(close).minus(open) : (0, _big.default)('0.0'),
        _bPercent = close ? _bDelta.times(100).div(close).abs().toFixed(2) : (0, _big.default)('0.0'),
        _color = _bDelta.gt(0.0) ? _Color.COLOR_RED : !_bDelta.gte(0.0) ? _Color.COLOR_GREEN : open ? _Color.COLOR_GREY : _Color.COLOR_WHITE;

  return {
    x: date,
    y: parseFloat(_bPercent),
    close: close,
    open: open ? open : 'Unknown',
    color: _color
  };
};

exports.crAthPoint = crAthPoint;
//# sourceMappingURL=pointFn.js.map