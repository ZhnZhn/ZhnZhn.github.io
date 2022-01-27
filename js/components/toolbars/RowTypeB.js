"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _A = _interopRequireDefault(require("../zhn/A"));

var _jsxRuntime = require("react/jsx-runtime");

const S_CAPTION = {
  display: 'inline-block',
  color: 'black',
  width: 120,
  fontWeight: 'bold'
},
      S_INPUT_TEXT = {
  width: 46,
  marginRight: 12
};

const RowTypeB = _ref => {
  let {
    forwardRef,
    caption,
    initValue,
    min,
    max,
    maxLength,
    onAdd
  } = _ref;

  const [isPlus, setIsPlus] = (0, _react.useState)(true),
        _onAdd = isPlus ? () => {
    setIsPlus(!onAdd());
  } : void 0;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: S_CAPTION,
      children: caption
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_A.default.InputText, {
      ref: forwardRef,
      type: "number",
      style: S_INPUT_TEXT,
      initValue: initValue,
      maxLength: maxLength,
      min: min,
      max: max,
      onEnter: _onAdd
    }), isPlus && /*#__PURE__*/(0, _jsxRuntime.jsx)(_A.default.SvgPlus, {
      onClick: _onAdd
    })]
  });
};

var _default = RowTypeB;
exports.default = _default;
//# sourceMappingURL=RowTypeB.js.map