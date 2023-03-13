"use strict";

exports.__esModule = true;
exports.default = void 0;
const _getObjectKeys = Object.keys;
const forEachInstance = (refHm, onInstance) => {
  const _hmInstances = refHm.current;
  return _getObjectKeys(_hmInstances).reduce((numberOfInstance, propName) => {
    const _refInstance = _hmInstances[propName];
    return _refInstance ? (onInstance(_refInstance), numberOfInstance++) : numberOfInstance;
  }, 0);
};
var _default = forEachInstance;
exports.default = _default;
//# sourceMappingURL=forEachInstance.js.map