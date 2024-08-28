"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
var _useHasBeenOpen = _interopRequireDefault(require("../../hooks/useHasBeenOpen"));
var _useLoadOptionsState = _interopRequireDefault(require("./useLoadOptionsState"));
var _useLoadItem = _interopRequireDefault(require("./useLoadItem"));
const useLoadOptions = (isShow, uri, jsonProp) => {
  const [state, _setLoading, _setLoadingFailed, _onLoadOptions] = (0, _useLoadOptionsState.default)(jsonProp),
    _isRequireLoadOptions = (0, _useHasBeenOpen.default)(isShow) && !state.isLoading && !(0, _uiApi.isArr)(state.options),
    [loadOptions, refLoadId] = (0, _useLoadItem.default)(uri, _setLoading, _setLoadingFailed, _onLoadOptions);

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => {
    if (_isRequireLoadOptions) {
      loadOptions();
    }
    return () => {
      clearTimeout(refLoadId.current);
    };
  }, [_isRequireLoadOptions]);
  // loadOptions
  /*eslint-enable react-hooks/exhaustive-deps */

  return [state, loadOptions];
};
var _default = exports.default = useLoadOptions;
//# sourceMappingURL=useLoadOptions.js.map