import { useRef, useEffect } from 'react';

const useFocus = (isShow) => {
  const ref = useRef();
  useEffect(() => {
    if (isShow && ref.current) {
      ref.current.focus()
    }
  }, [isShow])
  return ref;
};

export default useFocus
