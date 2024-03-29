import {
  useRef,
  useLayoutEffect,
  useCallback
} from '../uiApi';

const useEventCallback = handler => {
  const ref = useRef(null);
  useLayoutEffect(() => {
    ref.current = handler
  })
  return useCallback((...args) => {
    const fn = ref.current;
    return fn(...args);
  }, []);
};

export default useEventCallback
