"use strict";

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

const _isFn = v => typeof v === 'function',
      _initState = initialValue => _isFn(initialValue) ? initialValue() : initialValue,
      _reducer = (state, propName) => ({ ...state,
  [propName]: !state[propName]
});

const useToggleState = initialValue => (0, _uiApi.useReducer)(_reducer, initialValue || {}, _initState);

var _default = useToggleState;
exports.default = _default;
//# sourceMappingURL=useToggleState.js.map