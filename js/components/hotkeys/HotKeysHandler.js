"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _HotKeysContext = _interopRequireDefault(require("./HotKeysContext"));

const _fnNoop = () => void 0;

const _focusElementByRef = ref => {
  const _el = (ref || {}).current;

  if (_el && _el.focus) {
    _el.focus();
  }
};

const HotKeysHandler = _ref => {
  let {
    is
  } = _ref;

  const hmHotKeys = (0, _react.useContext)(_HotKeysContext.default),
        _hKeyDown = (0, _react.useCallback)(event => {
    if (event.altKey || event.metaKey) {
      const _handlerConfig = hmHotKeys[event.key];

      if (_handlerConfig) {
        const [ref, onKeyDown = _fnNoop] = _handlerConfig;

        _focusElementByRef(ref);

        onKeyDown(event);
      }
    }
  }, [hmHotKeys]);

  (0, _react.useEffect)(() => {
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