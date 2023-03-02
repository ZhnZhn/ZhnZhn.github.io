/**
 * @jest-environment jsdom
 */
 //Highcharts dataFormat require jsdom
"use strict";
import store from '../ChartStore';

const CHART_TYPE = 'type1'
const BROWSER_TYPE = 'browserType1'

const _crChb = (
  name='checkbox',
  chartType='someType'
) => ({
  name,
  chartType,
  setUnchecked: () => {}
});
const _crSpyUnchecked = (chb) => jest
  .spyOn(chb, 'setUnchecked');


describe('ComponentSlice', ()=>{
  test('should assign/clear store.activeContChb onSetActiveContainer',()=>{
    const _chb = _crChb();
    expect(store.activeContChb).toBe(void 0)

    store.onSetActiveContainer(CHART_TYPE, BROWSER_TYPE, _chb, true)
    expect(store.activeContChb).toBe(_chb)
    expect(store.activeContChb.chartType).toBe(CHART_TYPE)
    expect(store.activeContChb.browserType).toBe(BROWSER_TYPE)
    store.onSetActiveContainer(CHART_TYPE, BROWSER_TYPE, _chb, true)
    expect(store.activeContChb).toBe(_chb)
    expect(store.activeContChb.chartType).toBe(CHART_TYPE)
    expect(store.activeContChb.browserType).toBe(BROWSER_TYPE)

    store.onSetActiveContainer(CHART_TYPE, BROWSER_TYPE, _chb, false)
    expect(store.activeContChb).toBe(null)
  })

  test('should call setUnchecked on prev store.activeContChb', ()=>{
    const _prevChb = _crChb('prev')
    , _nextChb = _crChb('next')
    , spy = _crSpyUnchecked(_prevChb);

    store.onSetActiveContainer(CHART_TYPE, BROWSER_TYPE, _prevChb, true)
    expect(store.activeContChb).toBe(_prevChb)

    store.onSetActiveContainer(CHART_TYPE + 'next', BROWSER_TYPE, _nextChb, true)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(store.activeContChb).toBe(_nextChb)
    expect(store.activeContChb.chartType).toBe(CHART_TYPE + 'next')
    expect(store.activeContChb.browserType).toBe(BROWSER_TYPE)
    //spy.mockRestore()
  })

  test('should call setUnchecked and clear store.activeContChb onCloseChartContainer', ()=>{
    const _chartType = CHART_TYPE
    , _chb = _crChb('checkbox', _chartType)
    , spy = _crSpyUnchecked(_chb);

    store.onSetActiveContainer(_chartType, BROWSER_TYPE, _chb, true)
    expect(store.activeContChb).toBe(_chb)

    store.onCloseChartContainer('not'+_chartType, BROWSER_TYPE)
    expect(spy).toHaveBeenCalledTimes(0)
    expect(store.activeContChb).toBe(_chb)

    store.onCloseChartContainer(_chartType, BROWSER_TYPE)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(store.activeContChb).toBe(null)
  })

})
