"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = require("@testing-library/react");
var _browserStore = require("../../../flux/stores/browserStore");
var _useLoadMenu = _interopRequireDefault(require("../useLoadMenu"));
const _getIsLoading = result => result.current[0];
const _getMenu = result => result.current[1];
const _getUpdateMenu = result => result.current[2];
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
      {
        result
      } = (0, _react.renderHook)(() => (0, _useLoadMenu.default)(false, () => {}, _browserStore.useMsBrowserLoad, BROWSER_TYPE));

    //Init
    const _testResult = _expectResult.bind(null, result);
    _testResult(false, []);

    //FAILED
    (0, _react.act)(() => (0, _browserStore.setMsBrowserFailed)(BROWSER_TYPE));
    _testResult(false, []);

    //LOADED
    const menu = [{
      caption: 'Item1'
    }];
    (0, _react.act)(() => (0, _browserStore.setMsBrowserLoaded)(BROWSER_TYPE, menu));
    _testResult(false, menu);

    //UPDATE
    const menuUpdate = [{
      caption: 'Item2'
    }];
    (0, _react.act)(() => _getUpdateMenu(result)(menuUpdate));
    _testResult(false, menuUpdate);
  });
});
//# sourceMappingURL=useLoadMenu.test.js.map