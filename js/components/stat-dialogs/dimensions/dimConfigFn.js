"use strict";

exports.__esModule = true;
exports.crDimItem = void 0;
const crDimItem = (caption, sliceId, value) => ({
  caption,
  slice: {
    [sliceId]: value
  }
});
exports.crDimItem = crDimItem;
//# sourceMappingURL=dimConfigFn.js.map