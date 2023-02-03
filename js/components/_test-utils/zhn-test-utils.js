"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _react = require("react");
var _react2 = require("@testing-library/react");
var _userEvent = _interopRequireDefault(require("@testing-library/user-event"));
var _wrapByUiThemeProvider = _interopRequireDefault(require("./wrapByUiThemeProvider"));
const utils = {
  createRef: _react.createRef,
  render: _react2.render,
  screen: _react2.screen,
  act: _react2.act,
  waitFor: _react2.waitFor,
  wrapByUiThemeProvider: _wrapByUiThemeProvider.default,
  fireClick: el => _react2.fireEvent.click(el),
  fireKeyDownEnter: el => _react2.fireEvent.keyDown(el, {
    key: 'Enter',
    keyCode: 13
  }),
  KEY_DELETE: '{Delete}',
  KEY_ENTER: '{Enter}',
  setupUserEvent: jsx => ({
    user: _userEvent.default.setup(),
    ...(0, _react2.render)(jsx)
  }),
  getFnParameter: function (onFn, indexOfCalls, indexOfParameters) {
    if (indexOfCalls === void 0) {
      indexOfCalls = 0;
    }
    if (indexOfParameters === void 0) {
      indexOfParameters = 0;
    }
    return onFn.mock.calls[indexOfCalls][indexOfParameters];
  }
};
var _default = utils;
exports.default = _default;
//# sourceMappingURL=zhn-test-utils.js.map