"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _ButtonCircle = _interopRequireDefault(require("../zhn/ButtonCircle"));

var _jsxRuntime = require("react/jsx-runtime");

const BtCounter = /*#__PURE__*/(0, _react.forwardRef)(({
  isShow,
  style,
  title,
  initialValue = 1,
  maxValue = 4
}, ref) => {
  const [value, setValue] = (0, _react.useState)(initialValue),
        _onClick = (0, _react.useCallback)(() => {
    setValue(v => v < maxValue ? v + 1 : initialValue);
  }, [maxValue, initialValue]);

  (0, _react.useImperativeHandle)(ref, () => ({
    getValue: () => value
  }), [value]);
  return isShow ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonCircle.default, {
    style: style,
    title: title,
    caption: value,
    onClick: _onClick
  }) : null;
});
var _default = BtCounter;
exports.default = _default;
//# sourceMappingURL=BtCounter.js.map