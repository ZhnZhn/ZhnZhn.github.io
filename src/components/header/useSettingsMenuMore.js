import { useMemo } from '../uiApi';
import { useToggle } from '../hooks/useToggle';

import { isWideWidth } from '../has';
import {
  crItem,
  addToggleTo,
  crSliderMenu
} from '../menuModelFn';

const IS_WIDE_WIDTH = isWideWidth();

const useSettingsMenuMore = (CL_ROW) => {
  const [
    isShowLabels,
    toggleLabels
  ] = useToggle(IS_WIDE_WIDTH)
  /*eslint-disable react-hooks/exhaustive-deps */
  , menuModel = useMemo(() => crSliderMenu(
    CL_ROW,
    170,
    1, {
      p0: [
        addToggleTo(crItem("Input Labels", toggleLabels, !1), IS_WIDE_WIDTH)
      ]
    }
  ), [])
  //toggleLabels, CL_ROW
  /*eslint-enable react-hooks/exhaustive-deps */
  return [
    isShowLabels,
    menuModel
  ];
};

export default useSettingsMenuMore
