"use strict";

exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _loadingStore = require("../../flux/stores/loadingStore");
var _jsxRuntime = require("react/jsx-runtime");
const S_LABEL = {
  display: 'inline-block',
  color: '#2f7ed8',
  paddingRight: 5,
  fontSize: '16px',
  fontWeight: 'bold'
};
const LimitRemainingLabel = () => {
  const _limitRemaining = (0, _loadingStore.useLimitRemaining)();
  return (0, _isTypeFn.isNumber)(_limitRemaining) ? /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    style: S_LABEL,
    children: _limitRemaining
  }) : null;
};
var _default = exports.default = LimitRemainingLabel;
//# sourceMappingURL=LimitRemainingLabel.js.map