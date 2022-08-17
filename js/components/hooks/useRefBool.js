"use strict";

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

const useRefBool = initialValue => {
  const ref = (0, _uiApi.useRef)(initialValue),
        [setTrue, setFalse] = (0, _uiApi.useMemo)(() => [() => ref.current = true, () => ref.current = false], []);
  return [ref, setTrue, setFalse];
};

var _default = useRefBool;
exports.default = _default;
//# sourceMappingURL=useRefBool.js.map