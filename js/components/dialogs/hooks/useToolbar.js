"use strict";

exports.__esModule = true;
exports.useToolbar = exports.TITLE_TOGGLE = void 0;
var _arrFn = require("../../../utils/arrFn");
var _a11yFn = require("../../a11yFn");
var _useProperty = require("../../hooks/useProperty");
var _FlatButtonSvg = require("../../zhn-m/FlatButtonSvg");
var _jsxRuntime = require("react/jsx-runtime");
const TITLE_TOGGLE = exports.TITLE_TOGGLE = "Toggle input labels";
const LABEL_TOGGLE = "Open toggle inputs",
  LABEL_OPTIONS = "Open dialog options",
  LABEL_ABOUT = "Open about data source";
const useToolbar = _ref => {
  let {
    titleToggle,
    toggleInputs,
    toggleOptions,
    onAbout
  } = _ref;
  return (0, _useProperty.useRefInit)(() => (0, _arrFn.filterBoolean)([toggleInputs ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButtonSvg.FlatButtonToggleOn, {
    ...(0, _a11yFn.crBtAriaLabelProps)(titleToggle || LABEL_TOGGLE),
    onClick: toggleInputs
  }, "t") : void 0, toggleOptions ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButtonSvg.FlatButtonSettings, {
    ...(0, _a11yFn.crBtAriaLabelProps)(LABEL_OPTIONS),
    timeout: 0,
    onClick: toggleOptions
  }, "o") : void 0, /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButtonSvg.FlatButtonInfo, {
    ...(0, _a11yFn.crBtAriaLabelProps)(LABEL_ABOUT),
    onClick: onAbout
  }, "a")]));
};
exports.useToolbar = useToolbar;
//# sourceMappingURL=useToolbar.js.map