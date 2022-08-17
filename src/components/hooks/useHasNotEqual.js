import { useRef } from '../uiApi';

const useHasNotEqual = (value) => {
  const _ref = useRef(value)
  , { current } = _ref;
  _ref.current = value
  return !(current === value);
};

export default useHasNotEqual
