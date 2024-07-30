"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
var _useToggleState = _interopRequireDefault(require("../../hooks/useToggleState"));
var _dialogFn = require("../dialogFn");
const useIsShowInput = selectProps => {
  const [_isShowConfig, toggleInputById] = (0, _useToggleState.default)(() => (0, _dialogFn.crIsToggleInit)(selectProps)),
    isShowInputById = (0, _uiApi.useCallback)(id => _isShowConfig[(0, _dialogFn.crIsId)(id)], [_isShowConfig]);
  return [toggleInputById, isShowInputById];
};
var _default = exports.default = useIsShowInput;
//# sourceMappingURL=useIsShowInput.js.map