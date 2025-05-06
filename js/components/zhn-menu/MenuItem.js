"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
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
    children: [props.title, /*#__PURE__*/(0, _jsxRuntime.jsx)(_uiApi.IfTrue, {
      v: props.atomBadge,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuItemBadge.default, {
        atomBadge: props.atomBadge,
        onOpen: props.onBadgeClick,
        onClose: props.onBadgeClose
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_uiApi.IfTrue, {
      v: props.isNew,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_LabelNew.default, {})
    })]
  });
};
var _default = exports.default = MenuItem;
//# sourceMappingURL=MenuItem.js.map