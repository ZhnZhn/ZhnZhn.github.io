/**
 * @jest-environment jsdom
 */
//Highcharts dataFormat require jsdom
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _ChartStore = _interopRequireDefault(require("../ChartStore"));
const CHART_TYPE = 'type1';
const BROWSER_TYPE = 'browserType1';
const _crChb = function (name, chartType) {
  if (name === void 0) {
    name = 'checkbox';
  }
  if (chartType === void 0) {
    chartType = 'someType';
  }
  return {
    name,
    chartType,
    setUnchecked: () => {}
  };
};
const _crSpyUnchecked = chb => jest.spyOn(chb, 'setUnchecked');
describe('ComponentSlice', () => {
  test('should assign/clear store.activeContChb onSetActiveContainer', () => {
    const _chb = _crChb();
    expect(_ChartStore.default.activeContChb).toBe(void 0);
    _ChartStore.default.onSetActiveContainer(CHART_TYPE, BROWSER_TYPE, _chb, true);
    expect(_ChartStore.default.activeContChb).toBe(_chb);
    expect(_ChartStore.default.activeContChb.chartType).toBe(CHART_TYPE);
    expect(_ChartStore.default.activeContChb.browserType).toBe(BROWSER_TYPE);
    _ChartStore.default.onSetActiveContainer(CHART_TYPE, BROWSER_TYPE, _chb, true);
    expect(_ChartStore.default.activeContChb).toBe(_chb);
    expect(_ChartStore.default.activeContChb.chartType).toBe(CHART_TYPE);
    expect(_ChartStore.default.activeContChb.browserType).toBe(BROWSER_TYPE);
    _ChartStore.default.onSetActiveContainer(CHART_TYPE, BROWSER_TYPE, _chb, false);
    expect(_ChartStore.default.activeContChb).toBe(null);
  });
  test('should call setUnchecked on prev store.activeContChb', () => {
    const _prevChb = _crChb('prev'),
      _nextChb = _crChb('next'),
      spy = _crSpyUnchecked(_prevChb);
    _ChartStore.default.onSetActiveContainer(CHART_TYPE, BROWSER_TYPE, _prevChb, true);
    expect(_ChartStore.default.activeContChb).toBe(_prevChb);
    _ChartStore.default.onSetActiveContainer(CHART_TYPE + 'next', BROWSER_TYPE, _nextChb, true);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(_ChartStore.default.activeContChb).toBe(_nextChb);
    expect(_ChartStore.default.activeContChb.chartType).toBe(CHART_TYPE + 'next');
    expect(_ChartStore.default.activeContChb.browserType).toBe(BROWSER_TYPE);
    //spy.mockRestore()
  });

  test('should call setUnchecked and clear store.activeContChb onCloseChartContainer', () => {
    const _chartType = CHART_TYPE,
      _chb = _crChb('checkbox', _chartType),
      spy = _crSpyUnchecked(_chb);
    _ChartStore.default.onSetActiveContainer(_chartType, BROWSER_TYPE, _chb, true);
    expect(_ChartStore.default.activeContChb).toBe(_chb);
    _ChartStore.default.onCloseChartContainer('not' + _chartType, BROWSER_TYPE);
    expect(spy).toHaveBeenCalledTimes(0);
    expect(_ChartStore.default.activeContChb).toBe(_chb);
    _ChartStore.default.onCloseChartContainer(_chartType, BROWSER_TYPE);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(_ChartStore.default.activeContChb).toBe(null);
  });
});
//# sourceMappingURL=ComponentSlice.test.js.map