import { renderHook, act } from '@testing-library/react-hooks'
import useBool from '../useBool'

const _getIs = result => result.current[0]
, _getSetTrue = result => result.current[1]
, _getSetFalse = result => result.current[2];

/* eslint-disable react-hooks/rules-of-hooks */
const _testInitialValue = (initialValue, expectedValue) => {
  const {result: r1} = renderHook(()=>useBool(initialValue))
  expect(_getIs(r1)).toBe(expectedValue)
}
/* eslint-enable react-hooks/rules-of-hooks */

const _actSetValue = (r, setTrue, setFalse, setValue, expectedValue) => {
  act(setValue)
  expect(_getIs(r)).toBe(expectedValue)
  expect(_getSetTrue(r)).toEqual(setTrue)
  expect(_getSetFalse(r)).toEqual(setFalse)
};

describe('useBool', ()=>{
  test('should use initialValue with default value false', ()=>{
    _testInitialValue(void 0, false)
    _testInitialValue(false, false)
    _testInitialValue(true, true)            
  })

  test('should return setTrue and setFalse function for setting vale', ()=>{
    const {result: r1} = renderHook(()=>useBool())
    , setTrue = _getSetTrue(r1)
    , setFalse = _getSetFalse(r1);

    expect(_getIs(r1)).toBe(false)
    expect(typeof setTrue).toBe('function')
    expect(typeof setFalse).toBe('function')

    const _testActSetValue = _actSetValue.bind(null, r1, setTrue, setFalse)
    _testActSetValue(setTrue, true)
    _testActSetValue(setTrue, true)
    _testActSetValue(setFalse, false)

  })
})
