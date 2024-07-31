"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = require("@testing-library/react");
var _useTitles = _interopRequireDefault(require("../useTitles"));
const _getRefValue = ref => ref.current;
const _getRefTitles = result => result.current[0],
  _getAddTitleIndex = result => result.current[1],
  _getRemoveTitleIndex = result => result.current[2];
describe("useTitles", () => {
  test("should return tuple with refTitles, addTitleIndex, removeTitleIndex", () => {
    const {
      result
    } = (0, _react.renderHook)(() => (0, _useTitles.default)());
    const refTitles = _getRefTitles(result),
      addTitleIndex = _getAddTitleIndex(result),
      removeTitleIndex = _getRemoveTitleIndex(result);
    expect(_getRefValue(refTitles)).toEqual([0]);
    expect(typeof addTitleIndex).toBe("function");
    expect(typeof removeTitleIndex).toBe("function");
    (0, _react.act)(() => addTitleIndex(1));
    expect(_getRefValue(_getRefTitles(result))).toEqual([0, 1]);
    expect(_getAddTitleIndex(result)).toBe(addTitleIndex);
    expect(_getRemoveTitleIndex(result)).toBe(removeTitleIndex);
    (0, _react.act)(() => removeTitleIndex(0));
    expect(_getRefValue(_getRefTitles(result))).toEqual([1]);
    expect(_getAddTitleIndex(result)).toBe(addTitleIndex);
    expect(_getRemoveTitleIndex(result)).toBe(removeTitleIndex);
  });
});
//# sourceMappingURL=useTitles.test.js.map