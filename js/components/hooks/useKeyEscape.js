"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = require("react");

var _isKeyEscape = _interopRequireDefault(require("../zhn/isKeyEscape"));

/*eslint-disable react-hooks/exhaustive-deps */
var useKeyEscape = function useKeyEscape(fn, deps) {
  return (0, _react.useCallback)(function (event) {
    if ((0, _isKeyEscape["default"])(event)) {
      event.preventDefault();
      event.stopPropagation();
      fn();
    }
  }, deps || []);
};
/*eslint-enable react-hooks/exhaustive-deps */


var _default = useKeyEscape;
exports["default"] = _default;
//# sourceMappingURL=useKeyEscape.js.map