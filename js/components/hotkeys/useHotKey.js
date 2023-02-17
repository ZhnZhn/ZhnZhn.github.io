"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _hmHotkeys = require("./hm-hotkeys");
const useHotKey = (hotKey, onKeyDown, refEl) => {
  const ref = (0, _uiApi.useRef)(null);
  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => _hmHotkeys.HAS_HOT_KEYS && hotKey ? ((0, _hmHotkeys.addHotKey)(hotKey, onKeyDown, refEl || ref), () => (0, _hmHotkeys.removeHotKey)(hotKey)) : void 0, []);
  //hotKey, onKeyDown, refEl
  /*eslint-disable react-hooks/exhaustive-deps */
  return [_hmHotkeys.HAS_HOT_KEYS && hotKey ? hotKey : '', refEl || ref];
};
var _default = useHotKey;
exports.default = _default;
//# sourceMappingURL=useHotKey.js.map