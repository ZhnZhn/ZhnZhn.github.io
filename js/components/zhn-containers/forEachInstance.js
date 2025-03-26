"use strict";

exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
const forEachInstance = (hmInstances, onInstance) => (0, _isTypeFn.getObjectKeys)(hmInstances).reduce((numberOfInstance, propName) => {
  const _refInstance = hmInstances[propName];
  return _refInstance ? (onInstance(_refInstance), ++numberOfInstance) : numberOfInstance;
}, 0);
var _default = exports.default = forEachInstance;
//# sourceMappingURL=forEachInstance.js.map