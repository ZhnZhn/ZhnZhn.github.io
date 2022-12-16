import {
  useRef,
  useCallback
} from '../uiApi';

const useRefByIndex = () => {
  const refItems = useRef([])
  , fSelect = useCallback(index => (item) => {
      refItems.current[index] = item
         ? {...item}
         : void 0
  }, []);
  return [refItems, fSelect];
};

export default useRefByIndex
