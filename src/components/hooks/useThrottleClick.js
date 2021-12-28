import { useRef, useCallback } from 'react';

const FN_NOOP = () => {};

const useThrottleClick = (
  timeout=0,
  onClick=FN_NOOP
) => {
  const _refTimeStamp = useRef(null);
  return useCallback((event) => {
    if (timeout === 0) {
      onClick(event)
      return;
    }
    const _timeStampPrev = _refTimeStamp.current
    , { timeStamp } = event;
    if (_timeStampPrev == null
        || timeStamp - _timeStampPrev > timeout) {
      onClick(event)
      _refTimeStamp.current = timeStamp
    }
  }, [timeout, onClick])
};

export default useThrottleClick
