"use strict";

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../../uiApi");

const useValidationMessages = () => {
  const [validationMessages, setValidationMessages] = (0, _uiApi.useState)([]),
        clearValidationMessages = (0, _uiApi.useCallback)(() => {
    setValidationMessages(prevMsgs => prevMsgs.length === 0 ? prevMsgs : []);
  }, []);
  return [validationMessages, setValidationMessages, clearValidationMessages];
};

var _default = useValidationMessages;
exports.default = _default;
//# sourceMappingURL=useValidationMessages.js.map