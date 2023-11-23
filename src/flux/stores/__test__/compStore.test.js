/**
 * @jest-environment jsdom
 */
 //Highcharts dataFormat require jsdom
"use strict";
import {
  getActiveContCheckBox,
  setActiveContainer
} from '../contCheckBoxLogic';
import {
  closeChartContainer
} from '../compStore';

const CHART_TYPE = 'type1';
const BROWSER_TYPE = 'browserType1';

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


describe('compStore', ()=>{
  test('should assign/clear activeContChb onSetActiveContainer',()=>{
    const _chb = _crChb();
    let _contChb = getActiveContCheckBox();
    expect(_contChb).toBe(null)

    setActiveContainer(CHART_TYPE, BROWSER_TYPE, _chb, true)
    _contChb = getActiveContCheckBox()
    expect(_contChb).toBe(_chb)
    expect(_contChb.chartType).toBe(CHART_TYPE)
    expect(_contChb.browserType).toBe(BROWSER_TYPE)

    setActiveContainer(CHART_TYPE, BROWSER_TYPE, _chb, true)
    _contChb = getActiveContCheckBox()
    expect(_contChb).toBe(_chb)
    expect(_contChb.chartType).toBe(CHART_TYPE)
    expect(_contChb.browserType).toBe(BROWSER_TYPE)

    setActiveContainer(CHART_TYPE, BROWSER_TYPE, _chb, false)
    _contChb = getActiveContCheckBox()
    expect(_contChb).toBe(null)
  })

  test('should call setUnchecked on prev activeContChb', ()=>{
    const _prevChb = _crChb('prev')
    , _nextChb = _crChb('next')
    , spy = _crSpyUnchecked(_prevChb);

    setActiveContainer(CHART_TYPE, BROWSER_TYPE, _prevChb, true)
    let _contChb = getActiveContCheckBox();
    expect(_contChb).toBe(_prevChb)

    setActiveContainer(CHART_TYPE + 'next', BROWSER_TYPE, _nextChb, true)
    expect(spy).toHaveBeenCalledTimes(1)
    _contChb = getActiveContCheckBox()
    expect(_contChb).toBe(_nextChb)
    expect(_contChb.chartType).toBe(CHART_TYPE + 'next')
    expect(_contChb.browserType).toBe(BROWSER_TYPE)
    //spy.mockRestore()
  })

  test('should call setUnchecked and clear activeContChb onCloseChartContainer', ()=>{
    const _chartType = CHART_TYPE
    , _chb = _crChb('checkbox', _chartType)
    , spy = _crSpyUnchecked(_chb);

    setActiveContainer(_chartType, BROWSER_TYPE, _chb, true)
    let _contChb = getActiveContCheckBox()
    expect(_contChb).toBe(_chb)

    closeChartContainer('not'+_chartType, BROWSER_TYPE)
    expect(spy).toHaveBeenCalledTimes(0)
    _contChb = getActiveContCheckBox()
    expect(_contChb).toBe(_chb)

    closeChartContainer(_chartType, BROWSER_TYPE)
    expect(spy).toHaveBeenCalledTimes(1)
    _contChb = getActiveContCheckBox()
    expect(_contChb).toBe(null)
  })
})
