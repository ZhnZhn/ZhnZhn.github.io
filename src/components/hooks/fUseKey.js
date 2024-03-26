import { useCallback } from '../uiApi';
import { HAS_KEYBOARD_FOCUS } from '../has';

import isKeyEscape from '../zhn/isKeyEscape';

const FN_NOOP = () => {};

export const isKeyEnterOrBlank = ({
  keyCode
}) => keyCode === 13 || keyCode === 32

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

export const useKeyEnter = fUseKey(isKeyEnterOrBlank)
export const useKeyEscape = HAS_KEYBOARD_FOCUS
  ? fUseKey(isKeyEscape)
  : FN_NOOP
