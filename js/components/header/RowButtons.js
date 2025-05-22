"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));
var _RowFlex = require("../dialogs/rows/RowFlex");
var _jsxRuntime = require("react/jsx-runtime");
const S_ROW = {
  paddingRight: 0
};
const RowButtons = _ref => {
  let {
    style,
    children,
    setRefFocusLast,
    btStyle,
    onClose
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_RowFlex.RowFlexReverseStart, {
    style: {
      ...S_ROW,
      ...style
    },
    children: [children, /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      refBt: setRefFocusLast,
      style: btStyle,
      caption: "Close",
      onClick: onClose
    })]
  });
};
var _default = exports.default = RowButtons;
//# sourceMappingURL=RowButtons.js.map