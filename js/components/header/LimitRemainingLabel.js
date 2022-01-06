"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _useListen = _interopRequireDefault(require("../hooks/useListen"));

var _jsxRuntime = require("react/jsx-runtime");

const S_LABEL = {
  display: 'inline-block',
  color: '#2f7ed8',
  paddingRight: 8,
  fontSize: '16px',
  fontWeight: 'bold'
};

const LimitRemainingLabel = () => {
  const [value, setValue] = (0, _react.useState)('');
  (0, _useListen.default)(v => {
    if (v != null) {
      setValue(v);
    }
  }, 'listenLimitRemaining');
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    style: S_LABEL,
    children: value
  });
};

var _default = LimitRemainingLabel;
exports.default = _default;
//# sourceMappingURL=LimitRemainingLabel.js.map