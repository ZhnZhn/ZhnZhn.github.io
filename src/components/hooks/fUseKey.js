import { useCallback } from '../uiApi';
import { HAS_KEYBOARD_FOCUS } from '../has';

const FN_NOOP = () => {};

export const isKeyEnterOrBlank = ({
  keyCode
}) => keyCode === 13 || keyCode === 32

const isKeyEscape = (
  evt
) => evt.keyCode === 27 || evt.key === 'Escape';

const _onKeyFnEvt = (
  isKey,
  fn,
  evt
) => {
  if (isKey(evt)) {
    evt.preventDefault()
    evt.stopPropagation()
    fn(evt)
  }
};

const _fOnKey = isKey => fn => evt => {
  _onKeyFnEvt(isKey, fn, evt)
};

export const fOnKeyEnter = _fOnKey(isKeyEnterOrBlank)

/*eslint-disable react-hooks/exhaustive-deps */
const fUseKey = isKey => (
  fn,
  deps
) => useCallback(evt => {
  _onKeyFnEvt(isKey, fn, evt)
}, deps || []);
/*eslint-enable react-hooks/exhaustive-deps */

export const useKeyEnter = fUseKey(isKeyEnterOrBlank)
export const useKeyEscape = HAS_KEYBOARD_FOCUS
  ? fUseKey(isKeyEscape)
  : FN_NOOP
