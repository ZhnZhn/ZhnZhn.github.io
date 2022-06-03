"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _useRefInit = _interopRequireDefault(require("../../hooks/useRefInit"));

const _crToolbarItem = (caption, title, onClick) => ({
  caption,
  title,
  onClick
});

const useToolbar = _ref => {
  let {
    toggleLabels,
    toggleOptions,
    onClickInfo
  } = _ref;
  return (0, _useRefInit.default)(() => [toggleLabels ? _crToolbarItem('L', 'Click to toggle input labels', toggleLabels) : void 0, toggleOptions ? _crToolbarItem('O', 'Click to toggle dialog options', toggleOptions) : void 0, _crToolbarItem('A', 'About Datasouce', onClickInfo)].filter(Boolean));
};

var _default = useToolbar;
exports.default = _default;
//# sourceMappingURL=useToolbar.js.map