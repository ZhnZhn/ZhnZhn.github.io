"use strict";

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

const useProperty = initialValue => {
  const ref = (0, _uiApi.useRef)(initialValue);
  return (0, _uiApi.useMemo)(() => [//setValue
  v => {
    ref.current = v;
  }, //getValue
  () => ref.current], []);
};

var _default = useProperty;
exports.default = _default;
//# sourceMappingURL=useProperty.js.map