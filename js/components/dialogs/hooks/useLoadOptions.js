"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
var _useHasNotEqual = _interopRequireDefault(require("../../hooks/useHasNotEqual"));
var _useLoadOptionsState = _interopRequireDefault(require("./useLoadOptionsState"));
var _useLoadItem = _interopRequireDefault(require("./useLoadItem"));
const useLoadOptions = (isShow, uri, jsonProp) => {
  const [state, _setLoading, _setLoadingFailed, _onLoadOptions] = (0, _useLoadOptionsState.default)(jsonProp),
    _hasToggled = (0, _useHasNotEqual.default)(isShow)[0],
    _isRequireLoadOptions = isShow && state.isLoadingFailed && _hasToggled,
    [loadOptions, refLoadId] = (0, _useLoadItem.default)(uri, _setLoading, _setLoadingFailed, _onLoadOptions);

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => {
    loadOptions();
    return () => {
      clearTimeout(refLoadId.current);
    };
  }, []);
  // loadOptions
  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => {
    if (_isRequireLoadOptions) {
      loadOptions();
    }
  }, [_isRequireLoadOptions]);
  // loadOptions
  /*eslint-enable react-hooks/exhaustive-deps */

  return [state, loadOptions];
};
var _default = exports.default = useLoadOptions;
//# sourceMappingURL=useLoadOptions.js.map