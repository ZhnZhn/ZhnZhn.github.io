import {
  useEffect,
  focusRefElement
} from '../uiApi';

const useAsyncFocusIf = (
  is,
  getFocusElement,
  mls
) => {
  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (is) {
      setTimeout(
        () => focusRefElement(getFocusElement),
        mls || 1000
      )
    }
  }, [is])
  // getFocusElement, mls
  /*eslint-enable react-hooks/exhaustive-deps */
}

export default useAsyncFocusIf
