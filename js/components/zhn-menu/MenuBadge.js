"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _ThemeContext = _interopRequireDefault(require("../hoc/ThemeContext"));

var _ButtonCircle = _interopRequireDefault(require("../zhn/ButtonCircle2"));

var TH_ID = 'ELEMENT';
var CL = "menu__badge";
var S = {
  BT: {
    marginLeft: 4
  },
  BADGE_OPEN: {
    color: '#a487d4'
  }
};

var MenuBadge = function MenuBadge(_ref) {
  var isOpen = _ref.isOpen,
      counter = _ref.counter,
      onClick = _ref.onClick,
      onBadgeClose = _ref.onBadgeClose;

  var theme = (0, _react.useContext)(_ThemeContext["default"]),
      TS = theme.getStyle(TH_ID),
      _btStyle = isOpen ? S.BADGE_OPEN : null,
      _hClick = (0, _react.useCallback)(function (event) {
    event.stopPropagation();

    if (!isOpen) {
      onClick();
    } else {
      onBadgeClose();
    }
  }, [isOpen, onClick, onBadgeClose]);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonCircle["default"], {
    tabIndex: "-1",
    className: CL,
    style: (0, _extends2["default"])({}, S.BT, _btStyle, TS.BG),
    caption: counter,
    onClick: _hClick
  });
};

var _default = MenuBadge;
exports["default"] = _default;
//# sourceMappingURL=MenuBadge.js.map