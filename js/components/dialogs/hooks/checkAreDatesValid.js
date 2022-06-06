"use strict";

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../../uiApi");

const checkAreDatesValid = (refDates, msgs) => {
  const _datesComp = (0, _uiApi.getRefValue)(refDates);

  if (_datesComp) {
    const {
      isValid,
      datesMsg
    } = _datesComp.getValidation();

    if (!isValid) {
      msgs.push(datesMsg);
    }
  }
};

var _default = checkAreDatesValid;
exports.default = _default;
//# sourceMappingURL=checkAreDatesValid.js.map