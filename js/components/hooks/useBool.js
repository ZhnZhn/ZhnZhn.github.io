"use strict";

exports.__esModule = true;
exports.useToggleFalse = exports.useBool = void 0;
var _uiApi = require("../uiApi");
const _crBoolState = (prevState, value) => prevState[0] !== value ? [value, prevState[1], prevState[2]] : prevState;
const useBool = initialValue => {
  const [state, setState] = (0, _uiApi.useState)(() => [!!initialValue, () => setState(prevState => _crBoolState(prevState, true)), () => setState(prevState => _crBoolState(prevState, false))]);
  return state;
};
exports.useBool = useBool;
const useToggleFalse = initialValue => {
  const [state, setState] = (0, _uiApi.useState)(() => [!!initialValue, () => setState(prevState => _crBoolState(prevState, !prevState[0])), () => setState(prevState => _crBoolState(prevState, false))]);
  return state;
};
exports.useToggleFalse = useToggleFalse;
//# sourceMappingURL=useBool.js.map