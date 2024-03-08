"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _OpenCloseStyle = require("../../zhn/OpenCloseStyle");
var _SpanToken = require("../../zhn/SpanToken");
var _OpenClose = _interopRequireDefault(require("../../zhn/OpenClose"));
var _InputSelect = _interopRequireDefault(require("../../zhn-select/InputSelect"));
var _crRowProps = _interopRequireDefault(require("./crRowProps"));
var _jsxRuntime = require("react/jsx-runtime");
const C_OPEN = "#1b75bb",
  CL_OPEN_CLOSE_INPUT_LABEL = _OpenCloseStyle.CL_OPEN_CLOSE + " " + _SpanToken.CL_SP_INPUT_LABEL,
  S_OC = {
    height: 36,
    paddingTop: 6,
    width: 100
  },
  S_OPEN_CLOSE = {
    lineHeight: 'unset'
  },
  S_CAPTION = {
    color: C_OPEN
  };
const RowOcSelect = _ref => {
  let {
    children,
    ...restProps
  } = _ref;
  const [rowStyle, labelStyle, selectProps, caption] = (0, _crRowProps.default)(restProps),
    _ocStyle = {
      ...S_OC,
      ...labelStyle,
      ...restProps.labelStyle
    };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_OpenClose.default, {
    caption: caption,
    style: S_OPEN_CLOSE,
    rowStyle: rowStyle,
    className: CL_OPEN_CLOSE_INPUT_LABEL,
    ocStyle: _ocStyle,
    captionStyle: S_CAPTION,
    openColor: C_OPEN,
    CompAfter: /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSelect.default, {
      ...selectProps
    }),
    children: children
  });
};
var _default = exports.default = RowOcSelect;
//# sourceMappingURL=RowOcSelect.js.map