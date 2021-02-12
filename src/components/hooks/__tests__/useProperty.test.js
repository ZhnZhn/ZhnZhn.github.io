import { renderHook } from '@testing-library/react-hooks'
import useProperty from '../useProperty'

const _getSetValue = result => result.current[0];
const _getGetValue = result => result.current[1];

describe('useProperty', ()=>{
  test('should return constant setter and changing getter across rendering', ()=>{
    const initialValue = 'a'
    , {
      result,
      rerender
    } = renderHook(()=>useProperty(initialValue));

    const _getValue1 = _getGetValue(result)
    , _setValue1 = _getSetValue(result);
    expect(_getValue1()).toBe(initialValue)

    _setValue1('b')
    expect(_getValue1()).toBe('b')

    rerender()
    const _setValue2 = _getSetValue(result)
    , _getValue2 = _getGetValue(result);
    expect(_setValue1).toBe(_setValue2)
    expect(_getValue2).not.toBe(_getValue1)
    expect(_getValue2()).toBe('b')

    _setValue2('c')
    expect(_getValue2()).toBe('c')
  })
})
