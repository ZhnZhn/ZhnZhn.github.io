"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _useRefInit = _interopRequireDefault(require("../../hooks/useRefInit"));

var _crToolbarItem = _interopRequireDefault(require("./crToolbarItem"));

const CLICK_TO_TOGGLE = 'Click to toggle';

const useToolbar = _ref => {
  let {
    toggleLabels,
    toggleInputs,
    toggleOptions,
    toggleDate,
    onAbout
  } = _ref;
  return (0, _useRefInit.default)(() => [toggleLabels ? (0, _crToolbarItem.default)('L', CLICK_TO_TOGGLE + " input labels", toggleLabels) : void 0, toggleInputs ? (0, _crToolbarItem.default)('T', CLICK_TO_TOGGLE + " inputs", toggleInputs) : void 0, toggleOptions ? (0, _crToolbarItem.default)('O', CLICK_TO_TOGGLE + " dialog options", toggleOptions) : void 0, toggleDate ? (0, _crToolbarItem.default)('D', CLICK_TO_TOGGLE + " date input", toggleDate) : void 0, (0, _crToolbarItem.default)('A', 'About data source', onAbout)].filter(Boolean));
};

var _default = useToolbar;
exports.default = _default;
//# sourceMappingURL=useToolbar.js.map