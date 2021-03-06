"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

//import PropTypes from "prop-types";
var CL_SHOW_POPUP = 'show-popup';
var S = {
  SHOW: {
    display: 'block'
  },
  HIDE: {
    display: 'none'
  }
};

var ShowHide = function ShowHide(_ref) {
  var isShow = _ref.isShow,
      _ref$withoutAnimation = _ref.withoutAnimation,
      withoutAnimation = _ref$withoutAnimation === void 0 ? false : _ref$withoutAnimation,
      className = _ref.className,
      style = _ref.style,
      children = _ref.children;

  var _styleShow = isShow ? S.SHOW : S.HIDE,
      _classShow = isShow ? withoutAnimation ? '' : CL_SHOW_POPUP : '',
      _className = className ? className + " " + _classShow : _classShow || void 0;

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    "aria-expanded": isShow,
    className: _className,
    style: (0, _extends2["default"])({}, style, _styleShow),
    children: children
  });
};
/*
ShowHide.propTypes = {
  isShow: PropTypes.bool,
  withoutAnimation: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.oneOfType[
    (PropTypes.arrayOf(PropTypes.node), PropTypes.node)
  ]
}
*/


var _default = ShowHide;
exports["default"] = _default;
//# sourceMappingURL=ShowHide.js.map