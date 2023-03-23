"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
var _useToggleClose = _interopRequireDefault(require("../../hooks/useToggleClose"));
const useDialogOptions = () => {
  const refDialogOptions = (0, _uiApi.useRef)({
      //isNotZoomToMinMax: false,
      //isFilterZero: false,
      //isLogaritmic: false
    }),
    [isShowOptions, toggleOptions, hideOptions] = (0, _useToggleClose.default)(),
    toggleDialogOption = (0, _uiApi.useMemo)(() => (is, propName) => {
      refDialogOptions.current[propName] = is;
    }, []);
  return [refDialogOptions, isShowOptions, toggleOptions, hideOptions, toggleDialogOption];
};
var _default = useDialogOptions;
exports.default = _default;
//# sourceMappingURL=useDialogOptions.js.map