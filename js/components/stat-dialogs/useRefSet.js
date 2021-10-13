"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

const useRefSet = initialValue => {
  const ref = (0, _react.useRef)(initialValue),
        setRefValue = (0, _react.useCallback)(value => {
    ref.current = value;
  }, []);
  return [ref, setRefValue];
};

var _default = useRefSet;
exports.default = _default;
//# sourceMappingURL=useRefSet.js.map