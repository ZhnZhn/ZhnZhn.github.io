"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = require("react");

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};
/*eslint-disable react-hooks/exhaustive-deps */


var useFnFocus = function useFnFocus(fn) {
  var _ref = (0, _react.useRef)(null);

  (0, _react.useEffect)(function () {
    return function () {
      return _ref.current = null;
    };
  }, []);
  return [_ref, (0, _react.useCallback)(function () {
    fn();
    var current = _ref.current;

    if (current && _isFn(current.focus)) {
      current.focus();
    }
  }, [])];
};
/*eslint-enable react-hooks/exhaustive-deps */


var _default = useFnFocus;
exports["default"] = _default;
//# sourceMappingURL=useFnFocus.js.map