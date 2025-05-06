"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _Button = _interopRequireDefault(require("../zhn/Button"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_MENU_BADGE = (0, _styleFn.crBtCircle2Cn)((0, _styleFn.crElementBgCn)("menu__badge")),
  S_ITEM_OPEN = {
    color: '#a487d4'
  };
const MenuItemBadge = props => {
  const {
      onOpen,
      onClose
    } = props,
    {
      is,
      value
    } = props.atomBadge.useAtomValue(),
    _hClick = (0, _uiApi.useCallback)(evt => {
      evt.stopPropagation();
      if (is) {
        onClose();
      } else {
        onOpen();
      }
    }, [is, onOpen, onClose]);
  return value ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
    tabIndex: "-1",
    className: CL_MENU_BADGE,
    style: is ? S_ITEM_OPEN : void 0,
    onClick: _hClick,
    children: value
  }) : null;
};
var _default = exports.default = MenuItemBadge;
//# sourceMappingURL=MenuItemBadge.js.map