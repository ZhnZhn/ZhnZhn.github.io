"use strict";

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../../uiApi");

const useValidationMessages = onClose => {
  const [validationMessages, setValidationMessages] = (0, _uiApi.useState)([]),
        clearValidationMessages = (0, _uiApi.useCallback)(() => {
    setValidationMessages(prevMsgs => prevMsgs.length === 0 ? prevMsgs : []);
  }, [])
  /*eslint-disable react-hooks/exhaustive-deps */
  ,
        hClose = (0, _uiApi.useCallback)(() => {
    onClose();
    clearValidationMessages();
  }, []); // onClose, clearValidationMessages

  /*eslint-enable react-hooks/exhaustive-deps */

  return [validationMessages, setValidationMessages, clearValidationMessages, hClose];
};

var _default = useValidationMessages;
exports.default = _default;
//# sourceMappingURL=useValidationMessages.js.map