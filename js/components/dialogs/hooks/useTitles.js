"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
const useTitles = () => {
  const refTitles = (0, _uiApi.useRef)([0]);
  return [refTitles, ...(0, _uiApi.useMemo)(() => [index => {
    (0, _uiApi.getRefValue)(refTitles).push(index);
  }, index => {
    refTitles.current = (0, _uiApi.getRefValue)(refTitles).filter(v => v !== index);
  }], [])];
};
var _default = exports.default = useTitles;
//# sourceMappingURL=useTitles.js.map