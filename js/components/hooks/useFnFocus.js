"use strict";

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

/*eslint-disable react-hooks/exhaustive-deps */
const useFnFocus = fn => {
  const _ref = (0, _uiApi.useRef)(null);

  (0, _uiApi.useEffect)(() => {
    return () => _ref.current = null;
  }, []);
  return [_ref, (0, _uiApi.useCallback)(() => {
    fn();
    (0, _uiApi.focusRefElement)(_ref);
  }, [])];
};
/*eslint-enable react-hooks/exhaustive-deps */


var _default = useFnFocus;
exports.default = _default;
//# sourceMappingURL=useFnFocus.js.map