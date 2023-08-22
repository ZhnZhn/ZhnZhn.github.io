import {
  useEffect,
  focusRefElement
} from '../uiApi';

const useAsyncFocusRefIf = (
  is,
  ref1,
  ref2,
  mls
) => {
  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (is) {
      setTimeout(
        () => focusRefElement(ref1, ref2),
        mls || 1000
      )
    }
  }, [is])
  // ref1, ref2, mls
  /*eslint-enable react-hooks/exhaustive-deps */
}

export default useAsyncFocusRefIf
