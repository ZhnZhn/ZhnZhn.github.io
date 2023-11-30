"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
const useValidationMessages = () => {
  const refInput = (0, _uiApi.useRef)(),
    [validationMessages, setValidationMessages] = (0, _uiApi.useState)([]),
    clearInput = (0, _uiApi.useCallback)(() => {
      (0, _uiApi.clearInputValue)(refInput);
      setValidationMessages([]);
    }, []);
  return [validationMessages, setValidationMessages, clearInput, refInput];
};
var _default = exports.default = useValidationMessages;
//# sourceMappingURL=useValidationMessages.js.map