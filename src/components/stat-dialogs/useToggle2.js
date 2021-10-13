import {useState, useCallback} from 'react';

const useToggle2 = (initialValue) => {
  const [is, setIs] = useState(initialValue)
  return [
    is,
    useCallback(() => setIs(is=>!is), []),
    useCallback(() => setIs(false), [])
  ];
};

export default useToggle2
