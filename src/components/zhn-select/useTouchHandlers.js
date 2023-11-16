import {
  useRef,
  useState,
  useMemo,
  useEffect,
  getRefValue,
  setRefValue
} from '../uiApi';

import { HAS_TOUCH_EVENTS } from '../has';

const useTouchHandlers = () => {
  const _refBlurId = useRef()
  , [
    isFocused,
    setIsFocused
  ] = useState();

  useEffect(() => () => {
    clearTimeout(getRefValue(_refBlurId))
  }, [])

  return [
    isFocused,
    useMemo(() => HAS_TOUCH_EVENTS
      ? {
          onFocus: () => {
            clearTimeout(getRefValue(_refBlurId))
            setIsFocused(true)
          },
          onBlur: () => {
            setRefValue(_refBlurId, setTimeout(
              () => setIsFocused(false),
              800
            ))
          }
        }
      : void 0
    , [])
  ];
};

export default useTouchHandlers
