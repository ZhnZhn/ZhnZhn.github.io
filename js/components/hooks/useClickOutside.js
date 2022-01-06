"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

const _removeClickListener = (listener, ref) => {
  if (ref.current) {
    document.removeEventListener('click', listener, true);
    ref.current = null;
  }
};
/*eslint-disable react-hooks/exhaustive-deps */


const useClickOutside = (isShow, onClickOutside) => {
  const _ref = (0, _react.useRef)(null),
        _refIs = (0, _react.useRef)(null),
        _hClickOutside = (0, _react.useCallback)(event => {
    var _ref$current;

    if (_ref != null && (_ref$current = _ref.current) != null && _ref$current.contains && !_ref.current.contains(event.target)) {
      event.stopPropagation();
      onClickOutside(event);
    }
  }, []); // onClickOutside


  (0, _react.useEffect)(() => {
    if (isShow && !_refIs.current) {
      document.addEventListener('click', _hClickOutside, true);
      _refIs.current = true;
    } else if (!isShow) {
      _removeClickListener(_hClickOutside, _refIs);
    }
  });
  (0, _react.useEffect)(() => {
    return () => _removeClickListener(_hClickOutside, _refIs);
  }, []); // _hClickOutside

  return _ref;
};
/*eslint-enable react-hooks/exhaustive-deps */


var _default = useClickOutside;
exports.default = _default;
//# sourceMappingURL=useClickOutside.js.map