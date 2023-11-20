import {
  createStore,
  subscribeWithSelector
} from './zustand-lite';

import useRerender from '../components/hooks/useRerender';

const _isFn = v => typeof v === 'function';

export const createStoreWithSelector = (
  crStore
) => createStore(
  subscribeWithSelector(crStore)
)

export const getStoreApi = store => [
  store.setState,
  store.getState
];

const _reducerUseAtomValue = (
  value,
  crOrValue
) => _isFn(crOrValue)
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
       if (_prev !== _atom.value && _isFn(_rerender)) {
         _rerender()
       }
     }
   };
}
