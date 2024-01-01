"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
var _useBool = require("../../hooks/useBool");
const useDialogOptions = () => {
  const refDialogOptions = (0, _uiApi.useRef)({
      //isNotZoomToMinMax: false,
      //isFilterZero: false,
      //isLogaritmic: false
    }),
    [isShowOptions, toggleOptions, hideOptions] = (0, _useBool.useToggleFalse)(),
    toggleDialogOption = (0, _uiApi.useMemo)(() => (is, propName) => {
      refDialogOptions.current[propName] = is;
    }, []);
  return [refDialogOptions, isShowOptions, toggleOptions, hideOptions, toggleDialogOption];
};
var _default = exports.default = useDialogOptions;
//# sourceMappingURL=useDialogOptions.js.map