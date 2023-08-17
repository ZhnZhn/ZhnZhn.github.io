"use strict";

exports.__esModule = true;
exports.default = void 0;
var _jsxRuntime = require("react/jsx-runtime");
const COLOR = '#faebd7',
  TWITTER_X_URL = 'https://twitter.com',
  CL_BT_TWITTER = "bt-twitter",
  S_LINK = {
    color: COLOR,
    display: 'inline-block',
    position: 'relative',
    top: -7,
    height: 28,
    padding: '1px 10px 1px 9px',
    borderRadius: 4,
    outline: 0,
    textDecoration: 'none',
    userSelect: 'none',
    cursor: 'pointer'
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
const TITLE = "X formerly known as Twitter";
const TwitterLink = _ref => {
  let {
    style,
    iconStyle,
    account,
    title
  } = _ref;
  return account ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("a", {
    className: CL_BT_TWITTER,
    style: {
      ...S_LINK,
      ...style
    },
    target: "_blank",
    href: TWITTER_X_URL + "/" + account,
    title: title,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("svg", {
      viewBox: "0 0 22 20",
      xmlns: "http://www.w3.org/2000/svg",
      style: {
        ...S_ICON,
        ...iconStyle
      },
      "aria-label": TITLE,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("title", {
        children: TITLE
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
        d: "M16.99 0H20.298L13.071 8.26L21.573 19.5H14.916L9.702 12.683L3.736 19.5H0.426L8.156 10.665L0 0H6.826L11.539 6.231L16.99 0ZM15.829 17.52H17.662L5.83 1.876H3.863L15.829 17.52Z"
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
      children: ["@", account]
    })]
  }) : null;
};
var _default = TwitterLink;
exports.default = _default;
//# sourceMappingURL=TwitterLink.js.map