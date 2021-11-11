"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _InputPattern = _interopRequireDefault(require("../../zhn/InputPattern"));

var _crRowStyle = _interopRequireDefault(require("./crRowStyle"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
const RowPattern = /*#__PURE__*/(0, _react.forwardRef)(({
  isShowLabels,
  captionStyle,
  caption,
  ...rest
}, ref) => {
  const {
    rowStyle,
    labelStyle
  } = (0, _crRowStyle.default)({
    isShowLabels,
    captionStyle
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: rowStyle,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: labelStyle,
      children: caption
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputPattern.default, {
      ref: ref,
      ...rest
    })]
  });
});
/*
RowPattern.propTypes = {
   isShowLabels: PropTypes.bool,
   caption : PropTypes.string
   captionStyle: PropTypes.object
}
*/

var _default = RowPattern;
exports.default = _default;
//# sourceMappingURL=RowPattern.js.map