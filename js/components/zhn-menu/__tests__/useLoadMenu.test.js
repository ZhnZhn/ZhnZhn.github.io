"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = require("@testing-library/react");
var _browserStore = require("../../../flux/stores/browserStore");
var _useLoadMenu = _interopRequireDefault(require("../useLoadMenu"));
const _getIsLoading = result => result.current[0];
const _getMenu = result => result.current[1];
const _expectResult = (result, isLoading, menu) => {
  //try {
  expect(_getIsLoading(result)).toBe(isLoading);
  expect(_getMenu(result)).toEqual(menu);
  //} catch(error) {
  //  Error.captureStackTrace(error, _expectResult)
  //  throw error;
  //}
};
describe('useLoadMenu', () => {
  test('should return correct state after actions', () => {
    const BROWSER_TYPE = "BROWSER_TYPE_1",
      _onLoadMenu = jest.fn(),
      {
        result,
        rerender
      } = (0, _react.renderHook)(function (_temp) {
        let {
          isShow = false
        } = _temp === void 0 ? {} : _temp;
        return (0, _useLoadMenu.default)(isShow, _onLoadMenu, _browserStore.useMsBrowserLoad, BROWSER_TYPE);
      }),
      _testResult = _expectResult.bind(null, result);

    //Init wish isShow false
    _testResult(undefined, undefined);
    expect(_onLoadMenu).toHaveBeenCalledTimes(0);

    //Call _onLoadMenu with first isShow true
    rerender({
      isShow: true
    });
    _testResult(true, undefined);
    expect(_onLoadMenu).toHaveBeenCalledTimes(1);

    //FAILED
    (0, _react.act)(() => (0, _browserStore.setMsBrowserFailed)(BROWSER_TYPE));
    _testResult(undefined, undefined);

    //Rerender with same isShow true
    rerender({
      isShow: true
    });
    _testResult(undefined, undefined);
    expect(_onLoadMenu).toHaveBeenCalledTimes(1);
    rerender({
      isShow: false
    });
    _testResult(undefined, undefined);
    expect(_onLoadMenu).toHaveBeenCalledTimes(1);

    //Rerender with isShow true
    rerender({
      isShow: true
    });
    _testResult(true, undefined);
    expect(_onLoadMenu).toHaveBeenCalledTimes(2);

    //LOADED
    const menu = [{
      caption: 'Item1'
    }];
    (0, _react.act)(() => (0, _browserStore.setMsBrowserLoaded)(BROWSER_TYPE, menu));
    _testResult(false, menu);
  });
});
//# sourceMappingURL=useLoadMenu.test.js.map