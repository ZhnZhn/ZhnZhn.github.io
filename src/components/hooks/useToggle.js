import { useState, useCallback } from 'react'

const _isBool = v => typeof v === 'boolean';

const useToggle = (initialValue) => {
 const [is, setIs] = useState(() => !!initialValue);
 return [
   is,
   useCallback((v) => {
     if (_isBool(v)) {
       setIs(v)
     } else {
       setIs(is => !is)
     }
   }, [])
 ];
};

export default useToggle
