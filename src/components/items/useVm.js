import { useRef, useCallback } from 'react';

const useVm = () => {
  const refVm = useRef()
  , compareTo = useCallback((dateTo) => {
    const { current } = refVm;
    if (current) {
      return current._updateDateTo(dateTo);
    }
  }, []);
  return [refVm, compareTo];
};

export default useVm
