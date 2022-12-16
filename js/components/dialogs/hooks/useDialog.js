"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _useToggle = _interopRequireDefault(require("../../hooks/useToggle"));
var _has = require("../../has");
var _useMenuMore = _interopRequireDefault(require("./useMenuMore"));
var _useToolbar = _interopRequireDefault(require("./useToolbar"));
var _useValidationMessages = _interopRequireDefault(require("./useValidationMessages"));
const _isWideWidth = (0, _has.isWideWidth)();
const useDialog = _ref => {
  let {
    onAbout,
    onClose,
    ...toolbarHandlers
  } = _ref;
  const [isShowLabels, toggleLabels] = (0, _useToggle.default)(_isWideWidth),
    [isToolbar, menuMoreModel] = (0, _useMenuMore.default)(onAbout),
    toolbarButtons = (0, _useToolbar.default)({
      ...toolbarHandlers,
      toggleLabels,
      onAbout
    });
  return [isToolbar, isShowLabels, menuMoreModel, toolbarButtons, ...(0, _useValidationMessages.default)(onClose)];
};
var _default = useDialog;
exports.default = _default;
//# sourceMappingURL=useDialog.js.map