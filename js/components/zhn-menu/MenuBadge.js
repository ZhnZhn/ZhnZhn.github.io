"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));
var _ButtonCircle = _interopRequireDefault(require("../zhn/ButtonCircle2"));
var _jsxRuntime = require("react/jsx-runtime");
const TH_ID = 'ELEMENT',
  CL = "menu__badge",
  S_BADGE_OPEN = {
    color: '#a487d4'
  };
const MenuBadge = _ref => {
  let {
    isOpen,
    counter,
    onClick,
    onBadgeClose
  } = _ref;
  const _hClick = (0, _uiApi.useCallback)(event => {
      event.stopPropagation();
      if (!isOpen) {
        onClick();
      } else {
        onBadgeClose();
      }
    }, [isOpen, onClick, onBadgeClose]),
    TS = (0, _useTheme.default)(TH_ID),
    _btStyle = isOpen ? S_BADGE_OPEN : null;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonCircle.default, {
    tabIndex: "-1",
    className: CL,
    style: {
      ..._btStyle,
      ...TS.BG
    },
    caption: counter,
    onClick: _hClick
  });
};
var _default = MenuBadge;
exports.default = _default;
//# sourceMappingURL=MenuBadge.js.map