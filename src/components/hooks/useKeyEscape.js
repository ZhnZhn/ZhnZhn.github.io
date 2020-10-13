import { useCallback } from 'react'

import isKeyEscape from '../zhn/isKeyEscape'

/*eslint-disable react-hooks/exhaustive-deps */
const useKeyEscape = (fn, deps) => useCallback(event => {
  if (isKeyEscape(event)) {
    event.preventDefault()
    event.stopPropagation()
    fn() 
  }
}, deps || []);
/*eslint-enable react-hooks/exhaustive-deps */

export default useKeyEscape
