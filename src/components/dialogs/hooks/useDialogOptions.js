import {
  useRef,
  useMemo
} from '../../uiApi';

import useToggleClose from '../../hooks/useToggleClose';

const useDialogOptions = () => {
  const refDialogOptions = useRef({
    //isNotZoomToMinMax: false,
    //isFilterZero: false,
    //isLogaritmic: false
  })
  , [
    isShowOptions,
    toggleOptions,
    hideOptions
  ] = useToggleClose()
  , toggleDialogOption = useMemo(() =>
    (is, propName) => {
      refDialogOptions.current[propName] = is
    }
  , []);

  return [
    refDialogOptions,
    isShowOptions,
    toggleOptions,
    hideOptions,
    toggleDialogOption
  ];
}

export default useDialogOptions
