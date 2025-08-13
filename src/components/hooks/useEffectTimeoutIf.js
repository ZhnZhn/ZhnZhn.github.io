import { isFn } from '../../utils/isTypeFn';

import {
  useRef,
  useEffect,
  setRefValue,
  getRefValue
} from '../uiApi';

const useEffectTimeoutIf = (
  is,
  fn,
  mls
) => {
  const _refId = useRef();
  /*eslint-disable react-hooks/exhaustive-deps*/
  useEffect(() => {
    if (is && isFn(fn) && mls >= 0) {
      setRefValue(_refId, setTimeout(fn, mls))
    }
    return () => clearTimeout(getRefValue(_refId));
  }, [is])
  // fn, mls
  /*eslint-enable react-hooks/exhaustive-deps*/
}

export default useEffectTimeoutIf
