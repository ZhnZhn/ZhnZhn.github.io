
import store from '../ChartStore'

const _crChb = (name='checkbox') => ({
  name,
  setUnchecked: () => {}
});
const _crSpyUnchecked = (chb) => jest
  .spyOn(chb, 'setUnchecked');


describe('ComponentSlice', ()=>{
  test('should set/unset active container checkbox',()=>{
    const chb = _crChb();
    expect(store.activeContChb).toBe(undefined)

    store.onSetActiveContainer(true, chb)
    expect(store.activeContChb).toBe(chb)
    store.onSetActiveContainer(true, chb)
    expect(store.activeContChb).toBe(chb)

    store.onSetActiveContainer(false, chb)
    expect(store.activeContChb).toBe(null)
  })

  test('should call setUnchecked on activeContChb', ()=>{
    const _chb = _crChb();
    const spy = _crSpyUnchecked(_chb);

    store.onSetActiveContainer(true, _chb)
    expect(store.activeContChb).toBe(_chb)

    store.onSetActiveContainer(false, _chb)
    expect(spy).toHaveBeenCalled()
    expect(store.activeContChb).toBe(null)
    //spy.mockRestore()
  })

  test('should call setUnchecked on prev chb', ()=>{
    const _prevChb = _crChb('prev')
    , _nextChb = _crChb('next')
    , spy = _crSpyUnchecked(_prevChb);

    store.onSetActiveContainer(true, _prevChb)
    expect(store.activeContChb).toBe(_prevChb)

    store.onSetActiveContainer(true, _nextChb)
    expect(spy).toHaveBeenCalled()
    expect(store.activeContChb).toBe(_nextChb)
    //spy.mockRestore()
  })

})
