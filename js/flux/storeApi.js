"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.atom = void 0;
var _useRerender = _interopRequireDefault(require("../components/hooks/useRerender"));
const _isFn = v => typeof v === 'function',
  _reducerUseAtomValue = (value, crOrValue) => _isFn(crOrValue) ? crOrValue(value) : crOrValue;
const atom = initialValue => {
  const _atom = Object.create(null);
  _atom.value = initialValue;
  return {
    useAtomValue: () => {
      _atom.rerender = (0, _useRerender.default)();
      return _atom.value;
    },
    setValue: crOrValue => {
      const _prev = _atom.value,
        _rerender = _atom.rerender;
      _atom.value = _reducerUseAtomValue(_prev, crOrValue);
      if (_prev !== _atom.value && _isFn(_rerender)) {
        _rerender();
      }
    }
  };
};
exports.atom = atom;
//# sourceMappingURL=storeApi.js.map