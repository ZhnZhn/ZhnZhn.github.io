import { useRef, useCallback } from 'react'

const useProperty = (initialValue) => {
  const ref = useRef(initialValue)
  , setValue = useCallback(v => { ref.current = v }, [])
  , getValue = useCallback(() => ref.current, []);
  return [
    setValue,
    getValue
  ];
};

export default useProperty
