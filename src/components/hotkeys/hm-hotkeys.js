import { focusRefElement } from '../uiApi'
import { HAS_TOUCH_EVENTS } from '../has';

export const HAS_HOT_KEYS = !HAS_TOUCH_EVENTS
export const HOT_KEY_EVENT = 'keydown'

let hmHotKeys = Object.create(null);

export const addHotKey = (
  hotKey,
  onKeyDown,
  ref
) => hmHotKeys
  && (hmHotKeys[hotKey] = [onKeyDown, ref])

export const removeHotKey = (
  hotKey
) => hmHotKeys
  && (hmHotKeys[hotKey] = void 0)

export const clearHotKeys = () => {
  hmHotKeys = null
}

const _isHotKey = (
  evt
) => (evt.altKey || evt.metaKey) && evt.key

export const onHotKey = (
  evt
) => {
  if (_isHotKey(evt)) {
    const [
      _onKeyDownHotKey,
      _refEl
    ] = hmHotKeys[evt.key.toUpperCase()] || [];
    if (typeof _onKeyDownHotKey === 'function') {
      evt.stopImmediatePropagation()
      focusRefElement(_refEl)
      _onKeyDownHotKey(evt)
    }
  }
};
