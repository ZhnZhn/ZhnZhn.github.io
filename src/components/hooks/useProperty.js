import { useRef, useCallback } from 'react'

const useProperty = (initialValue) => {
  const ref = useRef(initialValue)
  , setValue = useCallback(v => { ref.current = v }, []);
  return [
    setValue,
    _ => ref.current
  ];
};

export default useProperty
