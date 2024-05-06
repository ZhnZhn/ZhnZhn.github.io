"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _SpanToken = require("../zhn/SpanToken");
var _InputText = _interopRequireDefault(require("../zhn/InputText"));
var _RowFlex = require("../dialogs/rows/RowFlex");
var _jsxRuntime = require("react/jsx-runtime");
const S_LH_2 = {
    lineHeight: 2
  },
  S_CAPTION = {
    width: 120
  },
  S_INPUT_TEXT = {
    width: 250,
    height: 30,
    paddingLeft: 10,
    marginLeft: 0,
    marginRight: 0
  };
const RowInputText = _ref => {
  let {
    refEl,
    caption
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_RowFlex.RowFlex, {
    style: S_LH_2,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanInputLabel, {
      style: S_CAPTION,
      children: caption
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputText.default, {
      ref: refEl,
      style: S_INPUT_TEXT
    })]
  });
};
var _default = exports.default = RowInputText;
//# sourceMappingURL=RowInputText.js.map