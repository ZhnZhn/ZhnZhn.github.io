"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _fUseKey = require("../hooks/fUseKey");
var _LabelNew = _interopRequireDefault(require("./LabelNew"));
var _MenuItemBadge = _interopRequireDefault(require("./MenuItemBadge"));
var _jsxRuntime = require("react/jsx-runtime");
const MenuItem = props => {
  const _hKeyDown = (0, _fUseKey.useKeyEnter)(props.onClick);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    ref: props.refItem,
    tabIndex: "0",
    role: "menuitem",
    className: _styleFn.CL_ROW_TOPIC,
    style: props.style,
    onClick: props.onClick,
    onKeyDown: _hKeyDown,
    children: [props.title, props.atomBadge ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuItemBadge.default, {
      atomBadge: props.atomBadge,
      onOpen: props.onBadgeClick,
      onClose: props.onBadgeClose
    }) : null, props.isNew ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_LabelNew.default, {}) : null]
  });
};
var _default = exports.default = MenuItem;
//# sourceMappingURL=MenuItem.js.map