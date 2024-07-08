"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _InputText = _interopRequireDefault(require("../zhn/InputText"));
var _crCaption = _interopRequireDefault(require("./fns/crCaption"));
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const S_ROOT = {
    padding: '6px 0 6px 6px'
  },
  S_CAPTION = {
    display: 'inline-block',
    color: '#1b75bb',
    textAlign: 'right',
    width: 100,
    paddingRight: 5,
    fontSize: 16,
    fontWeight: 'bold'
  },
  S_INPUT_TEXT = {
    width: 220
  },
  DF_CAPTION = 'Input';
const _crStyle = (style, dfStyle, overrideStyle) => style || {
  ...dfStyle,
  ...overrideStyle
};
const RowInputText = _ref => {
  let {
    refEl,
    styleRoot,
    rootStyle,
    captionCn,
    captionStyle,
    styleCaption,
    caption,
    inputStyle,
    styleInput,
    ...restInpuTextProps
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: _crStyle(rootStyle, S_ROOT, styleRoot),
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: captionCn,
        style: _crStyle(captionStyle, S_CAPTION, styleCaption),
        children: (0, _crCaption.default)(caption || DF_CAPTION)
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputText.default, {
        ...restInpuTextProps,
        refEl: refEl,
        style: _crStyle(inputStyle, S_INPUT_TEXT, styleInput)
      })]
    })
  });
};

/*
RowInputText.propTypes= {
  refEl: PropTypes.ref,
  styleRoot: PropTypes.object,
  styleCaption: PropTypes.object,
  styleInput: PropTypes.object,
  caption: PropTypes.string,
  initValue: PropTypes.string,
  onEnter: PropTypes.func
}
*/
var _default = exports.default = RowInputText;
//# sourceMappingURL=RowInputText.js.map