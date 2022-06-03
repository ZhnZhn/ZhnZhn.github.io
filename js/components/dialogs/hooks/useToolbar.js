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
    onClickInfo
  } = _ref;
  return (0, _useRefInit.default)(() => {
    const _arr = [];

    if (toggleLabels) {
      _arr.push(_crToolbarItem('L', 'Click to toggle input labels', toggleLabels));
    }

    _arr.push(_crToolbarItem('A', 'About Datasouce', onClickInfo));

    return _arr;
  });
};

var _default = useToolbar;
exports.default = _default;
//# sourceMappingURL=useToolbar.js.map