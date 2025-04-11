"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useProperty = require("../hooks/useProperty");
const _crItemRefPropName = id => 'chart' + id,
  _crInitialValue = () => Object.create(null);
const useHmInstance = () => {
  const _hmInstances = (0, _useProperty.useRefInit)(_crInitialValue)
    /*eslint-disable react-hooks/exhaustive-deps */,
    _addToHmInstances = (0, _uiApi.useCallback)((id, compInstance) => {
      _hmInstances[_crItemRefPropName(id)] = compInstance || null;
    }, []);
  // _hmInstances
  /*eslint-enable react-hooks/exhaustive-deps */
  return [_hmInstances, _addToHmInstances];
};
var _default = exports.default = useHmInstance;
//# sourceMappingURL=useHmInstance.js.map