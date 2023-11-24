"use strict";

exports.__esModule = true;
exports.default = void 0;
var _loadingStore = require("../../flux/stores/loadingStore");
var _jsxRuntime = require("react/jsx-runtime");
const S_LABEL = {
  display: 'inline-block',
  color: '#2f7ed8',
  paddingRight: 8,
  fontSize: '16px',
  fontWeight: 'bold'
};
const LimitRemainingLabel = () => /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
  style: S_LABEL,
  children: (0, _loadingStore.useLimitRemaining)()
});
var _default = exports.default = LimitRemainingLabel;
//# sourceMappingURL=LimitRemainingLabel.js.map