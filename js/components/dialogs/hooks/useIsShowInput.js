"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
var _useToggleState = _interopRequireDefault(require("../../hooks/useToggleState"));
const crIsId = id => `is${id}Select`;
const crIsToggleInit = selectProps => selectProps.reduce((toggleConfig, item) => {
  toggleConfig[crIsId(item.id)] = true;
  return toggleConfig;
}, Object.create(null));
const useIsShowInput = selectProps => {
  const [_isShowConfig, toggleInputById] = (0, _useToggleState.default)(() => crIsToggleInit(selectProps)),
    _toggleInputById = (0, _uiApi.useCallback)(id => toggleInputById(crIsId(id)), [toggleInputById]),
    isShowInputById = (0, _uiApi.useCallback)(id => _isShowConfig[crIsId(id)], [_isShowConfig]);
  return [_toggleInputById, isShowInputById];
};
var _default = exports.default = useIsShowInput;
//# sourceMappingURL=useIsShowInput.js.map