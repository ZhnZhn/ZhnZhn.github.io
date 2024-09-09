"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _ValidationMessages = _interopRequireDefault(require("../zhn/ValidationMessages"));
var _RowButtons = _interopRequireDefault(require("./RowButtons"));
var _jsxRuntime = require("react/jsx-runtime");
const WatchPane = _ref => {
  let {
    validationMessages,
    refBtClose,
    caption,
    title,
    onPrimary,
    withoutClear,
    onClear,
    onClose,
    children
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [children, /*#__PURE__*/(0, _jsxRuntime.jsx)(_ValidationMessages.default, {
      validationMessages: validationMessages
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowButtons.default, {
      refBtClose: refBtClose,
      caption: caption,
      title: title,
      onPrimary: onPrimary,
      withoutClear: withoutClear,
      onClear: onClear,
      onClose: onClose
    })]
  });
};
var _default = exports.default = WatchPane;
//# sourceMappingURL=WatchPane.js.map