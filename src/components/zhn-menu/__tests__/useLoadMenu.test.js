import { renderHook, act } from '@testing-library/react-hooks'
import useLoadMenu from '../useLoadMenu'

const _getIsLoading = result => result.current[0]
const _getIsLoaded = result => result.current[1]
const _getMenu = result => result.current[2]

const _getSetLoading = result => result.current[3]
const _getSetLoaded = result => result.current[4]
const _getSetFailed = result => result.current[5]
const _getUpdateMenu = result => result.current[6]

const _expectResult = (result, isLoading, isLoaded, menu) => {
  //try {
    expect(_getIsLoading(result)).toBe(isLoading)
    expect(_getIsLoaded(result)).toBe(isLoaded)
    expect(_getMenu(result)).toEqual(menu)
  //} catch(error) {
  //  Error.captureStackTrace(error, _expectResult)
  //  throw error;
  //}
};

describe('useLoadMenu', ()=>{
  test('should return correct state after actions', ()=>{
    const { result } = renderHook(() => useLoadMenu())

    //Init
    const _testResult = _expectResult.bind(null, result)
    _testResult(false, false, [])

    //LOADING
    act(_getSetLoading(result))
    _testResult(true, false, [])
    //FAILED
    act(_getSetFailed(result))
    _testResult(false, false, [])
    //LOADING
    act(_getSetLoading(result))
    _testResult(true, false, [])
    //LOADED
    const menu = [{caption: 'Item1'}]
    act(() => _getSetLoaded(result)(menu))
    _testResult(false, true, menu)
    //UPDATE
    const menuUpdate = [{caption: 'Item2'}]
    act(() => _getUpdateMenu(result)(menuUpdate))
    _testResult(false, true, menuUpdate)

  })
})
