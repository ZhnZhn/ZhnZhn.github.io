"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _reactHooks = require("@testing-library/react-hooks");

var _useTable = _interopRequireDefault(require("../useTable"));

var useColumn = _useTable["default"].useColumn,
    useSort = _useTable["default"].useSort;

var _getHookState = function _getHookState(result) {
  return result.current[0];
};

var _getHookFn = function _getHookFn(result) {
  return result.current[1];
};

var _actFnByArgOne = function _actFnByArgOne(result, fn, argOne, expectedResult) {
  (0, _reactHooks.act)(function () {
    return fn(argOne);
  });
  expect(_getHookState(result)).toEqual(expectedResult);
  expect(_getHookFn(result)).toEqual(fn);
};

var _testStateAndGetFn = function _testStateAndGetFn(result, expectedResult) {
  var hookFn = _getHookFn(result);

  expect(_getHookState(result)).toEqual(expectedResult);
  expect(typeof hookFn).toBe('function');
  return hookFn;
};

describe('useTable', function () {
  test('useColumn should toggle property isHide by index for arr of obj', function () {
    var headers = [{}, {}],
        _renderHook = (0, _reactHooks.renderHook)(function () {
      return useColumn(headers);
    }),
        result = _renderHook.result,
        toggleByIndex = _testStateAndGetFn(result, headers);

    var _actToggleByIndex = _actFnByArgOne.bind(null, result, toggleByIndex);

    _actToggleByIndex(1, [{}, {
      isHide: true
    }]);

    _actToggleByIndex(1, [{}, {
      isHide: false
    }]);
  });
  test('useSort should sort rows by property name', function () {
    var rows = [{
      name: 'a',
      p: 1.1
    }, {
      name: 'b',
      p: 1.2
    }],
        _renderHook2 = (0, _reactHooks.renderHook)(function () {
      return useSort(rows);
    }),
        result = _renderHook2.result,
        sortByPn = _testStateAndGetFn(result, {
      _rows: rows,
      sortBy: void 0,
      sortTo: void 0
    });

    var _actSortByPn = _actFnByArgOne.bind(null, result, sortByPn);

    _actSortByPn('name', {
      _rows: rows,
      sortBy: 'name',
      sortTo: 'UP'
    });

    _actSortByPn('name', {
      _rows: rows.reverse(),
      sortBy: 'name',
      sortTo: 'DOWN'
    });

    _actSortByPn('p', {
      _rows: rows,
      sortBy: 'p',
      sortTo: 'UP'
    });

    _actSortByPn('p', {
      _rows: rows.reverse(),
      sortBy: 'p',
      sortTo: 'DOWN'
    });
  });
});
//# sourceMappingURL=useTable.test.js.map