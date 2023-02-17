import {
  useEffect
} from '../uiApi';

import {
  HAS_HOT_KEYS,
  HOT_KEY_EVENT,
  onHotKey,
  clearHotKeys
} from './hm-hotkeys';

const useHotKeysHandler = () => {
  useEffect(() => HAS_HOT_KEYS
    ? (
        document.addEventListener(HOT_KEY_EVENT, onHotKey, false),
        () => {
          clearHotKeys()
          document.removeEventListener(HOT_KEY_EVENT, onHotKey, false)
        }
      )
     : void 0
  , [])
}

export default useHotKeysHandler
