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
    , _onLoadMenu = jest.fn()
    , {
      result,
      rerender
    } = renderHook(({
      isShow=false
    }={}) => useLoadMenu(
      isShow,
      _onLoadMenu,
      useMsBrowserLoad,
      BROWSER_TYPE
    ))
    , _testResult = _expectResult.bind(null, result);

    //Init wish isShow false
    _testResult(undefined, undefined)
    expect(_onLoadMenu).toHaveBeenCalledTimes(0)

    //Call _onLoadMenu with first isShow true
    rerender({isShow: true})
    _testResult(true, undefined)
    expect(_onLoadMenu).toHaveBeenCalledTimes(1)

    //FAILED
    act(() => setMsBrowserFailed(BROWSER_TYPE))
    _testResult(undefined, undefined)

    //Rerender with same isShow true
    rerender({isShow: true})
    _testResult(undefined, undefined)
    expect(_onLoadMenu).toHaveBeenCalledTimes(1)

    rerender({isShow: false})
    _testResult(undefined, undefined)
    expect(_onLoadMenu).toHaveBeenCalledTimes(1)

    //Rerender with isShow true
    rerender({isShow: true})
    _testResult(true, undefined)
    expect(_onLoadMenu).toHaveBeenCalledTimes(2)

    //LOADED
    const menu = [{caption: 'Item1'}]
    act(() => setMsBrowserLoaded(
      BROWSER_TYPE,
      menu
    ))
    _testResult(false, menu)
  })
})
