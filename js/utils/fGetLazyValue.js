"use strict";

exports.__esModule = true;
exports.fGetLazyValueAsync = exports.fGetLazyValue = void 0;
const fGetLazyValue = crValue => {
  let value;
  return () => value === void 0 ? value = crValue() : value;
};
exports.fGetLazyValue = fGetLazyValue;
const fGetLazyValueAsync = crPromiseValue => {
  let value;
  return isGetValueSync => value === void 0 ? crPromiseValue().catch(err => console.log(err)).then(v => value = v) : isGetValueSync ? value : Promise.resolve(value);
};
exports.fGetLazyValueAsync = fGetLazyValueAsync;
//# sourceMappingURL=fGetLazyValue.js.map