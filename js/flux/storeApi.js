"use strict";

exports.__esModule = true;
exports.atom = void 0;
var _uiApi = require("../components/uiApi");
const _isFn = v => typeof v === 'function',
  _reducerUseAtomValue = (value, crOrValue) => _isFn(crOrValue) ? crOrValue(value) : crOrValue;
const atom = initialValue => {
  const _atom = Object.create(null);
  _atom.value = initialValue;
  return {
    useAtomValue: () => {
      const [value, dispatch] = (0, _uiApi.useReducer)(_reducerUseAtomValue, initialValue);
      _atom.dispatch = dispatch;
      return value;
    },
    setValue: crOrValue => {
      _atom.value = _reducerUseAtomValue(_atom.value, crOrValue);
      const _dispatch = _atom.dispatch;
      if (_isFn(_dispatch)) {
        _dispatch(crOrValue);
      }
    }
  };
};
exports.atom = atom;
//# sourceMappingURL=storeApi.js.map