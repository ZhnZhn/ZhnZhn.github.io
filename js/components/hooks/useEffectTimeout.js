"use strict";

exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _uiApi = require("../uiApi");
const useEffectTimeout = function (fn, mls, deps, predicate) {
  if (deps === void 0) {
    deps = [];
  }
  if (predicate === void 0) {
    predicate = true;
  }
  const _refId = (0, _uiApi.useRef)();
  /*eslint-disable react-hooks/exhaustive-deps*/
  (0, _uiApi.useEffect)(() => {
    if (predicate && (0, _isTypeFn.isFn)(fn) && mls >= 0) {
      (0, _uiApi.setRefValue)(_refId, setTimeout(fn, mls));
    }
    return () => clearTimeout((0, _uiApi.getRefValue)(_refId));
  }, deps);
  // fn, mls, predicate
  /*eslint-enable react-hooks/exhaustive-deps*/
};
var _default = exports.default = useEffectTimeout;
//# sourceMappingURL=useEffectTimeout.js.map