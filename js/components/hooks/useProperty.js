"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = require("react");

var useProperty = function useProperty(initialValue) {
  var ref = (0, _react.useRef)(initialValue),
      setValue = (0, _react.useCallback)(function (v) {
    ref.current = v;
  }, []),
      getValue = (0, _react.useCallback)(function () {
    return ref.current;
  }, []);
  return [setValue, getValue];
};

var _default = useProperty;
exports["default"] = _default;
//# sourceMappingURL=useProperty.js.map