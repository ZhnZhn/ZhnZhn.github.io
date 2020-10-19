"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _MenuAriaItem = _interopRequireDefault(require("./MenuAriaItem"));

var S = {
  ITEM: {
    position: 'relative'
  },
  PREV_PAGE: {
    position: 'absolute',
    top: 0,
    left: 16
  },
  TITLE: {
    paddingLeft: 16
  }
};
var MenuTitle = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var titleCl = _ref.titleCl,
      title = _ref.title,
      onClick = _ref.onClick;

  if (!title) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_MenuAriaItem["default"], {
    ref: ref,
    className: titleCl,
    style: S.ITEM,
    onClick: onClick,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: S.PREV_PAGE,
      children: "<"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: S.TITLE,
      children: title
    })]
  });
});
/*
MenuTitle.propTypes = {
  titleCl: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func
}
*/

var _default = MenuTitle;
exports["default"] = _default;
//# sourceMappingURL=MenuTitle.js.map