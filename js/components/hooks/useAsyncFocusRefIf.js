"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
const useAsyncFocusRefIf = (is, ref1, ref2, mls) => {
  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => {
    if (is) {
      setTimeout(() => (0, _uiApi.focusRefElement)(ref1, ref2), mls || 1000);
    }
  }, [is]);
  // ref1, ref2, mls
  /*eslint-enable react-hooks/exhaustive-deps */
};
var _default = useAsyncFocusRefIf;
exports.default = _default;
//# sourceMappingURL=useAsyncFocusRefIf.js.map