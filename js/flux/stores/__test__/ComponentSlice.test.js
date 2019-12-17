"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _ChartStore = _interopRequireDefault(require("../ChartStore"));

var _crChb = function _crChb(name) {
  if (name === void 0) {
    name = 'checkbox';
  }

  return {
    name: name,
    setUnchecked: function setUnchecked() {}
  };
};

var _crSpyUnchecked = function _crSpyUnchecked(chb) {
  return jest.spyOn(chb, 'setUnchecked');
};

describe('ComponentSlice', function () {
  test('should set/unset active container checkbox', function () {
    var chb = _crChb();

    expect(_ChartStore["default"].activeContChb).toBe(undefined);

    _ChartStore["default"].onSetActiveContainer(true, chb);

    expect(_ChartStore["default"].activeContChb).toBe(chb);

    _ChartStore["default"].onSetActiveContainer(true, chb);

    expect(_ChartStore["default"].activeContChb).toBe(chb);

    _ChartStore["default"].onSetActiveContainer(false, chb);

    expect(_ChartStore["default"].activeContChb).toBe(null);
  });
  test('should call setUnchecked on activeContChb', function () {
    var _chb = _crChb();

    var spy = _crSpyUnchecked(_chb);

    _ChartStore["default"].onSetActiveContainer(true, _chb);

    expect(_ChartStore["default"].activeContChb).toBe(_chb);

    _ChartStore["default"].onSetActiveContainer(false, _chb);

    expect(spy).toHaveBeenCalled();
    expect(_ChartStore["default"].activeContChb).toBe(null); //spy.mockRestore()
  });
  test('should call setUnchecked on prev chb', function () {
    var _prevChb = _crChb('prev'),
        _nextChb = _crChb('next'),
        spy = _crSpyUnchecked(_prevChb);

    _ChartStore["default"].onSetActiveContainer(true, _prevChb);

    expect(_ChartStore["default"].activeContChb).toBe(_prevChb);

    _ChartStore["default"].onSetActiveContainer(true, _nextChb);

    expect(spy).toHaveBeenCalled();
    expect(_ChartStore["default"].activeContChb).toBe(_nextChb); //spy.mockRestore()
  });
});
//# sourceMappingURL=ComponentSlice.test.js.map