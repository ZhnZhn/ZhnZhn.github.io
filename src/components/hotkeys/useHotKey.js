import {
  useContext,
  useRef,
  useEffect
} from '../uiApi';
import { HAS_TOUCH_EVENTS } from '../has';

import HotKeysContext from './HotKeysContext';

const useHotKey = (
  hotKey,
  onKeyDown,
  refBt
) => {
  const hmHotKeys = useContext(HotKeysContext)
  , ref = useRef(null);

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!HAS_TOUCH_EVENTS && hotKey) {
      hmHotKeys[hotKey] = [refBt || ref, onKeyDown]
      return () => hmHotKeys[hotKey] = void 0
    }
  }, [hotKey, onKeyDown])
  // hmHotKeys
  /*eslint-enable react-hooks/exhaustive-deps */

  return [
    !HAS_TOUCH_EVENTS && hotKey ? hotKey : '',
    refBt || ref
  ]
};

export default useHotKey
