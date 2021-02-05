"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = require("react");

var useHasNotEqual = function useHasNotEqual(value) {
  var _ref = (0, _react.useRef)(value),
      current = _ref.current;

  _ref.current = value;
  return !(current === value);
};

var _default = useHasNotEqual;
exports["default"] = _default;
//# sourceMappingURL=useHasNotEqual.js.map