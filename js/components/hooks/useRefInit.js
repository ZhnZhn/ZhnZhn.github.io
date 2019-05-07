"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var useRefInit = function useRefInit(ref, crValue) {
  return ref.current ? ref.current : ref.current = crValue();
};

exports.default = useRefInit;
//# sourceMappingURL=useRefInit.js.map