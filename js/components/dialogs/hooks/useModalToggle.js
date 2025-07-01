"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _useBool = require("../../hooks/useBool");
var _useToggleLabels = _interopRequireDefault(require("./useToggleLabels"));
const useModalToggle = () => {
  const [isToggle, toggleInputs, hideToggle] = (0, _useBool.useToggleFalse)(),
    [isShowLabels, toggleLabels] = (0, _useToggleLabels.default)(hideToggle);
  return [isToggle, toggleInputs, hideToggle, isShowLabels, toggleLabels];
};
var _default = exports.default = useModalToggle;
//# sourceMappingURL=useModalToggle.js.map