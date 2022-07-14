import { useCallback } from '../uiApi';
import throttleFn from '../../utils/throttleFn';

/*eslint-disable react-hooks/exhaustive-deps */
const useThrottleCallback = (
  fn,
  deps,
  period
) => useCallback(
  throttleFn(fn, period),
  deps || []
)
/*eslint-enable react-hooks/exhaustive-deps */

export default useThrottleCallback
