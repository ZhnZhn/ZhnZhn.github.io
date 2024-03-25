"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
const _initState = initialValue => !!initialValue,
  _reducer = (state, value) => (0, _uiApi.isBool)(value) ? value : !state;
const useToggle = initialValue => (0, _uiApi.useReducer)(_reducer, initialValue, _initState);
var _default = exports.default = useToggle;
//# sourceMappingURL=useToggle.js.map