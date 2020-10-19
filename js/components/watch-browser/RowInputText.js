"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _InputText = _interopRequireDefault(require("../zhn/InputText"));

var _DialogStyles = _interopRequireDefault(require("../styles/DialogStyles"));

//import PropTypes from "prop-types";
var S = {
  ROW: (0, _extends2["default"])({}, _DialogStyles["default"].ROW, {
    lineHeight: 2
  }),
  CAPTION: (0, _extends2["default"])({}, _DialogStyles["default"].CAPTION, {
    width: 120
  }),
  INPUT_TEXT: {
    width: 250,
    height: 30,
    paddingLeft: 10,
    marginLeft: 0,
    marginRight: 0
  }
};
var RowInputText = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var caption = _ref.caption;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S.ROW,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: S.CAPTION,
      children: caption
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputText["default"], {
      ref: ref,
      style: S.INPUT_TEXT
    })]
  });
});
/*
RowInputText.propTypes = {
  caption: PropTypes.string
}
*/

var _default = RowInputText;
exports["default"] = _default;
//# sourceMappingURL=RowInputText.js.map