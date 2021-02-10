"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _reactHooks = require("@testing-library/react-hooks");

var _useLoadMenu = _interopRequireDefault(require("../useLoadMenu"));

var _getIsLoading = function _getIsLoading(result) {
  return result.current[0];
};

var _getIsLoaded = function _getIsLoaded(result) {
  return result.current[1];
};

var _getMenu = function _getMenu(result) {
  return result.current[2];
};

var _getSetLoading = function _getSetLoading(result) {
  return result.current[3];
};

var _getSetLoaded = function _getSetLoaded(result) {
  return result.current[4];
};

var _getSetFailed = function _getSetFailed(result) {
  return result.current[5];
};

var _getUpdateMenu = function _getUpdateMenu(result) {
  return result.current[6];
};

var _expectResult = function _expectResult(result, isLoading, isLoaded, menu) {
  //try {
  expect(_getIsLoading(result)).toBe(isLoading);
  expect(_getIsLoaded(result)).toBe(isLoaded);
  expect(_getMenu(result)).toEqual(menu); //} catch(error) {
  //  Error.captureStackTrace(error, _expectResult)
  //  throw error;
  //}
};

describe('useLoadMenu', function () {
  test('should return correct state after actions', function () {
    var _renderHook = (0, _reactHooks.renderHook)(function () {
      return (0, _useLoadMenu["default"])();
    }),
        result = _renderHook.result; //Init


    var _testResult = _expectResult.bind(null, result);

    _testResult(false, false, []); //LOADING


    (0, _reactHooks.act)(_getSetLoading(result));

    _testResult(true, false, []); //FAILED


    (0, _reactHooks.act)(_getSetFailed(result));

    _testResult(false, false, []); //LOADING


    (0, _reactHooks.act)(_getSetLoading(result));

    _testResult(true, false, []); //LOADED


    var menu = [{
      caption: 'Item1'
    }];
    (0, _reactHooks.act)(function () {
      return _getSetLoaded(result)(menu);
    });

    _testResult(false, true, menu); //UPDATE


    var menuUpdate = [{
      caption: 'Item2'
    }];
    (0, _reactHooks.act)(function () {
      return _getUpdateMenu(result)(menuUpdate);
    });

    _testResult(false, true, menuUpdate);
  });
});
//# sourceMappingURL=useLoadMenu.test.js.map