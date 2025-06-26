"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _Style = require("../modals/Style");
var _RowCheckBox = _interopRequireDefault(require("./RowCheckBox3"));
var _jsxRuntime = require("react/jsx-runtime");
const RowCheckBoxInputLabels = props => /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox.default, {
  style: {
    ..._Style.S_ROW,
    ..._Style.S_INPUT_SWITCH
  },
  caption: "Input Labels",
  value: props.value,
  onToggle: props.onToggle
}, "isShowLabels");
var _default = exports.default = RowCheckBoxInputLabels;
//# sourceMappingURL=RowCheckBoxInputLabels.js.map