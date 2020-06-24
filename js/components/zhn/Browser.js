"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));

//import PropTypes from "prop-types";
var TH_ID = 'BROWSER';
var CL = {
  BROWSER: 'browser-container',
  SHOW: 'show-popup'
};
var S = {
  BLOCK: {
    display: 'block'
  },
  NONE: {
    display: 'none'
  }
};

var Browser = function Browser(_ref) {
  var isShow = _ref.isShow,
      style = _ref.style,
      children = _ref.children;

  var TS = (0, _useTheme["default"])(TH_ID),
      _styleOpen = isShow ? S.BLOCK : S.NONE,
      _clOpen = isShow ? CL.SHOW : '',
      _clRoot = CL.BROWSER + " " + _clOpen;

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _clRoot,
    style: (0, _extends2["default"])({}, style, _styleOpen, TS.ROOT)
  }, children);
};
/*
Browser.propTypes = {
  isShow: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.node
}
*/


var _default = Browser;
exports["default"] = _default;
//# sourceMappingURL=Browser.js.map