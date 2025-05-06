"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _Link = _interopRequireDefault(require("../zhn/Link"));
var _Svg = require("../zhn/svg/Svg");
var _jsxRuntime = require("react/jsx-runtime");
const COLOR = '#faebd7',
  X_URL = 'https://x.com',
  CL_LINK_X = "x-link",
  S_LINK = {
    color: COLOR,
    display: 'inline-block',
    position: 'relative',
    top: -7,
    height: 28,
    padding: '1px 10px 1px 9px',
    borderRadius: 4,
    userSelect: 'none'
  },
  S_ICON = {
    fill: COLOR,
    stroke: COLOR,
    display: 'inline-block',
    position: 'relative',
    top: 4,
    width: 18,
    height: 18,
    marginRight: 8
  };
const XPlatformLink = props => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Link.default, {
  href: `${X_URL}/${props.account}`,
  className: CL_LINK_X,
  style: {
    ...S_LINK,
    ...props.style
  },
  title: props.title,
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Svg.Svg, {
    w: "22",
    style: {
      ...S_ICON,
      ...props.iconStyle
    },
    "aria-hidden": true,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
      d: "M16.99 0H20.298L13.071 8.26L21.573 19.5H14.916L9.702 12.683L3.736 19.5H0.426L8.156 10.665L0 0H6.826L11.539 6.231L16.99 0ZM15.829 17.52H17.662L5.83 1.876H3.863L15.829 17.52Z"
    })
  }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
    children: ["@", props.account]
  })]
});
var _default = exports.default = XPlatformLink;
//# sourceMappingURL=XPlatformLink.js.map