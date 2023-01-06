"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _getFnByPropName = _interopRequireDefault(require("../../utils/getFnByPropName"));
const useInputData = (data, id) => {
  const _refInput = (0, _uiApi.useRef)(),
    _setInput = (0, _getFnByPropName.default)(data, id),
    _dataValue = data[id]();
  return [_refInput, _dataValue, _setInput, () => {
    const _inputInst = (0, _uiApi.getRefValue)(_refInput);
    if (_inputInst && !_setInput(_inputInst.getValue())) {
      _inputInst.showErrMsg();
    }
  }, () => _setInput('')];
};
var _default = useInputData;
exports.default = _default;
//# sourceMappingURL=useInputData.js.map