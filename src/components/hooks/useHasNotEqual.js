import {
  useRef,
  useCallback
} from '../uiApi';

const useHasNotEqual = (value) => {
  const _ref = useRef(value)
  , isCurrentValue = useCallback(
     _value => _ref.current === _value,
     []
   )
  , { current } = _ref;
  _ref.current = value
  return [
    !(current === value),
    isCurrentValue
  ];
};

export default useHasNotEqual
