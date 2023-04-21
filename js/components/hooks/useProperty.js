"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
const useProperty = (initialValue, dfValue) => {
  const ref = (0, _uiApi.useRef)(initialValue);
  /*eslint-disable react-hooks/exhaustive-deps */
  return (0, _uiApi.useMemo)(() => [
  //setValue
  v => {
    ref.current = v;
  },
  //getValue
  () => ref.current || dfValue], []);
  // dfValue
  /*eslint-enable react-hooks/exhaustive-deps */
};
var _default = useProperty;
exports.default = _default;
//# sourceMappingURL=useProperty.js.map