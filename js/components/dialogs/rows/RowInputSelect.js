"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _InputSelect = _interopRequireDefault(require("../../zhn-select/InputSelect"));

var _crRowOptions2 = _interopRequireDefault(require("./crRowOptions"));

var RowInputSelect = function RowInputSelect(props) {
  var _crRowOptions = (0, _crRowOptions2["default"])(props),
      rowStyle = _crRowOptions.rowStyle,
      labelStyle = _crRowOptions.labelStyle,
      caption = _crRowOptions.caption,
      options = _crRowOptions.options;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: rowStyle,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: labelStyle,
      children: caption
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSelect["default"], (0, _extends2["default"])({}, options))]
  });
};

var _default = RowInputSelect;
exports["default"] = _default;
//# sourceMappingURL=RowInputSelect.js.map