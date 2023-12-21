import {
  renderHook,
  act
} from '@testing-library/react';
import {
  useMsBrowserLoad,
  setMsBrowserFailed,
  setMsBrowserLoaded
} from '../../../flux/stores/browserStore';
import useLoadMenu from '../useLoadMenu';

const _getIsLoading = result => result.current[0];
const _getMenu = result => result.current[1];

const _expectResult = (
  result,
  isLoading,
  menu
) => {
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
    const BROWSER_TYPE = "BROWSER_TYPE_1"
    , { result } = renderHook(() => useLoadMenu(
      false,
      ()=>{},
      useMsBrowserLoad,
      BROWSER_TYPE
    ))

    //Init
    const _testResult = _expectResult.bind(null, result)
    _testResult(false, [])

    //FAILED
    act(() => setMsBrowserFailed(BROWSER_TYPE))
    _testResult(false, [])

    //LOADED
    const menu = [{caption: 'Item1'}]
    act(() => setMsBrowserLoaded(
      BROWSER_TYPE,
      menu
    ))
    _testResult(false, menu)
  })
})
