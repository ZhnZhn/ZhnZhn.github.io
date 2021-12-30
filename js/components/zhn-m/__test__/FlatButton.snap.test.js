"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _FlatButton = _interopRequireDefault(require("../FlatButton"));

var _jsxRuntime = require("react/jsx-runtime");

const _crDfProps = option => ({
  isPrimary: true,
  caption: "Load",
  title: "Click to load",
  hotKey: "l",
  onClick: jest.fn(),
  ...option
});

describe('FlatButton Snap', () => {
  test('should renders correctly with isPrimary true', () => {
    const tree = _reactTestRenderer.default.create( /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, { ..._crDfProps({
        isPrimary: true
      })
    })).toJSON();

    expect(tree).toMatchSnapshot();
  });
  test('should renders correctly with isPrimary false', () => {
    const tree = _reactTestRenderer.default.create( /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, { ..._crDfProps({
        isPrimary: false
      })
    })).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
//# sourceMappingURL=FlatButton.snap.test.js.map