"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = require("react");

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};
/*eslint-disable react-hooks/exhaustive-deps*/


var useInputKeyDown = function useInputKeyDown(_ref, deps) {
  var onEnter = _ref.onEnter,
      onDelete = _ref.onDelete;

  if (deps === void 0) {
    deps = [];
  }

  return (0, _react.useCallback)(function (event) {
    var code = event.code,
        keyCode = event.keyCode,
        _code = code || keyCode;

    switch (_code) {
      case 'Delete':
      case 46:
      case 'Escape':
      case 27:
        event.preventDefault();
        onDelete();
        break;

      case 'Enter':
      case 13:
        if (_isFn(onEnter)) {
          onEnter(event.target.value);
        }

        break;

      default:
        return;
    }
  }, deps);
};
/*eslint-enable react-hooks/exhaustive-deps*/


var _default = useInputKeyDown;
exports["default"] = _default;
//# sourceMappingURL=useInputKeyDown.js.map