"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _fUseKey = require("../hooks/fUseKey");
var _LabelNew = _interopRequireDefault(require("./LabelNew"));
var _MenuItemBadge = _interopRequireDefault(require("./MenuItemBadge"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_ROW = "row__topic not-selected";
const MenuItem = _ref => {
  let {
    refItem,
    isNew,
    style,
    title,
    atomBadge,
    onBadgeClick,
    onBadgeClose,
    onClick
  } = _ref;
  const _hKeyDown = (0, _fUseKey.useKeyEnter)(onClick);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    ref: refItem,
    tabIndex: "0",
    role: "menuitem",
    className: CL_ROW,
    style: style,
    onClick: onClick,
    onKeyDown: _hKeyDown,
    children: [title, atomBadge != null && /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuItemBadge.default, {
      atomBadge: atomBadge,
      onOpen: onBadgeClick,
      onClose: onBadgeClose
    }), isNew ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_LabelNew.default, {}) : null]
  });
};
var _default = exports.default = MenuItem;
//# sourceMappingURL=MenuItem.js.map