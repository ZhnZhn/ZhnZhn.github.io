"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _useMenuMore = _interopRequireDefault(require("./useMenuMore"));
var _useToolbar = require("./useToolbar");
var _useValidationMessages = _interopRequireDefault(require("./useValidationMessages"));
const useDialog = (props, toolbarHandlers, toggleLabels) => {
  const {
      onAbout
    } = props,
    [_isToolbar, _menuMoreModel] = (0, _useMenuMore.default)(onAbout),
    _toolbarProps = toolbarHandlers.toggleInputs ? void 0 : {
      tittleToggle: _useToolbar.TITLE_TOGGLE,
      toggleInputs: toggleLabels
    },
    _toolbarButtons = (0, _useToolbar.useToolbar)({
      ...toolbarHandlers,
      ..._toolbarProps,
      onAbout
    });
  return [_isToolbar, _menuMoreModel, _toolbarButtons, ...(0, _useValidationMessages.default)(props.onClose)];
};
var _default = exports.default = useDialog;
//# sourceMappingURL=useDialog.js.map