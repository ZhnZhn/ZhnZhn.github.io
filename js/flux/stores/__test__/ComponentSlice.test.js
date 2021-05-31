/**
 * @jest-environment jsdom
 */
//Highcharts dataFormat require jsdom
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _ChartStore = _interopRequireDefault(require("../ChartStore"));

var _crChb = function _crChb(name, chartType) {
  if (name === void 0) {
    name = 'checkbox';
  }

  if (chartType === void 0) {
    chartType = "type1";
  }

  return {
    name: name,
    chartType: chartType,
    setUnchecked: function setUnchecked() {}
  };
};

var _crSpyUnchecked = function _crSpyUnchecked(chb) {
  return jest.spyOn(chb, 'setUnchecked');
};

describe('ComponentSlice', function () {
  test('should assign/clear store.activeContChb onSetActiveContainer', function () {
    var _chb = _crChb();

    expect(_ChartStore["default"].activeContChb).toBe(void 0);

    _ChartStore["default"].onSetActiveContainer(true, _chb);

    expect(_ChartStore["default"].activeContChb).toBe(_chb);

    _ChartStore["default"].onSetActiveContainer(true, _chb);

    expect(_ChartStore["default"].activeContChb).toBe(_chb);

    _ChartStore["default"].onSetActiveContainer(false, _chb);

    expect(_ChartStore["default"].activeContChb).toBe(null);
  });
  test('should call setUnchecked on prev store.activeContChb', function () {
    var _prevChb = _crChb('prev'),
        _nextChb = _crChb('next'),
        spy = _crSpyUnchecked(_prevChb);

    _ChartStore["default"].onSetActiveContainer(true, _prevChb);

    expect(_ChartStore["default"].activeContChb).toBe(_prevChb);

    _ChartStore["default"].onSetActiveContainer(true, _nextChb);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(_ChartStore["default"].activeContChb).toBe(_nextChb); //spy.mockRestore()
  });
  test('should call setUnchecked and clear store.activeContChb onCloseChartContainer', function () {
    var _chartType = 'type1',
        _chb = _crChb('checkbox', _chartType),
        spy = _crSpyUnchecked(_chb);

    _ChartStore["default"].onSetActiveContainer(true, _chb);

    expect(_ChartStore["default"].activeContChb).toBe(_chb);

    _ChartStore["default"].onCloseChartContainer('not' + _chartType, 'browserType');

    expect(spy).toHaveBeenCalledTimes(0);
    expect(_ChartStore["default"].activeContChb).toBe(_chb);

    _ChartStore["default"].onCloseChartContainer(_chartType, 'browserType');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(_ChartStore["default"].activeContChb).toBe(null);
  });
});
//# sourceMappingURL=ComponentSlice.test.js.map