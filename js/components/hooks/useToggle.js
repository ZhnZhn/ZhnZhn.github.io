"use strict";

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

const _isBool = v => typeof v === 'boolean',
      _initState = initialValue => !!initialValue,
      _reducer = (state, value) => _isBool(value) ? value : !state;

const useToggle = initialValue => (0, _uiApi.useReducer)(_reducer, initialValue, _initState);

var _default = useToggle;
exports.default = _default;
//# sourceMappingURL=useToggle.js.map