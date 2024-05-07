"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _ButtonCircle = _interopRequireDefault(require("../zhn/ButtonCircle"));
var _jsxRuntime = require("react/jsx-runtime");
const BtCounter = _ref => {
  let {
    refEl,
    isShow,
    style,
    title,
    initialValue = 1,
    maxValue = 4
  } = _ref;
  const [value, setValue] = (0, _uiApi.useState)(initialValue),
    _onClick = (0, _uiApi.useCallback)(() => {
      setValue(v => v < maxValue ? v + 1 : initialValue);
    }, [maxValue, initialValue]);
  (0, _uiApi.useImperativeHandle)(refEl, () => ({
    getValue: () => value
  }), [value]);
  return isShow ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonCircle.default, {
    style: style,
    title: title,
    caption: value,
    onClick: _onClick
  }) : null;
};
var _default = exports.default = BtCounter;
//# sourceMappingURL=BtCounter.js.map