import {
  useCallback,
  getRefValue
} from '../uiApi';

/*eslint-disable react-hooks/exhaustive-deps */
const useGetRefValue2 = (
  ref1,
  ref2
) => useCallback(
  () => getRefValue(ref1) || getRefValue(ref2),
  []
);
// ref1, ref2
/*eslint-enable react-hooks/exhaustive-deps */

export default useGetRefValue2
