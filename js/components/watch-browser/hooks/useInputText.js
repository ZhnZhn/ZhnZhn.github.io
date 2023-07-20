"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
const useInputText = setValidationMessages => {
  const refInput = (0, _uiApi.useRef)()
    /*eslint-disable react-hooks/exhaustive-deps */,
    _hClear = (0, _uiApi.useCallback)(() => {
      const _inputInst = (0, _uiApi.getRefValue)(refInput);
      if (_inputInst) {
        _inputInst.setValue('');
        setValidationMessages([]);
      }
    }, []);
  //setValidationMessages
  /*eslint-enable react-hooks/exhaustive-deps */
  return [refInput, _hClear];
};
var _default = useInputText;
exports.default = _default;
//# sourceMappingURL=useInputText.js.map