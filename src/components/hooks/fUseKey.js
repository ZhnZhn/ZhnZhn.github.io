import { useCallback } from '../uiApi';

/*eslint-disable react-hooks/exhaustive-deps */
const fUseKey = isKey => (fn, deps) => useCallback(event => {
  if (isKey(event)) {
    event.preventDefault()
    event.stopPropagation()
    fn(event)
  }
}, deps || []);
/*eslint-enable react-hooks/exhaustive-deps */

export default fUseKey
