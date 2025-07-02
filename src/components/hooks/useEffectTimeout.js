import { isFn } from '../../utils/isTypeFn';

import {
  useRef,
  useEffect,
  setRefValue,
  getRefValue
} from '../uiApi';

const useEffectTimeout = (
  fn,
  mls,
  deps = [],
  predicate = true
) => {
  const _refId = useRef();
  /*eslint-disable react-hooks/exhaustive-deps*/
  useEffect(() => {
    if (predicate && isFn(fn) && mls >=0) {
      setRefValue(_refId, setTimeout(fn, mls))
    }
    return () => clearTimeout(getRefValue(_refId));
  }, deps)
  // fn, mls, predicate
  /*eslint-enable react-hooks/exhaustive-deps*/
}

export default useEffectTimeout
