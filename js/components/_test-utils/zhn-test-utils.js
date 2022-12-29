"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _react = require("react");
var _react2 = require("@testing-library/react");
var _wrapByUiThemeProvider = _interopRequireDefault(require("./wrapByUiThemeProvider"));
var _fireEventHelpers = _interopRequireDefault(require("./fireEventHelpers"));
const utils = {
  createRef: _react.createRef,
  render: _react2.render,
  screen: _react2.screen,
  act: _react2.act,
  waitFor: _react2.waitFor,
  wrapByUiThemeProvider: _wrapByUiThemeProvider.default,
  ..._fireEventHelpers.default
};
var _default = utils;
exports.default = _default;
//# sourceMappingURL=zhn-test-utils.js.map