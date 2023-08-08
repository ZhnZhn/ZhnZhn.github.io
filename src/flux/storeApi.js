import { useReducer } from '../components/uiApi';

const _isFn = v => typeof v === 'function'
, _reducerUseAtomValue = (
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
       const [
         value,
         dispatch
       ] = useReducer(
         _reducerUseAtomValue,
         initialValue
       );
       _atom.dispatch = dispatch
       return value;
     },
     setValue: (crOrValue) => {
       _atom.value = _reducerUseAtomValue(_atom.value, crOrValue)
       const _dispatch = _atom.dispatch;
       if (_isFn(_dispatch)) {
         _dispatch(crOrValue)
       }
     }
   };
}
