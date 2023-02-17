"use strict";

exports.__esModule = true;
exports.removeHotKey = exports.onHotKey = exports.clearHotKeys = exports.addHotKey = exports.HOT_KEY_EVENT = exports.HAS_HOT_KEYS = void 0;
var _uiApi = require("../uiApi");
var _has = require("../has");
const HAS_HOT_KEYS = !_has.HAS_TOUCH_EVENTS;
exports.HAS_HOT_KEYS = HAS_HOT_KEYS;
const HOT_KEY_EVENT = 'keydown';
exports.HOT_KEY_EVENT = HOT_KEY_EVENT;
let hmHotKeys = Object.create(null);
const addHotKey = (hotKey, onKeyDown, ref) => hmHotKeys && (hmHotKeys[hotKey] = [onKeyDown, ref]);
exports.addHotKey = addHotKey;
const removeHotKey = hotKey => hmHotKeys && (hmHotKeys[hotKey] = void 0);
exports.removeHotKey = removeHotKey;
const clearHotKeys = () => {
  hmHotKeys = null;
};
exports.clearHotKeys = clearHotKeys;
const _isHotKey = evt => (evt.altKey || evt.metaKey) && evt.key;
const onHotKey = evt => {
  if (_isHotKey(evt)) {
    const [_onKeyDownHotKey, _refEl] = hmHotKeys[evt.key.toUpperCase()] || [];
    if (typeof _onKeyDownHotKey === 'function') {
      evt.stopImmediatePropagation();
      (0, _uiApi.focusRefElement)(_refEl);
      _onKeyDownHotKey(evt);
    }
  }
};
exports.onHotKey = onHotKey;
//# sourceMappingURL=hm-hotkeys.js.map