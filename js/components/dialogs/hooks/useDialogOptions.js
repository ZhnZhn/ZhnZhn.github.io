"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../../uiApi");

var _useToggle = _interopRequireDefault(require("../../hooks/useToggle"));

const useDialogOptions = () => {
  const refDialogOptions = (0, _uiApi.useRef)({
    isNotZoomToMinMax: false,
    isFilterZero: false
  }),
        [isShowOptions, toggleOptions] = (0, _useToggle.default)(false),
        toggleDialogOption = (0, _uiApi.useCallback)((propName, is) => {
    refDialogOptions.current[propName] = is;
  }, [])
  /*eslint-disable react-hooks/exhaustive-deps */
  ,
        hideOptions = (0, _uiApi.useCallback)(() => {
    toggleOptions(false);
  }, []); // toggleOption

  /*eslint-enable react-hooks/exhaustive-deps */

  return [refDialogOptions, isShowOptions, toggleOptions, hideOptions, toggleDialogOption];
};

var _default = useDialogOptions;
exports.default = _default;
//# sourceMappingURL=useDialogOptions.js.map