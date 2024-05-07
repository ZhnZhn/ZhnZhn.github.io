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
  };
const RowInputText = _ref => {
  let {
    refEl,
    styleRoot,
    rootStyle,
    captionCn,
    captionStyle,
    styleCaption,
    caption = 'Input',
    inputStyle,
    styleInput,
    ...restProps
  } = _ref;
  const _rootStyle = rootStyle || {
      ...S_ROOT,
      ...styleRoot
    },
    _captionStyle = captionStyle || {
      ...S_CAPTION,
      ...styleCaption
    },
    _inputStyle = inputStyle || {
      ...S_INPUT_TEXT,
      ...styleInput
    },
    _caption = (0, _crCaption.default)(caption);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: _rootStyle,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: captionCn,
        style: _captionStyle,
        children: _caption
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputText.default, {
        ref: refEl,
        style: _inputStyle,
        ...restProps
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