"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.getStoreApi = exports.fUseStoreState = exports.fCrUse = exports.fCrStoreSlice = exports.createStoreWithSelector = exports.atom = void 0;
var _bindTo = require("../utils/bindTo");
exports.bindTo = _bindTo.bindTo;
var _useSubscribe = _interopRequireDefault(require("../components/hooks/useSubscribe"));
var _useSubscribeState = _interopRequireDefault(require("../components/hooks/useSubscribeState"));
var _useRerender = _interopRequireDefault(require("../components/hooks/useRerender"));
var _zustandLite = require("./zustand-lite");
const _isFn = v => typeof v === 'function';
const createStoreWithSelector = crStore => (0, _zustandLite.createStore)((0, _zustandLite.subscribeWithSelector)(crStore));
exports.createStoreWithSelector = createStoreWithSelector;
const getStoreApi = store => [store.setState, store.getState];
exports.getStoreApi = getStoreApi;
const fCrStoreSlice = (slicePn, optionPn) => [value => ({
  [slicePn]: optionPn ? {
    [optionPn]: value
  } : value
}), state => state[slicePn]];
exports.fCrStoreSlice = fCrStoreSlice;
const fCrUse = (store, select) => (0, _bindTo.bindTo)(_useSubscribe.default, store, select);
exports.fCrUse = fCrUse;
const fUseStoreState = (store, select) => (0, _bindTo.bindTo)(_useSubscribeState.default, store, select, () => select(store.getState()));
exports.fUseStoreState = fUseStoreState;
const _reducerUseAtomValue = (value, crOrValue) => _isFn(crOrValue) ? crOrValue(value) : crOrValue;
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