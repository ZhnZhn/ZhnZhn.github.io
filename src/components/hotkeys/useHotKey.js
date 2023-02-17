import {
  useRef,
  useEffect
} from '../uiApi';

import {
  HAS_HOT_KEYS,
  addHotKey,
  removeHotKey
} from './hm-hotkeys';

const useHotKey = (
  hotKey,
  onKeyDown,
  refEl
) => {
  const ref = useRef(null);
  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => HAS_HOT_KEYS && hotKey
    ? (
        addHotKey(hotKey, onKeyDown, refEl || ref),
        () => removeHotKey(hotKey)
      )
    : void 0
  , [])
  //hotKey, onKeyDown, refEl
  /*eslint-disable react-hooks/exhaustive-deps */
  return [
    HAS_HOT_KEYS && hotKey ? hotKey : '',
    refEl || ref
  ];
}

export default useHotKey
