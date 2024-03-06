"use strict";

exports.__esModule = true;
exports.default = void 0;
var _LogicFn = require("./LogicFn");
const RouterFnValue = {
  ROne: one => one,
  RTwo: (one, two) => "" + two,
  ROneTwo: (one, two) => one + "/" + two,
  RPrefixOne: (prefix, one) => prefix + "/" + one,
  RPrefixOneTwo: (prefix, one, two) => prefix + "/" + one + "_" + two,
  RPrefixOneEmptyTwo: (prefix, one, two) => prefix + "/" + two,
  RPrefixTwoOne: (prefix, one, two) => prefix + "/" + two + "_" + one,
  RZillow: (one, three) => "indicator_id=" + one + "&region_id=" + three
};
(0, _LogicFn.clearPrototypeOf)(RouterFnValue);
var _default = exports.default = RouterFnValue;
//# sourceMappingURL=RouterFnValue.js.map