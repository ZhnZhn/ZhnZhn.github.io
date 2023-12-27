"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.useKeyEscape = exports.useKeyEnter = void 0;
var _uiApi = require("../uiApi");
var _has = require("../has");
var _isKeyEnter = _interopRequireDefault(require("../zhn/isKeyEnter"));
var _isKeyEscape = _interopRequireDefault(require("../zhn/isKeyEscape"));
const FN_NOOP = () => {};

/*eslint-disable react-hooks/exhaustive-deps */
const fUseKey = isKey => (fn, deps) => (0, _uiApi.useCallback)(evt => {
  if (isKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
    fn(evt);
  }
}, deps || []);
/*eslint-enable react-hooks/exhaustive-deps */

const useKeyEnter = exports.useKeyEnter = fUseKey(_isKeyEnter.default);
const useKeyEscape = exports.useKeyEscape = _has.HAS_KEYBOARD_FOCUS ? fUseKey(_isKeyEscape.default) : FN_NOOP;
//# sourceMappingURL=fUseKey.js.map