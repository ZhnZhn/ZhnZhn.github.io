"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));

var _jsxRuntime = require("react/jsx-runtime");

const S_ROW = {
  float: 'right',
  margin: '8px 4px 10px 0'
};

const RowButtons = ({
  btStyle,
  onClose,
  children
}) => /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
  style: S_ROW,
  children: [children, /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
    style: btStyle,
    caption: "Close",
    onClick: onClose
  })]
});

var _default = RowButtons;
exports.default = _default;
//# sourceMappingURL=RowButtons.js.map