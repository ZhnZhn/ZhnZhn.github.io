"use strict";

exports.__esModule = true;
exports.getCrValue = void 0;
var _crRouter = require("../../utils/crRouter");
const getCrValue = exports.getCrValue = (0, _crRouter.crGetRoute)({
  ROne: one => one,
  RPrefixOne: (prefix, one) => `${prefix}/${one}`,
  RPrefixOneTwo: (prefix, one, two) => `${prefix}/${one}_${two}`
});
//# sourceMappingURL=RouterFnValue.js.map