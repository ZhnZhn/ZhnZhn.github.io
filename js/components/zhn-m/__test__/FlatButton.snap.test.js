"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _FlatButton = _interopRequireDefault(require("../FlatButton"));

var _crDfProps = function _crDfProps(option) {
  return (0, _extends2["default"])({
    isPrimary: true,
    caption: "Load",
    title: "Click to load",
    accessKey: "l",
    onClick: jest.fn()
  }, option);
};

describe('FlatButton Snap', function () {
  test('should renders correctly with isPrimary true', function () {
    var tree = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_FlatButton["default"], _crDfProps({
      isPrimary: true
    }))).toJSON();

    expect(tree).toMatchSnapshot();
  });
  test('should renders correctly with isPrimary false', function () {
    var tree = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_FlatButton["default"], _crDfProps({
      isPrimary: false
    }))).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
//# sourceMappingURL=FlatButton.snap.test.js.map