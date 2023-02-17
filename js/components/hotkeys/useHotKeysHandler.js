"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _hmHotkeys = require("./hm-hotkeys");
const useHotKeysHandler = () => {
  (0, _uiApi.useEffect)(() => _hmHotkeys.HAS_HOT_KEYS ? (document.addEventListener(_hmHotkeys.HOT_KEY_EVENT, _hmHotkeys.onHotKey, false), () => {
    (0, _hmHotkeys.clearHotKeys)();
    document.removeEventListener(_hmHotkeys.HOT_KEY_EVENT, _hmHotkeys.onHotKey, false);
  }) : void 0, []);
};
var _default = useHotKeysHandler;
exports.default = _default;
//# sourceMappingURL=useHotKeysHandler.js.map