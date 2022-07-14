"use strict";

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

const useFocus = isShow => {
  const ref = (0, _uiApi.useRef)();
  (0, _uiApi.useEffect)(() => {
    if (isShow) {
      (0, _uiApi.focusRefElement)(ref);
    }
  }, [isShow]);
  return ref;
};

var _default = useFocus;
exports.default = _default;
//# sourceMappingURL=useFocus.js.map