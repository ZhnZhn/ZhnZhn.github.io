"use strict";

exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _uiApi = require("../uiApi");
const useEffectTimeoutIf = (is, fn, mls) => {
  const _refId = (0, _uiApi.useRef)();
  /*eslint-disable react-hooks/exhaustive-deps*/
  (0, _uiApi.useEffect)(() => {
    if (is && (0, _isTypeFn.isFn)(fn) && mls >= 0) {
      (0, _uiApi.setRefValue)(_refId, setTimeout(fn, mls));
    }
    return () => clearTimeout((0, _uiApi.getRefValue)(_refId));
  }, [is]);
  // fn, mls
  /*eslint-enable react-hooks/exhaustive-deps*/
};
var _default = exports.default = useEffectTimeoutIf;
//# sourceMappingURL=useEffectTimeoutIf.js.map