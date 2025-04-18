"use strict";

exports.__esModule = true;
exports.default = void 0;
var _arrFn = require("../../../utils/arrFn");
var _useProperty = require("../../hooks/useProperty");
var _ToolbarButtonCircle = require("../../zhn/ToolbarButtonCircle");
const CLICK_TO_TOGGLE = 'Click to toggle';
const _crDialogMenuTooltip = str => `Open dialog ${str} menu`;
const useToolbar = _ref => {
  let {
    toggleLabels,
    toggleInputs,
    toggleOptions,
    toggleDate,
    onAbout
  } = _ref;
  return (0, _useProperty.useRefInit)(() => (0, _arrFn.filterBoolean)([toggleLabels ? (0, _ToolbarButtonCircle.crToolbarButton)('L', `${CLICK_TO_TOGGLE} input labels`, toggleLabels) : void 0, toggleInputs ? (0, _ToolbarButtonCircle.crToolbarButton)('I', _crDialogMenuTooltip('inputs'), toggleInputs) : void 0, toggleOptions ? (0, _ToolbarButtonCircle.crToolbarButton)('O', _crDialogMenuTooltip('options'), toggleOptions) : void 0, toggleDate ? (0, _ToolbarButtonCircle.crToolbarButton)('D', `${CLICK_TO_TOGGLE} date input`, toggleDate) : void 0, (0, _ToolbarButtonCircle.crToolbarButton)('A', 'About data source', onAbout)]));
};
var _default = exports.default = useToolbar;
//# sourceMappingURL=useToolbar.js.map