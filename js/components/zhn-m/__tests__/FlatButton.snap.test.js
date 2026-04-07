/**
 * @jest-environment jsdom
 */
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));
var _FlatButton = _interopRequireDefault(require("../FlatButton"));
var _jsxRuntime = require("react/jsx-runtime");
const _crProps = option => ({
  caption: "Load",
  title: "Click to load",
  hotKey: "l",
  onClick: jest.fn(),
  ...option
});
describe('FlatButton Snap', () => {
  test('should renders correctly', () => {
    const tree = _reactTestRenderer.default.create(/*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      ..._crProps()
    })).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should renders correctly without title', () => {
    const tree = _reactTestRenderer.default.create(/*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      ..._crProps({
        title: void 0
      })
    })).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
//# sourceMappingURL=FlatButton.snap.test.js.map