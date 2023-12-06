"use strict";

exports.__esModule = true;
exports.default = void 0;
const _getObjectKeys = Object.keys;
const forEachInstance = (hmInstances, onInstance) => _getObjectKeys(hmInstances).reduce((numberOfInstance, propName) => {
  const _refInstance = hmInstances[propName];
  return _refInstance ? (onInstance(_refInstance), ++numberOfInstance) : numberOfInstance;
}, 0);
var _default = exports.default = forEachInstance;
//# sourceMappingURL=forEachInstance.js.map