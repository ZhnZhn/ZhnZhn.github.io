import {
  useRef,
  useCallback,
  setRefValue
} from '../../uiApi';

const useSelectItem = () => {
  const ref = useRef()
  , _hSelect = useCallback(item => {
    setRefValue(
      ref,
      (item || {}).caption
    )    
  }, [])
  return [ref, _hSelect];
};

export default useSelectItem
