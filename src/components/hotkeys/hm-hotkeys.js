import { focusRefElement } from '../uiApi'
import { HAS_TOUCH_EVENTS } from '../has';

import {
  isHotKey,
  toUpperCase
} from '../hooks/fUseKey';

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

export const onHotKey = (
  evt
) => {
  if (isHotKey(evt)) {
    const [
      _onKeyDownHotKey,
      _refEl
    ] = hmHotKeys[toUpperCase(evt.key)] || [];
    if (typeof _onKeyDownHotKey === 'function') {
      evt.stopImmediatePropagation()
      focusRefElement(_refEl)
      _onKeyDownHotKey(evt)
    }
  }
};
