import { useCallback } from '../uiApi';
import isKeyEnter from '../zhn/isKeyEnter';
import isKeyEscape from '../zhn/isKeyEscape';

/*eslint-disable react-hooks/exhaustive-deps */
const fUseKey = isKey => (
  fn,
  deps
) => useCallback(evt => {
  if (isKey(evt)) {
    evt.preventDefault()
    evt.stopPropagation()
    fn(evt)
  }
}, deps || []);
/*eslint-enable react-hooks/exhaustive-deps */

export const useKeyEnter = fUseKey(isKeyEnter)
export const useKeyEscape = fUseKey(isKeyEscape)
