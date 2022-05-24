"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _InputText = _interopRequireDefault(require("../zhn/InputText"));

var _DialogStyles = require("../styles/DialogStyles");

var _jsxRuntime = require("react/jsx-runtime");

const S_ROW = { ..._DialogStyles.S_DIALOG_ROW,
  lineHeight: 2
},
      S_CAPTION = { ..._DialogStyles.S_DIALOG_CAPTION,
  width: 120
},
      S_INPUT_TEXT = {
  width: 250,
  height: 30,
  paddingLeft: 10,
  marginLeft: 0,
  marginRight: 0
};
const RowInputText = /*#__PURE__*/(0, _react.forwardRef)((_ref, ref) => {
  let {
    caption
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S_ROW,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: S_CAPTION,
      children: caption
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputText.default, {
      ref: ref,
      style: S_INPUT_TEXT
    })]
  });
});
var _default = RowInputText;
exports.default = _default;
//# sourceMappingURL=RowInputText.js.map