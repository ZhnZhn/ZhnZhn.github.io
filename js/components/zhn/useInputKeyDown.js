"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
/*eslint-disable react-hooks/exhaustive-deps*/
const useInputKeyDown = function (_ref, deps) {
  let {
    onEnter,
    onDelete
  } = _ref;
  if (deps === void 0) {
    deps = [];
  }
  return (0, _uiApi.useCallback)(evt => {
    (0, _uiApi.stopImmediatePropagation)(evt);
    const _code = evt.code || evt.keyCode;
    switch (_code) {
      case 'Delete':
      case 46:
      case 'Escape':
      case 27:
        evt.preventDefault();
        onDelete();
        break;
      case 'Enter':
      case 13:
        if (typeof onEnter === 'function') {
          onEnter(evt.target.value);
        }
        break;
      default:
        return;
    }
  }, deps);
};
/*eslint-enable react-hooks/exhaustive-deps*/
var _default = useInputKeyDown;
exports.default = _default;
//# sourceMappingURL=useInputKeyDown.js.map