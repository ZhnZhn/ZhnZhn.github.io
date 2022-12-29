import {
  renderHook,
  act
} from '@testing-library/react';
import useLoadMenu from '../useLoadMenu';

const _getIsLoading = result => result.current[0]
const _getMenu = result => result.current[1]

const _getSetLoaded = result => result.current[2]
const _getSetFailed = result => result.current[3]
const _getUpdateMenu = result => result.current[4]

const _expectResult = (result, isLoading, menu) => {
  //try {
    expect(_getIsLoading(result)).toBe(isLoading)
    expect(_getMenu(result)).toEqual(menu)
  //} catch(error) {
  //  Error.captureStackTrace(error, _expectResult)
  //  throw error;
  //}
};

describe('useLoadMenu', ()=>{
  test('should return correct state after actions', ()=>{
    const { result } = renderHook(() => useLoadMenu(false, ()=>{}))

    //Init
    const _testResult = _expectResult.bind(null, result)
    _testResult(false, [])

    //FAILED
    act(_getSetFailed(result))
    _testResult(false, [])
    //LOADED
    const menu = [{caption: 'Item1'}]
    act(() => _getSetLoaded(result)(menu))
    _testResult(false, menu)
    //UPDATE
    const menuUpdate = [{caption: 'Item2'}]
    act(() => _getUpdateMenu(result)(menuUpdate))
    _testResult(false, menuUpdate)

  })
})
