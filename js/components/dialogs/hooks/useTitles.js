"use strict";

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../../uiApi");

const useTitles = () => {
  const refTitles = (0, _uiApi.useRef)([0]),
        addTitleIndex = (0, _uiApi.useCallback)(index => {
    (0, _uiApi.getRefValue)(refTitles).push(index);
  }, []),
        removeTitleIndex = (0, _uiApi.useCallback)(index => {
    refTitles.current = (0, _uiApi.getRefValue)(refTitles).filter(v => v !== index);
  }, []);
  return [refTitles, addTitleIndex, removeTitleIndex];
};

var _default = useTitles;
exports.default = _default;
//# sourceMappingURL=useTitles.js.map