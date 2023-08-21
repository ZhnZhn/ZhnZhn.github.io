"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
const useRefFocus = () => {
  const refFocusElement = (0, _uiApi.useRef)(),
    setRefFocusElement = (0, _uiApi.useCallback)(el => {
      (0, _uiApi.setRefValue)(refFocusElement, el);
    }, []);
  return [refFocusElement, setRefFocusElement];
};
var _default = useRefFocus;
exports.default = _default;
//# sourceMappingURL=useRefFocus.js.map