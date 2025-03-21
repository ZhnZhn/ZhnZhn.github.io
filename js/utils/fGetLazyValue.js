"use strict";

exports.__esModule = true;
exports.fGetLazyValue = void 0;
var _bindTo = require("./bindTo");
const _fGetLazyValue = crValue => {
  let value;
  return () => value === void 0 ? value = crValue() : value;
};
const _fGetLazyPromisifyValue = crValue => {
  let value;
  return (0, _bindTo.bindTo)(setValue => value === void 0 ? crValue(setValue) : Promise.resolve(value), _v => value = _v);
};
const fGetLazyValue = (crValue, isPromisify) => isPromisify ? _fGetLazyPromisifyValue(crValue) : _fGetLazyValue(crValue);
exports.fGetLazyValue = fGetLazyValue;
//# sourceMappingURL=fGetLazyValue.js.map