import {
  useCallback,
  stopDefaultFor
} from '../uiApi';
import { HAS_KEYBOARD_FOCUS } from '../has';

export const toUpperCase = str => str.toUpperCase();

const FN_NOOP = () => {};
const _isHotKey = (
  evt
) => (evt.altKey || evt.metaKey) && evt.key;

export const isHotKey = (
  evt,
  keyChar
) => keyChar
  ? _isHotKey(evt) && toUpperCase(evt.key) === toUpperCase(keyChar)
  : _isHotKey(evt)

export const isKeyEnterOrBlank = ({
  keyCode
}) => keyCode === 13 || keyCode === 32

export const isKeyEscape = (
  evt
) => evt.keyCode === 27 || evt.key === 'Escape';

const _onKeyFnEvt = (
  isKey,
  fn,
  evt
) => {
  if (isKey(evt)) {
    stopDefaultFor(evt)
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
