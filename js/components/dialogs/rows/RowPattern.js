"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _InputPattern = _interopRequireDefault(require("../../zhn/InputPattern"));

var _crRow2 = _interopRequireDefault(require("./crRow"));

//import PropTypes from "prop-types";
var RowPattern = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var isShowLabels = _ref.isShowLabels,
      caption = _ref.caption,
      captionStyle = _ref.captionStyle,
      rest = (0, _objectWithoutPropertiesLoose2["default"])(_ref, ["isShowLabels", "caption", "captionStyle"]);

  var _crRow = (0, _crRow2["default"])({
    isShowLabels: isShowLabels,
    caption: caption,
    captionStyle: captionStyle
  }),
      rowStyle = _crRow.rowStyle,
      labelStyle = _crRow.labelStyle,
      _caption = _crRow.caption;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: rowStyle,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: labelStyle,
      children: _caption
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputPattern["default"], (0, _extends2["default"])({
      ref: ref
    }, rest))]
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
exports["default"] = _default;
//# sourceMappingURL=RowPattern.js.map