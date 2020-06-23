import { useCallback } from 'react'

import isKeyEnter from '../zhn/isKeyEnter'

/*eslint-disable react-hooks/exhaustive-deps */
const useKeyEnter = (fn) => useCallback(event => {
  if (isKeyEnter(event)) { fn() }
}, []);
/*eslint-enable react-hooks/exhaustive-deps */

export default useKeyEnter
