"use strict";

exports.__esModule = true;
exports.toUpperCaseFirst = exports.crDimItem = void 0;
var _toUpperCaseFirst = require("../../../utils/toUpperCaseFirst");
exports.toUpperCaseFirst = _toUpperCaseFirst.toUpperCaseFirst;
const crDimItem = (caption, sliceId, value) => ({
  caption,
  slice: {
    [sliceId]: value
  }
});
exports.crDimItem = crDimItem;
//# sourceMappingURL=dimConfigFn.js.map