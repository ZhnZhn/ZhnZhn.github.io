"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _ButtonCircle = _interopRequireDefault(require("../zhn/ButtonCircle2"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_MENU_BADGE = (0, _styleFn.crElementBgCn)("menu__badge");
const MenuItemBadge = _ref => {
  let {
    atomBadge,
    onOpen,
    onClose
  } = _ref;
  const {
      is,
      value
    } = atomBadge.useAtomValue(),
    _hClick = (0, _uiApi.useCallback)(evt => {
      evt.stopPropagation();
      if (is) {
        onClose();
      } else {
        onOpen();
      }
    }, [is, onOpen, onClose]);
  return value === 0 ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonCircle.default, {
    tabIndex: "-1",
    className: CL_MENU_BADGE,
    caption: value,
    onClick: _hClick
  });
};
var _default = MenuItemBadge;
exports.default = _default;
//# sourceMappingURL=AtomBadge.js.map