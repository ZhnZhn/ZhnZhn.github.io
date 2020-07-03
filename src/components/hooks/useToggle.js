import { useState, useCallback } from 'react'

const useToggle = (initialValue) => {
 const [is, setIs] = useState(() => !!initialValue);
 return [
   is,
   useCallback(() => setIs(is => !is), [])
 ];
};

export default useToggle
