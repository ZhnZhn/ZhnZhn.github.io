"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
const useToggle2 = initialValue => {
  const [is, setIs] = (0, _uiApi.useState)(initialValue);
  return [is, ...(0, _uiApi.useMemo)(() => [() => setIs(is => !is), () => setIs(false)], [])];
};
var _default = useToggle2;
exports.default = _default;
//# sourceMappingURL=useToggle2.js.map