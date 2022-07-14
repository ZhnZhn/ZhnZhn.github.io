import {
  useContext,
  useRef,
  useEffect
} from '../uiApi';
import has from '../has';

import HotKeysContext from './HotKeysContext';

const HAS_TOUCH = has.touch;

const useHotKey = (
  hotKey,
  onKeyDown,
  refBt
) => {
  const hmHotKeys = useContext(HotKeysContext)
  , ref = useRef(null);

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!HAS_TOUCH && hotKey) {
      hmHotKeys[hotKey] = [refBt || ref, onKeyDown]
      return () => hmHotKeys[hotKey] = void 0
    }
  }, [hotKey, onKeyDown])
  // hmHotKeys
  /*eslint-enable react-hooks/exhaustive-deps */

  return [
    !HAS_TOUCH && hotKey ? hotKey : '',
    refBt || ref
  ]
};

export default useHotKey
