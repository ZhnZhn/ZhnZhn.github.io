"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

const useToggle2 = initialValue => {
  const [is, setIs] = (0, _react.useState)(initialValue);
  return [is, (0, _react.useCallback)(() => setIs(is => !is), []), (0, _react.useCallback)(() => setIs(false), [])];
};

var _default = useToggle2;
exports.default = _default;
//# sourceMappingURL=useToggle2.js.map