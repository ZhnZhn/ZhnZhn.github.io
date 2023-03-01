"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
const _crItemRefPropName = index => 'chart' + index;
const _hmInstances = Object.create(null);
const useHmInstance = () => {
  const _refHm = (0, _uiApi.useRef)(_hmInstances),
    _hmInstanceFn = (0, _uiApi.useCallback)((index, compInstance) => _refHm.current[_crItemRefPropName(index)] = compInstance, []);
  return [_refHm, _hmInstanceFn];
};
var _default = useHmInstance;
exports.default = _default;
//# sourceMappingURL=useHmInstance.js.map