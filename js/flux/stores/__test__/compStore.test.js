/**
 * @jest-environment jsdom
 */
//Highcharts dataFormat require jsdom
"use strict";

var _contCheckBoxLogic = require("../contCheckBoxLogic");
var _compStore = require("../compStore");
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
describe('compStore', () => {
  test('should assign/clear activeContChb onSetActiveContainer', () => {
    const _chb = _crChb();
    let _contChb = (0, _contCheckBoxLogic.getActiveContCheckBox)();
    expect(_contChb).toBe(null);
    (0, _contCheckBoxLogic.setActiveContainer)(CHART_TYPE, BROWSER_TYPE, _chb, true);
    _contChb = (0, _contCheckBoxLogic.getActiveContCheckBox)();
    expect(_contChb).toBe(_chb);
    expect(_contChb.chartType).toBe(CHART_TYPE);
    expect(_contChb.browserType).toBe(BROWSER_TYPE);
    (0, _contCheckBoxLogic.setActiveContainer)(CHART_TYPE, BROWSER_TYPE, _chb, true);
    _contChb = (0, _contCheckBoxLogic.getActiveContCheckBox)();
    expect(_contChb).toBe(_chb);
    expect(_contChb.chartType).toBe(CHART_TYPE);
    expect(_contChb.browserType).toBe(BROWSER_TYPE);
    (0, _contCheckBoxLogic.setActiveContainer)(CHART_TYPE, BROWSER_TYPE, _chb, false);
    _contChb = (0, _contCheckBoxLogic.getActiveContCheckBox)();
    expect(_contChb).toBe(null);
  });
  test('should call setUnchecked on prev activeContChb', () => {
    const _prevChb = _crChb('prev'),
      _nextChb = _crChb('next'),
      spy = _crSpyUnchecked(_prevChb);
    (0, _contCheckBoxLogic.setActiveContainer)(CHART_TYPE, BROWSER_TYPE, _prevChb, true);
    let _contChb = (0, _contCheckBoxLogic.getActiveContCheckBox)();
    expect(_contChb).toBe(_prevChb);
    (0, _contCheckBoxLogic.setActiveContainer)(CHART_TYPE + 'next', BROWSER_TYPE, _nextChb, true);
    expect(spy).toHaveBeenCalledTimes(1);
    _contChb = (0, _contCheckBoxLogic.getActiveContCheckBox)();
    expect(_contChb).toBe(_nextChb);
    expect(_contChb.chartType).toBe(CHART_TYPE + 'next');
    expect(_contChb.browserType).toBe(BROWSER_TYPE);
    //spy.mockRestore()
  });

  test('should call setUnchecked and clear activeContChb onCloseChartContainer', () => {
    const _chartType = CHART_TYPE,
      _chb = _crChb('checkbox', _chartType),
      spy = _crSpyUnchecked(_chb);
    (0, _contCheckBoxLogic.setActiveContainer)(_chartType, BROWSER_TYPE, _chb, true);
    let _contChb = (0, _contCheckBoxLogic.getActiveContCheckBox)();
    expect(_contChb).toBe(_chb);
    (0, _compStore.closeChartContainer)('not' + _chartType, BROWSER_TYPE);
    expect(spy).toHaveBeenCalledTimes(0);
    _contChb = (0, _contCheckBoxLogic.getActiveContCheckBox)();
    expect(_contChb).toBe(_chb);
    (0, _compStore.closeChartContainer)(_chartType, BROWSER_TYPE);
    expect(spy).toHaveBeenCalledTimes(1);
    _contChb = (0, _contCheckBoxLogic.getActiveContCheckBox)();
    expect(_contChb).toBe(null);
  });
});
//# sourceMappingURL=compStore.test.js.map