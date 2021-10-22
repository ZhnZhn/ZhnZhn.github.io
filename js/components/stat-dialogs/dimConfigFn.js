"use strict";

exports.__esModule = true;
exports.toFirstUpperCase = exports.crDimItem = void 0;

const crDimItem = (caption, sliceId, value) => ({
  caption,
  slice: {
    [sliceId]: value
  }
});

exports.crDimItem = crDimItem;

const toFirstUpperCase = str => str ? str.charAt(0).toUpperCase() + str.substring(1) : '';

exports.toFirstUpperCase = toFirstUpperCase;
//# sourceMappingURL=dimConfigFn.js.map