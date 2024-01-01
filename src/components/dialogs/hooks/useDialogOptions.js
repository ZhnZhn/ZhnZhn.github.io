import {
  useRef,
  useMemo
} from '../../uiApi';

import { useToggleFalse } from '../../hooks/useBool';

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
  ] = useToggleFalse()
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
