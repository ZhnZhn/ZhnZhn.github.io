import { useState, useMemo } from 'react';

const useBool = (initialValue) => {
  const [is, setIs] = useState(() => !!initialValue)
  , [setTrue, setFalse] = useMemo(() => [
    () => setIs(true),
    () => setIs(false)
  ], []);
  return [is, setTrue, setFalse];
};

export default useBool
