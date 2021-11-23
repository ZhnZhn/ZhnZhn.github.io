"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _focusNode = _interopRequireDefault(require("../zhn-utils/focusNode"));

const useRefFocusPrev = () => {
  const ref = (0, _react.useRef)(),
        _refPrev = (0, _react.useRef)(),
        focus = (0, _react.useCallback)(_ => {
    _refPrev.current = document.activeElement;
    (0, _focusNode.default)(ref.current);
  }, []),
        focusPrev = (0, _react.useCallback)(_ => {
    (0, _focusNode.default)(_refPrev.current);
    _refPrev.current = null;
  }, []);
  /*eslint-disable react-hooks/exhaustive-deps */


  (0, _react.useEffect)(_ => {
    focus();
  }, []); // focus

  /*eslint-enable react-hooks/exhaustive-deps */

  return [ref, focus, focusPrev];
};

var _default = useRefFocusPrev;
exports.default = _default;
//# sourceMappingURL=useRefFocusPrev.js.map