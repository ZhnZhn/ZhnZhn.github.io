export { bindTo } from '../utils/bindTo';
import { bindTo } from '../utils/bindTo';

export {
  isFn,
  isStr,
  isUndef
} from '../utils/isTypeFn';
import { isFn } from '../utils/isTypeFn';

import useSubscribe from '../components/hooks/useSubscribe';
import useSubscribeState from '../components/hooks/useSubscribeState';
import useRerender from '../components/hooks/useRerender';

import {
  createStore,
  subscribeWithSelector
} from './zustand-lite';


export const createStoreWithSelector = (
  crStore
) => createStore(
  subscribeWithSelector(crStore)
)

export const getStoreApi = store => [
  store.setState,
  store.getState
];

export const fCrStoreSlice = (
  slicePn,
  optionPn
) => [
  (value) => ({
    [slicePn]: optionPn
      ? {[optionPn]: value}
      : value
  }),
  state => state[slicePn]
]

export const fCrUse = (
  store,
  select
) => bindTo(useSubscribe,
  store,
  select
)

export const fUseStoreState = (
  store,
  select
) => bindTo(
  useSubscribeState,
  store,
  select
)

const _reducerUseAtomValue = (
  value,
  crOrValue
) => isFn(crOrValue)
  ? crOrValue(value)
  : crOrValue;
export const atom = (initialValue) => {
   const _atom = Object.create(null);
   _atom.value = initialValue
   return {
     useAtomValue: () => {
       _atom.rerender = useRerender()
       return _atom.value;
     },
     setValue: (crOrValue) => {
       const _prev = _atom.value
       , _rerender = _atom.rerender;
       _atom.value = _reducerUseAtomValue(_prev, crOrValue)
       if (_prev !== _atom.value && isFn(_rerender)) {
         _rerender()
       }
     }
   };
}
