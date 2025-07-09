import {
  renderHook,
  act
} from '@testing-library/react';
import useValidationMessages from '../useValidationMessages';

const _isArr = Array.isArray;

const _getMsgs = result => result.current[0]
, _getSetMsgs = result => result.current[1]
, _getClose =  result => result.current[2];

describe('useValidationMessages',()=>{
  test('should return tuple with msgs and reference equal functions setMsgs, hClose',()=>{
    const onClose = jest.fn()
    , {
      result
    } = renderHook(() => useValidationMessages(onClose));

    const msgs1 = _getMsgs(result)
    , _setMsgs1 = _getSetMsgs(result)
    , _close1 = _getClose(result);
    expect(_isArr(msgs1)).toBe(true)
    expect(msgs1.length).toBe(0)
    expect(typeof _setMsgs1).toBe('function')
    expect(typeof _close1).toBe('function')

    act(() => _setMsgs1([]))
    expect(_getMsgs(result)).toBe(msgs1)
    expect(_getSetMsgs(result)).toBe(_setMsgs1)
    expect(_getClose(result)).toBe(_close1)

    const _nextMsgs = ['msgs 1']
    act(() => _setMsgs1(_nextMsgs))
    expect(_getMsgs(result)).toBe(_nextMsgs)
    expect(_getSetMsgs(result)).toBe(_setMsgs1)
    expect(_getClose(result)).toBe(_close1)

    //egde case for setMsgs
    act(() => _setMsgs1())
    expect(_getMsgs(result)).toBe(_nextMsgs)
    expect(_getSetMsgs(result)).toBe(_setMsgs1)
    expect(_getClose(result)).toBe(_close1)

    act(() => _close1())
    const _msgs2 = _getMsgs(result)
    expect(_isArr(_msgs2)).toBe(true)
    expect(_msgs2.length).toBe(0)
    expect(_getSetMsgs(result)).toBe(_setMsgs1)
    expect(_getClose(result)).toBe(_close1)
    expect(onClose).toHaveBeenCalledTimes(1)

    act(() => _close1())
    expect(_getMsgs(result)).toBe(_msgs2)
    expect(_getSetMsgs(result)).toBe(_setMsgs1)
    expect(_getClose(result)).toBe(_close1)
    expect(onClose).toHaveBeenCalledTimes(2)
  })
})
