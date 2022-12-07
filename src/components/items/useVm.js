import {
  useRef,
  useCallback
} from '../uiApi';

const useVm = () => {
  const refVm = useRef()
  , compareTo = useCallback(dateTo => {
    const { current } = refVm;
    return current
      ? current._updateDateTo(dateTo)
      : void 0;
  }, []);
  return [refVm, compareTo];
};

export default useVm
