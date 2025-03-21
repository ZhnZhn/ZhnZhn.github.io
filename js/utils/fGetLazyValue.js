"use strict";

exports.__esModule = true;
exports.fGetLazyValue = void 0;
const fGetLazyValue = (crValue, isPromisify) => {
  let value;
  return () => value === void 0 ? value = crValue() : isPromisify ? Promise.resolve(value) : value;
};
exports.fGetLazyValue = fGetLazyValue;
//# sourceMappingURL=fGetLazyValue.js.map