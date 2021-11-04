import { useRef, useCallback } from 'react';

const useRefList = (initialList=[]) => {
  const ref = useRef(initialList)
  ,  addValue = useCallback(value => {
      ref.current.push(value)
  }, [])
  , removeValue = useCallback(value => {
     ref.current = ref.current
        .filter(v => v !== value)
  }, []);
  return [ref, addValue, removeValue]
};

export default useRefList
