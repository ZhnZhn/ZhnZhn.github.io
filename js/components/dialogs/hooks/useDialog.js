"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _useToggle = require("../../hooks/useToggle");
var _has = require("../../has");
var _useMenuMore = _interopRequireDefault(require("./useMenuMore"));
var _useToolbar = _interopRequireDefault(require("./useToolbar"));
var _useValidationMessages = _interopRequireDefault(require("./useValidationMessages"));
const IS_WIDE_WIDTH = (0, _has.isWideWidth)();
const useDialog = (props, toolbarHandlers) => {
  const {
      onAbout
    } = props,
    [_isShowLabels, _toggleLabels] = (0, _useToggle.useToggle)(IS_WIDE_WIDTH),
    [_isToolbar, _menuMoreModel] = (0, _useMenuMore.default)(onAbout),
    _toolbarButtons = (0, _useToolbar.default)({
      ...toolbarHandlers,
      toggleLabels: _toggleLabels,
      onAbout
    });
  return [_isToolbar, _isShowLabels, _menuMoreModel, _toolbarButtons, ...(0, _useValidationMessages.default)(props.onClose)];
};
var _default = exports.default = useDialog;
//# sourceMappingURL=useDialog.js.map