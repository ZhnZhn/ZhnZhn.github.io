"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

const useFocus = isShow => {
  const ref = (0, _react.useRef)();
  (0, _react.useEffect)(() => {
    if (isShow && ref.current) {
      ref.current.focus();
    }
  }, [isShow]);
  return ref;
};

var _default = useFocus;
exports.default = _default;
//# sourceMappingURL=useFocus.js.map