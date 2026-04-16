"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.FlatButtonToggleOn = exports.FlatButtonSettings = exports.FlatButtonInfo = exports.FlatButtonDelete = void 0;
var _SvgIcon = require("../zhn/svg/SvgIcon");
var _FlatButton = _interopRequireDefault(require("./FlatButton"));
var _jsxRuntime = require("react/jsx-runtime");
const S_SVG_BT = {
  verticalAlign: 'middle',
  margin: '0 8px 3px 8px'
};
const _fFlatButtonSvg = (SvgIcon, config) => props => /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
  ...props,
  ...config,
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(SvgIcon, {
    style: S_SVG_BT
  })
});
const FlatButtonInfo = exports.FlatButtonInfo = _fFlatButtonSvg(_SvgIcon.SvgInfo, {
  timeout: 0
});
const FlatButtonSettings = exports.FlatButtonSettings = _fFlatButtonSvg(_SvgIcon.SvgSettings);
const FlatButtonToggleOn = exports.FlatButtonToggleOn = _fFlatButtonSvg(_SvgIcon.SvgToggleOn, {
  timeout: 0
});
const S_BT = {
    width: 40
  },
  S_SVG_DELETE = {
    transform: 'translate(0, 2px)'
  };
const FlatButtonDelete = props => /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
  style: S_BT,
  timeout: 0,
  ...props,
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgIcon.SvgDelete, {
    style: S_SVG_DELETE
  })
});
exports.FlatButtonDelete = FlatButtonDelete;
//# sourceMappingURL=FlatButtonSvg.js.map