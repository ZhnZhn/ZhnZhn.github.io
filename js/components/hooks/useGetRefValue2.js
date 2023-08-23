"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
/*eslint-disable react-hooks/exhaustive-deps */
const useGetRefValue2 = (ref1, ref2) => (0, _uiApi.useCallback)(() => (0, _uiApi.getRefValue)(ref1) || (0, _uiApi.getRefValue)(ref2), []);
// ref1, ref2
/*eslint-enable react-hooks/exhaustive-deps */
var _default = useGetRefValue2;
exports.default = _default;
//# sourceMappingURL=useGetRefValue2.js.map