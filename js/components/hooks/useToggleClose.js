"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
// [is, toggle, close]
const useToggleClose = initialValue => {
  const [is, setIs] = (0, _uiApi.useState)(() => !!initialValue);
  return [is, ...(0, _uiApi.useMemo)(() => [() => setIs(is => !is), () => setIs(false)], [])];
};
var _default = useToggleClose;
exports.default = _default;
//# sourceMappingURL=useToggleClose.js.map