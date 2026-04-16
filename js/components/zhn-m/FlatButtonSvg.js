"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.FlatButtonToggleOn = exports.FlatButtonSettings = exports.FlatButtonInfo = exports.FlatButtonDelete = void 0;
var _SvgIcon = require("../zhn/svg/SvgIcon");
var _IconButton = _interopRequireDefault(require("./IconButton"));
var _jsxRuntime = require("react/jsx-runtime");
const S_ICON_BT_SVG = {
  verticalAlign: 'middle'
};
const _crButtonSvg = (SvgIcon, config) => props => /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconButton.default, {
  ...props,
  ...config,
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(SvgIcon, {
    style: S_ICON_BT_SVG
  })
});
const FlatButtonInfo = exports.FlatButtonInfo = _crButtonSvg(_SvgIcon.SvgInfo);
const FlatButtonSettings = exports.FlatButtonSettings = _crButtonSvg(_SvgIcon.SvgSettings);
const FlatButtonToggleOn = exports.FlatButtonToggleOn = _crButtonSvg(_SvgIcon.SvgToggleOn);
const FlatButtonDelete = exports.FlatButtonDelete = _crButtonSvg(_SvgIcon.SvgDelete);
//# sourceMappingURL=FlatButtonSvg.js.map