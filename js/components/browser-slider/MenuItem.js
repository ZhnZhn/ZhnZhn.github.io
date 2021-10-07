"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _isKeyEnter = _interopRequireDefault(require("../zhn/isKeyEnter"));

var _Style = require("./Style");

var _jsxRuntime = require("react/jsx-runtime");

const CL_MENU_ITEM = 'menu-item';

const MenuItem = ({
  innerRef,
  item,
  onClick
}) => {
  const {
    text,
    type
  } = item,
        _style = type === 'l' ? _Style.S_ITEM_L : _Style.S_ITEM_T,
        _hKeyDown = (0, _react.useCallback)(evt => {
    if ((0, _isKeyEnter.default)(evt)) {
      evt.preventDefault();
      onClick();
    }
  }, [onClick]);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    ref: innerRef,
    className: CL_MENU_ITEM,
    style: _style,
    tabIndex: "0",
    role: "menuitem",
    onClick: onClick,
    onKeyDown: _hKeyDown,
    children: text
  });
};

var _default = MenuItem;
exports.default = _default;
//# sourceMappingURL=MenuItem.js.map