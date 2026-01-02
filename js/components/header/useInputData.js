"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _objFn = require("../../utils/objFn");
const useInputData = (data, id) => {
  const _refInput = (0, _uiApi.useRef)(),
    _setInput = (0, _objFn.getFnByPropName)(data, id),
    _dataValue = data[id]();
  return [_refInput, _dataValue, () => {
    const _inputInst = (0, _uiApi.getRefValue)(_refInput);
    if (_inputInst && !_setInput(_inputInst.getValue())) {
      _inputInst.showErrMsg();
    }
  }, () => _setInput('')];
};
var _default = exports.default = useInputData;
//# sourceMappingURL=useInputData.js.map