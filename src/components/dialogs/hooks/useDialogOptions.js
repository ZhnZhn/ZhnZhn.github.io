import {
  useRef,
  useMemo
} from '../../uiApi';

import useToggle from '../../hooks/useToggle';

const useDialogOptions = () => {
  const refDialogOptions = useRef({
    //isNotZoomToMinMax: false,
    //isFilterZero: false,
    //isLogaritmic: false
  })
  , [
    isShowOptions,
    toggleOptions
  ] = useToggle(false)
  , [
    hideOptions,
    toggleDialogOption
  ] = useMemo(() => [
    () => { toggleOptions(false)},
    (propName, is) => {
      refDialogOptions.current[propName] = is
    }
  ], [toggleOptions]);

  return [
    refDialogOptions,
    isShowOptions,
    toggleOptions,
    hideOptions,
    toggleDialogOption
  ];
}

export default useDialogOptions
