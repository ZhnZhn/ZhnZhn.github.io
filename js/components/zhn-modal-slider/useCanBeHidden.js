"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _useEffectTimeoutIf = _interopRequireDefault(require("../hooks/useEffectTimeoutIf"));
const useCanBeHidden = canBeHidden => {
  const [hasBeenHidden, setHasBeenHidden] = (0, _uiApi.useState)(!1);
  (0, _useEffectTimeoutIf.default)(canBeHidden, () => setHasBeenHidden(!0), 500);
  (0, _uiApi.useEffect)(() => {
    if (!canBeHidden) {
      setHasBeenHidden(!1);
    }
  }, [canBeHidden]);
  return hasBeenHidden ? _styleFn.S_NONE : _styleFn.S_BLOCK;
};
var _default = exports.default = useCanBeHidden;
//# sourceMappingURL=useCanBeHidden.js.map