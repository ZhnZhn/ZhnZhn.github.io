"use strict";

exports.__esModule = true;
exports.default = void 0;
const RouterFnValue = {
  ROne: one => one,
  RTwo: (one, two) => `${two}`,
  ROneTwo: (one, two) => `${one}/${two}`,
  RPrefixOne: (prefix, one) => `${prefix}/${one}`,
  RPrefixOneTwo: (prefix, one, two) => `${prefix}/${one}_${two}`,
  RPrefixOneEmptyTwo: (prefix, one, two) => `${prefix}/${two}`,
  RPrefixTwoOne: (prefix, one, two) => `${prefix}/${two}_${one}`,
  RZillow: (one, three) => `indicator_id=${one}&region_id=${three}`,
  RJodiGas: (one, two, three) => `JODI/GAS_${two}${three}_${one}`,
  RJodiOil: (country, product, flow, units) => `JODI/OIL_${product}${flow}${units}_${country}`,
  RFutures: (prefix, item, month, year) => `${prefix}/${item}${month}${year}`,
  RWikiFutures: (exchange, item, type) => `CHRIS/${exchange}_${item}${type}`
};
var _default = exports.default = RouterFnValue;
//# sourceMappingURL=RouterFnValue.js.map