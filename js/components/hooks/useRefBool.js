"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

const useRefBool = initialValue => {
  const ref = (0, _react.useRef)(initialValue),
        setTrue = (0, _react.useCallback)(() => {
    ref.current = true;
  }, []),
        setFalse = (0, _react.useCallback)(() => {
    ref.current = false;
  }, []);
  return [ref, setTrue, setFalse];
};

var _default = useRefBool;
exports.default = _default;
//# sourceMappingURL=useRefBool.js.map