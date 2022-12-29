import { renderHook } from '@testing-library/react';
import useProperty from '../useProperty';

const _getSetValue = result => result.current[0];
const _getGetValue = result => result.current[1];

describe('useProperty', ()=>{
  test('should return constant setter and changing getter across rendering', ()=>{
    const initialValue = 'a'
    , {
      result,
      rerender
    } = renderHook(()=>useProperty(initialValue));

    //1 Initial render and return value
    const _getValue1 = _getGetValue(result)
    , _setValue1 = _getSetValue(result);
    expect(_getValue1()).toBe(initialValue)

    //2 Setter and Getter value
    _setValue1('b')
    expect(_getValue1()).toBe('b')

    // Rerender
    rerender()
    const _setValue2 = _getSetValue(result)
    , _getValue2 = _getGetValue(result);
    expect(_setValue1).toBe(_setValue2)
    expect(_getValue2).toBe(_getValue1)
    expect(_getValue2()).toBe('b')

    //Setter and Getter value
    _setValue2('c')
    expect(_getValue2()).toBe('c')
  })
})
