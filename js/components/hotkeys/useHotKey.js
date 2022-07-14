"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

var _has = _interopRequireDefault(require("../has"));

var _HotKeysContext = _interopRequireDefault(require("./HotKeysContext"));

const HAS_TOUCH = _has.default.touch;

const useHotKey = (hotKey, onKeyDown, refBt) => {
  const hmHotKeys = (0, _uiApi.useContext)(_HotKeysContext.default),
        ref = (0, _uiApi.useRef)(null);
  /*eslint-disable react-hooks/exhaustive-deps */

  (0, _uiApi.useEffect)(() => {
    if (!HAS_TOUCH && hotKey) {
      hmHotKeys[hotKey] = [refBt || ref, onKeyDown];
      return () => hmHotKeys[hotKey] = void 0;
    }
  }, [hotKey, onKeyDown]); // hmHotKeys

  /*eslint-enable react-hooks/exhaustive-deps */

  return [!HAS_TOUCH && hotKey ? hotKey : '', refBt || ref];
};

var _default = useHotKey;
exports.default = _default;
//# sourceMappingURL=useHotKey.js.map