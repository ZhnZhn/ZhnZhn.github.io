"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
var _useToggle = _interopRequireDefault(require("../../hooks/useToggle"));
const useDialogOptions = () => {
  const refDialogOptions = (0, _uiApi.useRef)({
      //isNotZoomToMinMax: false,
      //isFilterZero: false,
      //isLogaritmic: false
    }),
    [isShowOptions, toggleOptions] = (0, _useToggle.default)(false),
    [hideOptions, toggleDialogOption] = (0, _uiApi.useMemo)(() => [() => {
      toggleOptions(false);
    }, (is, propName) => {
      refDialogOptions.current[propName] = is;
    }], [toggleOptions]);
  return [refDialogOptions, isShowOptions, toggleOptions, hideOptions, toggleDialogOption];
};
var _default = useDialogOptions;
exports.default = _default;
//# sourceMappingURL=useDialogOptions.js.map