"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = require("@testing-library/react");
var _useIsShowInput = _interopRequireDefault(require("../useIsShowInput"));
const _getToggleInputById = result => result.current[0],
  _getIsInputById = result => result.current[1];
describe("useIsShowInput", () => {
  test("should return tuple with toggleInputById and isIsInputById functions", () => {
    const _id1 = "id1",
      _id2 = "id2",
      selectProps = [{
        id: _id1
      }, {
        id: _id2
      }],
      {
        result
      } = (0, _react.renderHook)(() => (0, _useIsShowInput.default)(selectProps));
    const _toggleInputById = _getToggleInputById(result);
    let _isInputById = _getIsInputById(result);
    expect(typeof _toggleInputById).toBe("function");
    expect(typeof _isInputById).toBe("function");
    expect(_isInputById(_id1)).toBe(true);
    expect(_isInputById(_id2)).toBe(true);
    (0, _react.act)(() => _toggleInputById(_id1));
    _isInputById = _getIsInputById(result);
    expect(_isInputById(_id1)).toBe(false);
    expect(_isInputById(_id2)).toBe(true);
    expect(_getToggleInputById(result)).toBe(_toggleInputById);
    (0, _react.act)(() => _toggleInputById(_id1));
    _isInputById = _getIsInputById(result);
    expect(_isInputById(_id1)).toBe(true);
    expect(_isInputById(_id2)).toBe(true);
    expect(_getToggleInputById(result)).toBe(_toggleInputById);
    (0, _react.act)(() => _toggleInputById(_id2));
    _isInputById = _getIsInputById(result);
    expect(_isInputById(_id1)).toBe(true);
    expect(_isInputById(_id2)).toBe(false);
    expect(_getToggleInputById(result)).toBe(_toggleInputById);
    (0, _react.act)(() => _toggleInputById(_id2));
    _isInputById = _getIsInputById(result);
    expect(_isInputById(_id1)).toBe(true);
    expect(_isInputById(_id2)).toBe(true);
    expect(_getToggleInputById(result)).toBe(_toggleInputById);
  });
});
//# sourceMappingURL=useIsShowInput.test.js.map