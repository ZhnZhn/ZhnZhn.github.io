"use strict";

exports.__esModule = true;
exports.useKeyEscape = exports.useKeyEnter = exports.isKeyEnterOrBlank = exports.fOnKeyEnter = void 0;
var _uiApi = require("../uiApi");
var _has = require("../has");
const FN_NOOP = () => {};
const isKeyEnterOrBlank = _ref => {
  let {
    keyCode
  } = _ref;
  return keyCode === 13 || keyCode === 32;
};
exports.isKeyEnterOrBlank = isKeyEnterOrBlank;
const isKeyEscape = evt => evt.keyCode === 27 || evt.key === 'Escape';
const _onKeyFnEvt = (isKey, fn, evt) => {
  if (isKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
    fn(evt);
  }
};
const _fOnKey = isKey => fn => evt => {
  _onKeyFnEvt(isKey, fn, evt);
};
const fOnKeyEnter = exports.fOnKeyEnter = _fOnKey(isKeyEnterOrBlank);

/*eslint-disable react-hooks/exhaustive-deps */
const fUseKey = isKey => (fn, deps) => (0, _uiApi.useCallback)(evt => {
  _onKeyFnEvt(isKey, fn, evt);
}, deps || []);
/*eslint-enable react-hooks/exhaustive-deps */

const useKeyEnter = exports.useKeyEnter = fUseKey(isKeyEnterOrBlank);
const useKeyEscape = exports.useKeyEscape = _has.HAS_KEYBOARD_FOCUS ? fUseKey(isKeyEscape) : FN_NOOP;
//# sourceMappingURL=fUseKey.js.map