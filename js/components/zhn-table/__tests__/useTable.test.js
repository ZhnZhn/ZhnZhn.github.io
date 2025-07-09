"use strict";

var _react = require("@testing-library/react");
var _useTable = require("../useTable");
const _getHookState = result => result.current[0];
const _getHookFn = result => result.current[1];
const _actFnByArgOne = (result, fn, argOne, expectedResult) => {
  (0, _react.act)(() => fn(argOne));
  expect(_getHookState(result)).toEqual(expectedResult);
  expect(_getHookFn(result)).toEqual(fn);
};
const _testStateAndGetFn = (result, expectedResult) => {
  const hookFn = _getHookFn(result);
  expect(_getHookState(result)).toEqual(expectedResult);
  expect(typeof hookFn).toBe('function');
  return hookFn;
};
const _testUseSort = (result, expectedResult) => {
  const {
    _compByPrev,
    ..._restResult
  } = _getHookState(result);
  expect(typeof _compByPrev).toBe("function");
  expect(_restResult).toEqual(expectedResult);
};
const _testStateAndGetFn2 = (result, expectedResult) => {
  const hookFn = _getHookFn(result);
  _testUseSort(result, expectedResult);
  expect(typeof hookFn).toBe('function');
  return hookFn;
};
const _actFnByArgOne2 = (result, fn, argOne, expectedResult) => {
  (0, _react.act)(() => fn(argOne));
  _testUseSort(result, expectedResult);
  expect(_getHookFn(result)).toEqual(fn);
};
describe('useTable', () => {
  test('useColumn should toggle property isHide by index for arr of obj', () => {
    const headers = [{}, {}],
      {
        result
      } = (0, _react.renderHook)(() => (0, _useTable.useColumn)(headers)),
      toggleByIndex = _testStateAndGetFn(result, headers);
    const _actToggleByIndex = _actFnByArgOne.bind(null, result, toggleByIndex);
    _actToggleByIndex(1, [{}, {
      isHide: true
    }]);
    _actToggleByIndex(1, [{}, {
      isHide: false
    }]);
  });
  test('useSort should sort rows by property name', () => {
    const rows = [{
        name: 'a',
        p: 1.1
      }, {
        name: 'b',
        p: 1.2
      }],
      {
        result
      } = (0, _react.renderHook)(() => (0, _useTable.useSort)(rows)),
      sortByPn = _testStateAndGetFn2(result, {
        _rows: rows,
        sortBy: void 0,
        sortTo: void 0
      });
    const _actSortByPn = _actFnByArgOne2.bind(null, result, sortByPn);
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