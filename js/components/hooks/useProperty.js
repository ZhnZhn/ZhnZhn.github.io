"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

const useProperty = initialValue => {
  const ref = (0, _react.useRef)(initialValue);
  return (0, _react.useMemo)(() => [//setValue
  v => {
    ref.current = v;
  }, //getValue
  () => ref.current], []);
};

var _default = useProperty;
exports.default = _default;
//# sourceMappingURL=useProperty.js.map