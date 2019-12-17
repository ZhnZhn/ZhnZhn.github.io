"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var useRefInit = function useRefInit(ref, crValue) {
  return ref.current ? ref.current : ref.current = crValue();
};

var _default = useRefInit;
exports["default"] = _default;
//# sourceMappingURL=useRefInit.js.map