"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _useKeyEnter = _interopRequireDefault(require("../hooks/useKeyEnter"));

var _LabelNew = _interopRequireDefault(require("./LabelNew"));

var _MenuBadge = _interopRequireDefault(require("./MenuBadge"));

var _jsxRuntime = require("react/jsx-runtime");

const CL_ROW = "row__topic not-selected";

const MenuItem = _ref => {
  let {
    isNew,
    isOpen,
    style,
    title,
    counter,
    onBadgeClick,
    onBadgeClose,
    onClick
  } = _ref;

  const _hKeyDown = (0, _useKeyEnter.default)(onClick);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    tabIndex: "0",
    role: "menuitem",
    className: CL_ROW,
    style: style,
    onClick: onClick,
    onKeyDown: _hKeyDown,
    children: [title, counter !== 0 ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuBadge.default, {
      counter: counter,
      isOpen: isOpen,
      onClick: onBadgeClick,
      onBadgeClose: onBadgeClose
    }) : null, isNew ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_LabelNew.default, {}) : null]
  });
};

var _default = MenuItem;
exports.default = _default;
//# sourceMappingURL=MenuItem.js.map