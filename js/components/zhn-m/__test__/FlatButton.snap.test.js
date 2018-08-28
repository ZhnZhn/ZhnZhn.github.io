'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _FlatButton = require('../FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _crDfProps = function _crDfProps(option) {
  return (0, _extends3.default)({
    isPrimary: true,
    caption: "Load",
    title: "Click to load",
    accessKey: "l",
    onClick: jest.fn()
  }, option);
};

describe('FlatButton Snap', function () {
  test('should renders correctly with isPrimary true', function () {
    var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_FlatButton2.default, _crDfProps({ isPrimary: true }))).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should renders correctly with isPrimary false', function () {
    var tree = _reactTestRenderer2.default.create(_react2.default.createElement(_FlatButton2.default, _crDfProps({ isPrimary: false }))).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
//# sourceMappingURL=FlatButton.snap.test.js.map