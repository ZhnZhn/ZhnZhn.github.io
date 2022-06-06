"use strict";

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../../uiApi");

const getFromToDates = refDates => {
  const _datesComp = (0, _uiApi.getRefValue)(refDates);

  return _datesComp ? _datesComp.getValues() : {};
};

var _default = getFromToDates;
exports.default = _default;
//# sourceMappingURL=getFromToDates.js.map