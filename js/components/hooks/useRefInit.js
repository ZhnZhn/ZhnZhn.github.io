"use strict";

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

const useRefInit = crValue => {
  const ref = (0, _uiApi.useRef)(null);

  if (ref.current === null) {
    ref.current = crValue();
  }

  return ref.current;
};

var _default = useRefInit;
exports.default = _default;
//# sourceMappingURL=useRefInit.js.map