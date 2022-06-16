import {
  useRef,
  useCallback
} from '../../uiApi';

import useToggle from '../../hooks/useToggle';

const useDialogOptions = () => {
  const refDialogOptions = useRef({
    isNotZoomToMinMax: false,
    isFilterZero: false
  })
  , [
    isShowOptions,
    toggleOptions
  ] = useToggle(false)
  , toggleDialogOption = useCallback((propName, is) => {
    refDialogOptions.current[propName] = is
  }, [])
  /*eslint-disable react-hooks/exhaustive-deps */
  , hideOptions = useCallback(() => {
    toggleOptions(false)
  }, []);
  // toggleOption
  /*eslint-enable react-hooks/exhaustive-deps */

  return [
    refDialogOptions,
    isShowOptions,
    toggleOptions,
    hideOptions,
    toggleDialogOption
  ];
}

export default useDialogOptions
