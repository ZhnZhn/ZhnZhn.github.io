"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _crPoint = _interopRequireDefault(require("../crPoint"));

var _Color = _interopRequireDefault(require("../../constants/Color"));

var crVolumePoint = _crPoint["default"].crVolumePoint,
    crAthPoint = _crPoint["default"].crAthPoint;
describe('crVolumePoint', function () {
  var fn = crVolumePoint;
  var _p = {
    date: 12345,
    volume: 10
  };
  var option = {
    _high: 2.2,
    _low: 0.8
  };
  it('should cr volume point with option', function () {
    expect(fn((0, _extends2["default"])({}, _p, {
      open: 1,
      close: 2,
      option: option
    }))).toEqual((0, _extends2["default"])({
      x: _p.date,
      y: _p.volume,
      color: _Color["default"].GREEN,
      _open: 1,
      _close: 2
    }, option));
    expect(fn((0, _extends2["default"])({}, _p, {
      open: 2,
      close: 1,
      option: option
    }))).toEqual((0, _extends2["default"])({
      x: _p.date,
      y: _p.volume,
      color: _Color["default"].RED,
      _open: 2,
      _close: 1
    }, option));
    expect(fn((0, _extends2["default"])({}, _p, {
      open: 2,
      close: 2,
      option: option
    }))).toEqual((0, _extends2["default"])({
      x: _p.date,
      y: _p.volume,
      color: _Color["default"].GRAY,
      _open: 2,
      _close: 2
    }, option));
  });
  it('should cr point C.GRAY for open falsy edge case', function () {
    expect(fn((0, _extends2["default"])({}, _p, {
      open: null,
      close: 2
    }))).toEqual({
      x: _p.date,
      y: _p.volume,
      color: _Color["default"].GRAY,
      _open: null,
      _close: 2
    });
    expect(fn((0, _extends2["default"])({}, _p, {
      open: void 0,
      close: 2
    }))).toEqual({
      x: _p.date,
      y: _p.volume,
      color: _Color["default"].GRAY,
      _open: void 0,
      _close: 2
    });
    expect(fn((0, _extends2["default"])({}, _p, {
      open: 0,
      close: 2
    }))).toEqual({
      x: _p.date,
      y: _p.volume,
      color: _Color["default"].GRAY,
      _open: 0,
      _close: 2
    });
    expect(fn((0, _extends2["default"])({}, _p, {
      open: NaN,
      close: 2
    }))).toEqual({
      x: _p.date,
      y: _p.volume,
      color: _Color["default"].GRAY,
      _open: NaN,
      _close: 2
    });
  });
});
describe('crAthPoint', function () {
  var fn = crAthPoint;
  var _p = {
    date: 12345
  };
  it('should cr ath point', function () {
    var _upBy10 = {
      close: 100,
      open: 110
    };
    expect(fn((0, _extends2["default"])({}, _p, _upBy10))).toEqual((0, _extends2["default"])({
      x: _p.date,
      y: 10
    }, _upBy10, {
      color: _Color["default"].GREEN
    }));
    var _downBy10 = {
      close: 100,
      open: 90
    };
    expect(fn((0, _extends2["default"])({}, _p, _downBy10))).toEqual((0, _extends2["default"])({
      x: _p.date,
      y: 10
    }, _downBy10, {
      color: _Color["default"].RED
    }));
    var _equal = {
      close: 100,
      open: 100
    };
    expect(fn((0, _extends2["default"])({}, _p, _equal))).toEqual((0, _extends2["default"])({
      x: _p.date,
      y: 0
    }, _equal, {
      color: _Color["default"].GRAY
    }));
  });
  it('should return point with y=0 for falsy prevClose', function () {
    var _pUndef = {
      close: void 0,
      open: 100
    };
    expect(fn((0, _extends2["default"])({}, _p, _pUndef))).toEqual((0, _extends2["default"])({
      x: _p.date,
      y: 0
    }, _pUndef, {
      color: _Color["default"].GRAY
    }));
    var _pNull = {
      close: null,
      open: 100
    };
    expect(fn((0, _extends2["default"])({}, _p, _pNull))).toEqual((0, _extends2["default"])({
      x: _p.date,
      y: 0
    }, _pNull, {
      color: _Color["default"].GRAY
    }));
    var _pZero = {
      close: 0,
      open: 100
    };
    expect(fn((0, _extends2["default"])({}, _p, _pZero))).toEqual((0, _extends2["default"])({
      x: _p.date,
      y: 0
    }, _pZero, {
      color: _Color["default"].GRAY
    }));
  });
  it('should return point with color=C.WHITE && open=Unknown for falsy open', function () {
    expect(fn((0, _extends2["default"])({}, _p, {
      close: 100,
      open: null
    }))).toEqual({
      x: _p.date,
      y: 0,
      close: 100,
      open: 'Unknown',
      color: _Color["default"].WHITE
    });
    expect(fn((0, _extends2["default"])({}, _p, {
      close: 100,
      open: 0
    }))).toEqual({
      x: _p.date,
      y: 0,
      close: 100,
      open: 'Unknown',
      color: _Color["default"].WHITE
    });
  });
});
//# sourceMappingURL=crPoint.test.js.map