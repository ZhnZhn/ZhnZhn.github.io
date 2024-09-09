"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _RowFlex = require("../dialogs/rows/RowFlex");
var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));
var _jsxRuntime = require("react/jsx-runtime");
const RowButtons = _ref => {
  let {
    refBtClose,
    withoutClear,
    caption,
    title,
    onPrimary,
    onClear,
    onClose
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_RowFlex.RowFlexEnd, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      isPrimary: true,
      caption: caption,
      title: title,
      onClick: onPrimary
    }), !withoutClear && /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      caption: "Clear",
      title: "Clear Input",
      onClick: onClear
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      refBt: refBtClose,
      caption: "Close",
      title: "Close Dialog",
      onClick: onClose
    })]
  });
};
var _default = exports.default = RowButtons;
//# sourceMappingURL=RowButtons.js.map