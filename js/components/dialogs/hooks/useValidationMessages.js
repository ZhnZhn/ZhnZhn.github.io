"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
const _isArr = Array.isArray;
const useValidationMessages = onClose => {
  const [validationMessages, setValidationMessages] = (0, _uiApi.useState)([]),
    _setValidationMessages = (0, _uiApi.useCallback)(nextMsgs => {
      if (_isArr(nextMsgs)) {
        setValidationMessages(prevMsgs => prevMsgs.length === 0 && nextMsgs.length === 0 ? prevMsgs : nextMsgs);
      }
    }, [])
    /*eslint-disable react-hooks/exhaustive-deps */,
    hClose = (0, _uiApi.useCallback)(() => {
      onClose();
      _setValidationMessages([]);
    }, []);
  // onClose, _setValidationMessages
  /*eslint-enable react-hooks/exhaustive-deps */

  return [validationMessages, _setValidationMessages, hClose];
};
var _default = useValidationMessages;
exports.default = _default;
//# sourceMappingURL=useValidationMessages.js.map