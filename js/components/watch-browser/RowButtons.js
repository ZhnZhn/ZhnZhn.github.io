"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _RowFlex = require("../dialogs/rows/RowFlex");
var _Button = _interopRequireDefault(require("./Button"));
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
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default.Primary, {
      caption: caption,
      title: title,
      onClick: onPrimary
    }), !withoutClear && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default.Clear, {
      onClick: onClear
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default.Close, {
      refBt: refBtClose,
      onClick: onClose
    })]
  });
};
var _default = exports.default = RowButtons;
//# sourceMappingURL=RowButtons.js.map