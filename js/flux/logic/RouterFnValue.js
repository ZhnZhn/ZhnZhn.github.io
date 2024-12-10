"use strict";

exports.__esModule = true;
exports.getCrValue = void 0;
var _crRouter = require("../../utils/crRouter");
const getCrValue = exports.getCrValue = (0, _crRouter.crGetRoute)({
  ROne: one => one,
  RTwo: (one, two) => `${two}`,
  ROneTwo: (one, two) => `${one}/${two}`,
  RPrefixOne: (prefix, one) => `${prefix}/${one}`,
  RPrefixOneTwo: (prefix, one, two) => `${prefix}/${one}_${two}`,
  RPrefixOneEmptyTwo: (prefix, one, two) => `${prefix}/${two}`,
  RPrefixTwoOne: (prefix, one, two) => `${prefix}/${two}_${one}`
});
//# sourceMappingURL=RouterFnValue.js.map