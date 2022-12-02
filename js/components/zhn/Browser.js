"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));

var _jsxRuntime = require("react/jsx-runtime");

const TH_ID = 'BROWSER',
      CL_BROWSER = 'browser-container',
      CL_SHOW = 'show-popup',
      S_BLOCK = {
  display: 'block'
},
      S_NONE = {
  display: 'none'
};

const Browser = _ref => {
  let {
    isShow,
    style,
    children
  } = _ref;
  const TS = (0, _useTheme.default)(TH_ID),
        [_cn, _style] = isShow ? [CL_BROWSER + " " + CL_SHOW, S_BLOCK] : [CL_BROWSER, S_NONE];
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: _cn,
    style: { ...style,
      ...TS.ROOT,
      ..._style
    },
    children: children
  });
};

var _default = Browser;
exports.default = _default;
//# sourceMappingURL=Browser.js.map