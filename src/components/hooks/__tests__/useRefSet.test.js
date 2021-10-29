import { renderHook } from '@testing-library/react-hooks';
import useRefSet from '../useRefSet';

const _getRefValue = result => result.current[0].current;
const _getSetValue = result => result.current[1];

describe('useRefSet', ()=> {
  test('should return [ref, setRefValue]', ()=>{
    const initialValue = 'initialValue'
    , updatedValue = 'updatedValue'
    , {result, rerender} = renderHook((initialValue) => useRefSet(initialValue), {initialProps: initialValue})
    , setRefValue = _getSetValue(result)
    //1 Test initialValue
    expect(_getRefValue(result)).toBe(initialValue)

    //2 Test rerender
    rerender(updatedValue)
    expect(_getRefValue(result)).toBe(initialValue)
    expect(setRefValue).toBe(_getSetValue(result))

    //3 Test setRefValue
    setRefValue(updatedValue)
    expect(_getRefValue(result)).toBe(updatedValue)
  })
})
