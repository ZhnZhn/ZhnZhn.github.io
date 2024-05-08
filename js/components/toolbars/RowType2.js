"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _RowCaptionInput = _interopRequireDefault(require("./RowCaptionInput"));
var _SeriaConfigs = _interopRequireDefault(require("./SeriaConfigs"));
var _jsxRuntime = require("react/jsx-runtime");
const RowType2 = _ref => {
  let {
    refEl,
    caption,
    initValue,
    configs,
    onAdd,
    onRemove
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCaptionInput.default, {
      refEl: refEl,
      caption: caption,
      initValue: initValue,
      onAdd: onAdd
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SeriaConfigs.default, {
      configs: configs,
      onRemove: onRemove
    })]
  });
};
var _default = exports.default = RowType2;
//# sourceMappingURL=RowType2.js.map