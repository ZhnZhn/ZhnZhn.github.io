"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _has = require("../has");
var _jsxRuntime = require("react/jsx-runtime");
/*eslint-disable jsx-a11y/no-noninteractive-tabindex*/const TrapDiv = _ref => {
  let {
    style,
    onFocus
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: style,
    tabIndex: "0",
    "aria-hidden": "true",
    onFocus: onFocus
  });
};
/*eslint-enable jsx-a11y/no-noninteractive-tabindex*/

const FocusTrap = _ref2 => {
  let {
    refEl,
    refFirst,
    refLast,
    style,
    children
  } = _ref2;
  return _has.HAS_KEYBOARD_FOCUS ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(TrapDiv, {
      style: style,
      onFocus: () => {
        (0, _uiApi.focusRefElement)(refLast, refEl);
      }
    }), children, /*#__PURE__*/(0, _jsxRuntime.jsx)(TrapDiv, {
      style: style,
      onFocus: () => {
        (0, _uiApi.focusRefElement)(refFirst, refEl);
      }
    })]
  }) : children;
};
var _default = exports.default = FocusTrap;
//# sourceMappingURL=FocusTrap.js.map