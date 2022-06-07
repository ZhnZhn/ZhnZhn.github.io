"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _useRefInit = _interopRequireDefault(require("../../hooks/useRefInit"));

const CLICK_TO_TOGGLE = 'Click to toggle';

const _crToolbarItem = (caption, title, onClick) => ({
  caption,
  title,
  onClick
});

const useToolbar = _ref => {
  let {
    toggleLabels,
    toggleOptions,
    toggleDate,
    onClickInfo
  } = _ref;
  return (0, _useRefInit.default)(() => [toggleLabels ? _crToolbarItem('L', CLICK_TO_TOGGLE + " input labels", toggleLabels) : void 0, toggleOptions ? _crToolbarItem('O', CLICK_TO_TOGGLE + " dialog options", toggleOptions) : void 0, toggleDate ? _crToolbarItem('D', CLICK_TO_TOGGLE + " date input", toggleDate) : void 0, _crToolbarItem('A', 'About datasouce', onClickInfo)].filter(Boolean));
};

var _default = useToolbar;
exports.default = _default;
//# sourceMappingURL=useToolbar.js.map