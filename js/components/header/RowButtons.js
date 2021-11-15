"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));

var _jsxRuntime = require("react/jsx-runtime");

const S_ROW = {
  float: 'right',
  marginTop: 8,
  marginBottom: 10
};

const RowButtons = ({
  style,
  btStyle,
  onClose,
  children
}) => /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
  style: { ...S_ROW,
    ...style
  },
  children: [children, /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
    style: btStyle,
    caption: "Close",
    onClick: onClose
  })]
});

var _default = RowButtons;
exports.default = _default;
//# sourceMappingURL=RowButtons.js.map