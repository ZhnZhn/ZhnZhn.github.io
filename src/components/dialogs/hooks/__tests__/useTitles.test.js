import {
  renderHook,
  act
} from '@testing-library/react';
import useTitles from '../useTitles';

const _getRefValue = ref => ref.current;

const _getRefTitles = result => result.current[0]
, _getAddTitleIndex = result => result.current[1]
, _getRemoveTitleIndex = result => result.current[2];

describe("useTitles", () => {
  test("should return tuple with refTitles, addTitleIndex, removeTitleIndex", ()=>{
    const {
      result
    } = renderHook(() => useTitles());

    const refTitles = _getRefTitles(result)
    , addTitleIndex = _getAddTitleIndex(result)
    , removeTitleIndex = _getRemoveTitleIndex(result);
    expect(_getRefValue(refTitles)).toEqual([0])
    expect(typeof addTitleIndex).toBe("function")
    expect(typeof removeTitleIndex).toBe("function")

    act(() => addTitleIndex(1))
    expect(_getRefValue(_getRefTitles(result))).toEqual([0,1])
    expect(_getAddTitleIndex(result)).toBe(addTitleIndex)
    expect(_getRemoveTitleIndex(result)).toBe(removeTitleIndex)

    act(() => removeTitleIndex(0))
    expect(_getRefValue(_getRefTitles(result))).toEqual([1])
    expect(_getAddTitleIndex(result)).toBe(addTitleIndex)
    expect(_getRemoveTitleIndex(result)).toBe(removeTitleIndex)
  })
})
