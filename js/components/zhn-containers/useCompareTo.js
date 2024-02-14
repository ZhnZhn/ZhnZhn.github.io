"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _forEachInstance = _interopRequireDefault(require("./forEachInstance"));
/*eslint-disable react-hooks/exhaustive-deps */
const useCompareTo = (hmInstances, updateMovingValues) => (0, _uiApi.useCallback)(dateTo => {
  const _valueMoves = [],
    itemsLength = (0, _forEachInstance.default)(hmInstances, refInst => {
      if ((0, _uiApi.isFn)(refInst.compareTo)) {
        _valueMoves.push(refInst.compareTo(dateTo));
      }
    }),
    _numberOfNotUpdatedValueMoves = itemsLength - _valueMoves.filter(Boolean).length;
  if (itemsLength > 0 && _numberOfNotUpdatedValueMoves === 0) {
    updateMovingValues(_valueMoves);
  }
  return _numberOfNotUpdatedValueMoves;
}, []);
// refHm, updateMovingValues
/*eslint-enable react-hooks/exhaustive-deps */
var _default = exports.default = useCompareTo;
//# sourceMappingURL=useCompareTo.js.map