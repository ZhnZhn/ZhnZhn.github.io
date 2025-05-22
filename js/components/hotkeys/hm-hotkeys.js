"use strict";

exports.__esModule = true;
exports.removeHotKey = exports.onHotKey = exports.clearHotKeys = exports.addHotKey = exports.HOT_KEY_EVENT = exports.HAS_HOT_KEYS = void 0;
var _uiApi = require("../uiApi");
var _has = require("../has");
var _fUseKey = require("../hooks/fUseKey");
const HAS_HOT_KEYS = exports.HAS_HOT_KEYS = !_has.HAS_TOUCH_EVENTS;
const HOT_KEY_EVENT = exports.HOT_KEY_EVENT = 'keydown';
let hmHotKeys = Object.create(null);
const addHotKey = (hotKey, onKeyDown, ref) => hmHotKeys && (hmHotKeys[hotKey] = [onKeyDown, ref]);
exports.addHotKey = addHotKey;
const removeHotKey = hotKey => hmHotKeys && (hmHotKeys[hotKey] = void 0);
exports.removeHotKey = removeHotKey;
const clearHotKeys = () => {
  hmHotKeys = null;
};
exports.clearHotKeys = clearHotKeys;
const onHotKey = evt => {
  if ((0, _fUseKey.isHotKey)(evt)) {
    const [_onKeyDownHotKey, _refEl] = hmHotKeys[(0, _fUseKey.toUpperCase)(evt.key)] || [];
    if (typeof _onKeyDownHotKey === 'function') {
      evt.stopImmediatePropagation();
      (0, _uiApi.focusRefElement)(_refEl);
      _onKeyDownHotKey(evt);
    }
  }
};
exports.onHotKey = onHotKey;
//# sourceMappingURL=hm-hotkeys.js.map