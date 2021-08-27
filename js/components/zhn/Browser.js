"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));

var _crCn = _interopRequireDefault(require("../zhn-utils/crCn"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
const TH_ID = 'BROWSER';
const CL_BROWSER = 'browser-container',
      CL_SHOW = 'show-popup',
      S_BLOCK = {
  display: 'block'
},
      S_NONE = {
  display: 'none'
};

const Browser = ({
  isShow,
  style,
  children
}) => {
  const TS = (0, _useTheme.default)(TH_ID),
        _cn = (0, _crCn.default)(CL_BROWSER, [isShow, CL_SHOW]),
        _style = isShow ? S_BLOCK : S_NONE;

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: _cn,
    style: { ...style,
      ...TS.ROOT,
      ..._style
    },
    children: children
  });
};
/*
Browser.propTypes = {
  isShow: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.node
}
*/


var _default = Browser;
exports.default = _default;
//# sourceMappingURL=Browser.js.map