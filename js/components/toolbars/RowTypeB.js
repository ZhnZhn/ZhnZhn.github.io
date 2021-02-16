"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _A = _interopRequireDefault(require("../zhn/A"));

var S = {
  CAPTION: {
    display: 'inline-block',
    color: 'black',
    width: 120,
    fontWeight: 'bold'
  },
  INPUT_TEXT: {
    width: 46,
    marginRight: 12
  }
};

var RowTypeB = function RowTypeB(_ref) {
  var forwardRef = _ref.forwardRef,
      caption = _ref.caption,
      initValue = _ref.initValue,
      min = _ref.min,
      max = _ref.max,
      maxLength = _ref.maxLength,
      onAdd = _ref.onAdd;

  var _useState = (0, _react.useState)(true),
      isPlus = _useState[0],
      setIsPlus = _useState[1],
      _onAdd = isPlus ? function () {
    setIsPlus(!onAdd());
  } : void 0;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: S.CAPTION,
      children: caption
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_A["default"].InputText, {
      ref: forwardRef,
      type: "number",
      style: S.INPUT_TEXT,
      initValue: initValue,
      maxLength: maxLength,
      min: min,
      max: max,
      onEnter: _onAdd
    }), isPlus && /*#__PURE__*/(0, _jsxRuntime.jsx)(_A["default"].SvgPlus, {
      onClick: _onAdd
    })]
  });
};

var _default = RowTypeB;
exports["default"] = _default;
//# sourceMappingURL=RowTypeB.js.map