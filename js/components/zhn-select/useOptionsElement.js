"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
const useOptionsElement = () => {
  const refIndexActive = (0, _uiApi.useRef)(),
    refHmItems = (0, _uiApi.useRef)();
  return [refIndexActive, ...(0, _uiApi.useMemo)(() => [() => {
    (0, _uiApi.setRefValue)(refIndexActive, 0);
    (0, _uiApi.setRefValue)(refHmItems, Object.create(null));
  }, (n, index) => {
    const _hmItems = (0, _uiApi.getRefValue)(refHmItems);
    if (_hmItems) {
      _hmItems[`v${index}`] = n;
    }
  }, () => (0, _uiApi.getRefValue)(refHmItems)[`v${(0, _uiApi.getRefValue)(refIndexActive)}`]], [])];
};
var _default = exports.default = useOptionsElement;
//# sourceMappingURL=useOptionsElement.js.map