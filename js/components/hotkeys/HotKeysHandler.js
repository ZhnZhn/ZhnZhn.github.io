"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

var _HotKeysContext = _interopRequireDefault(require("./HotKeysContext"));

const FN_NOOP = () => void 0;

const HotKeysHandler = _ref => {
  let {
    is
  } = _ref;

  const hmHotKeys = (0, _uiApi.useContext)(_HotKeysContext.default),
        _hKeyDown = (0, _uiApi.useCallback)(event => {
    if (event.altKey || event.metaKey) {
      const _handlerConfig = hmHotKeys[event.key];

      if (_handlerConfig) {
        const [ref, onKeyDown = FN_NOOP] = _handlerConfig;
        (0, _uiApi.focusRefElement)(ref);
        onKeyDown(event);
      }
    }
  }, [hmHotKeys]);

  (0, _uiApi.useEffect)(() => {
    if (is) {
      document.addEventListener('keydown', _hKeyDown, false);
      return () => document.removeEventListener('keydown', _hKeyDown, false);
    }
  }, [is, _hKeyDown]);
  return null;
};

var _default = HotKeysHandler;
exports.default = _default;
//# sourceMappingURL=HotKeysHandler.js.map