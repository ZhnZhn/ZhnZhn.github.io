"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
const useAsyncFocusIf = (is, getFocusElement, mls) => {
  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => {
    if (is) {
      setTimeout(() => (0, _uiApi.focusRefElement)(getFocusElement), mls || 1000);
    }
  }, [is]);
  // getFocusElement, mls
  /*eslint-enable react-hooks/exhaustive-deps */
};
var _default = useAsyncFocusIf;
exports.default = _default;
//# sourceMappingURL=useAsyncFocusIf.js.map