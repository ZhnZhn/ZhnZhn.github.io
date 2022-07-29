import {
  useRef
} from '../uiApi';

const usePrevValue = value => {
  const _ref = useRef()
  , { current } = _ref;
  _ref.current = value
  return current;
};

export default usePrevValue
