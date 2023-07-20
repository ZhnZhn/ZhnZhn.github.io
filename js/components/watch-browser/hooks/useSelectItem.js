"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
const useSelectItem = () => {
  const ref = (0, _uiApi.useRef)(),
    _hSelect = (0, _uiApi.useCallback)(item => {
      (0, _uiApi.setRefValue)(ref, (item || {}).caption);
    }, []);
  return [ref, _hSelect];
};
var _default = useSelectItem;
exports.default = _default;
//# sourceMappingURL=useSelectItem.js.map