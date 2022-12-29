import { renderHook } from '@testing-library/react';
import useSelectItem from '../useSelectItem';

const _getRef = result => result.current[0]
const _getRefValue = result => _getRef(result).current
const _getSelect = result => result.current[1]

describe('useSelectItem', ()=>{
  test('should return [ref, const select]', ()=>{
    const {
      result: r1,
      rerender
    } = renderHook(()=>useSelectItem())
    //1 Initial values
    expect(_getRefValue(r1)).toBe(void 0)
    const _select = _getSelect(r1)
    expect(typeof _select).toBe('function')

    //2.1 select item
    _select({ caption: 'a'})
    expect(_getRefValue(r1)).toBe('a')
    //2.2 select empty item
    _select()
    expect(_getRefValue(r1)).toBe(void 0)
    //2.3 select item
    _select({ caption: 'b'})
    expect(_getRefValue(r1)).toBe('b')

    //3 rerender
    rerender()
    expect(_getRefValue(r1)).toBe('b')
    expect(_getSelect(r1)).toBe(_select)
  })
})
