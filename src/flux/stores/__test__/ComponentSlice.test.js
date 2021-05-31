/**
 * @jest-environment jsdom
 */
 //Highcharts dataFormat require jsdom
"use strict";
import store from '../ChartStore';

const _crChb = (name='checkbox', chartType="type1") => ({
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

    store.onSetActiveContainer(true, _chb)
    expect(store.activeContChb).toBe(_chb)
    store.onSetActiveContainer(true, _chb)
    expect(store.activeContChb).toBe(_chb)

    store.onSetActiveContainer(false, _chb)
    expect(store.activeContChb).toBe(null)
  })

  test('should call setUnchecked on prev store.activeContChb', ()=>{
    const _prevChb = _crChb('prev')
    , _nextChb = _crChb('next')
    , spy = _crSpyUnchecked(_prevChb);

    store.onSetActiveContainer(true, _prevChb)
    expect(store.activeContChb).toBe(_prevChb)

    store.onSetActiveContainer(true, _nextChb)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(store.activeContChb).toBe(_nextChb)
    //spy.mockRestore()
  })

  test('should call setUnchecked and clear store.activeContChb onCloseChartContainer', ()=>{
    const _chartType = 'type1'
    , _chb = _crChb('checkbox', _chartType)
    , spy = _crSpyUnchecked(_chb);

    store.onSetActiveContainer(true, _chb)
    expect(store.activeContChb).toBe(_chb)

    store.onCloseChartContainer('not'+_chartType, 'browserType')
    expect(spy).toHaveBeenCalledTimes(0)
    expect(store.activeContChb).toBe(_chb)

    store.onCloseChartContainer(_chartType, 'browserType')
    expect(spy).toHaveBeenCalledTimes(1)
    expect(store.activeContChb).toBe(null)
  })

})
