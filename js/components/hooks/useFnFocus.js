"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
const useFnFocus = fn => {
  const _ref = (0, _uiApi.useRef)();
  return [_ref, /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useCallback)(() => {
    fn();
    (0, _uiApi.focusRefElement)(_ref);
  }, [])
  // fn
  /*eslint-enable react-hooks/exhaustive-deps */];
};
var _default = exports.default = useFnFocus;
//# sourceMappingURL=useFnFocus.js.map