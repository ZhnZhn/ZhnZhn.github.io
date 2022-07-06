"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

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
const RowInputText = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => {
  const {
    styleRoot,
    rootStyle,
    captionStyle,
    styleCaption,
    caption = 'Input',
    inputStyle,
    styleInput,
    ...rest
  } = props,
        _rootStyle = rootStyle || { ...S_ROOT,
    ...styleRoot
  },
        _captionStyle = captionStyle || { ...S_CAPTION,
    ...styleCaption
  },
        _inputStyle = inputStyle || { ...S_INPUT_TEXT,
    ...styleInput
  },
        _caption = (0, _crCaption.default)(caption);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: _rootStyle,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: _captionStyle,
        children: _caption
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputText.default, {
        ref: ref,
        style: _inputStyle,
        ...rest
      })]
    })
  });
});
/*
RowInputText.propTypes= {
  styleRoot: PropTypes.object,
  styleCaption: PropTypes.object,
  styleInput: PropTypes.object,
  caption: PropTypes.string,
  initValue: PropTypes.string,
  onEnter: PropTypes.func
}
*/

var _default = RowInputText;
exports.default = _default;
//# sourceMappingURL=RowInputText.js.map