"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
const DF_ARE_PROPS_EQUAL = () => true;
const memoEqual = function (Element, arePropsEqual) {
  if (arePropsEqual === void 0) {
    arePropsEqual = DF_ARE_PROPS_EQUAL;
  }
  return (0, _uiApi.memo)(Element, arePropsEqual);
};
var _default = memoEqual;
exports.default = _default;
//# sourceMappingURL=memoEqual.js.map