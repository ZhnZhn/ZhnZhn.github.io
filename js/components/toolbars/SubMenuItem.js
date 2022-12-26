"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _memoEqual = _interopRequireDefault(require("../hoc/memoEqual"));
var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));
var _jsxRuntime = require("react/jsx-runtime");
const CL = "bt-sub-item",
  S_ACTIVE = {
    fontWeight: 'bold'
  },
  _isFn = fn => typeof fn === 'function';
const SubMenuItem = (0, _memoEqual.default)(_ref => {
  let {
    caption,
    initialIsActive = false,
    onClick,
    onClose
  } = _ref;
  const [isActive, toggleIsAcive] = (0, _useToggle.default)(initialIsActive),
    _hClick = () => {
      onClick();
      if (_isFn(onClose)) {
        onClose();
      } else {
        toggleIsAcive();
      }
    };
  return _isFn(onClick) ? /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    type: "button",
    className: CL,
    style: isActive ? S_ACTIVE : null,
    onClick: _hClick,
    children: caption
  }) : null;
});
var _default = SubMenuItem;
exports.default = _default;
//# sourceMappingURL=SubMenuItem.js.map