"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
const useGroupOptions = (props, setValidationMessages, clearInput) => {
  const {
      useMsEdit,
      forActionType,
      getWatchGroups
    } = props,
    [groupOptions, setGroupOptions] = (0, _uiApi.useState)(() => getWatchGroups());
  useMsEdit(msEdit => {
    if (msEdit) {
      if (msEdit.forActionType === forActionType) {
        if (msEdit.messages) {
          setValidationMessages(msEdit.messages);
        } else {
          clearInput();
          setGroupOptions(getWatchGroups());
        }
      } else {
        setGroupOptions(getWatchGroups());
      }
    }
  });
  return groupOptions;
};
var _default = exports.default = useGroupOptions;
//# sourceMappingURL=useGroupOptions.js.map