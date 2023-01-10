"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
const useVm = () => {
  const refVm = (0, _uiApi.useRef)(),
    compareTo = (0, _uiApi.useCallback)(dateTo => {
      const _vmInst = (0, _uiApi.getRefValue)(refVm);
      return _vmInst ? _vmInst._updateDateTo(dateTo) : void 0;
    }, []);
  return [refVm, compareTo];
};
var _default = useVm;
exports.default = _default;
//# sourceMappingURL=useVm.js.map