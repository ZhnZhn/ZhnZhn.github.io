"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _isKeyEnter = _interopRequireDefault(require("../zhn/isKeyEnter"));

var _Style = _interopRequireDefault(require("./Style"));

var CL = {
  ITEM: 'menu-item'
};

var MenuTitle = function MenuTitle(_ref) {
  var innerRef = _ref.innerRef,
      title = _ref.title,
      onClick = _ref.onClick;

  var _hKeyDown = function _hKeyDown(evt) {
    if ((0, _isKeyEnter["default"])(evt)) {
      evt.preventDefault();
      onClick();
    }
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    ref: innerRef,
    className: CL.ITEM,
    style: _Style["default"].TITLE,
    role: "menuitem",
    tabIndex: "0",
    onClick: onClick,
    onKeyDown: _hKeyDown,
    children: [title, /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: _Style["default"].TITLE_ARROW,
      children: '<'
    })]
  });
};
/*
MenuTitle.propTypes = {
  innerRef: PropTypes.shape({
    current: PropTypes.object
  })
  title: PropTypes.string,
  onClick: PropTypes.func
}
*/


var _default = MenuTitle;
exports["default"] = _default;
//# sourceMappingURL=MenuTitle.js.map