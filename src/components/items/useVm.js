import {
  useRef,
  useCallback,
  getRefValue
} from '../uiApi';

const useVm = () => {
  const refVm = useRef()
  , compareTo = useCallback(dateTo => {
    const _vmInst = getRefValue(refVm);
    return _vmInst
      ? _vmInst._updateDateTo(dateTo)
      : void 0;
  }, []);
  return [
    refVm,
    compareTo
  ];
};

export default useVm
