import { useMemo } from '../uiApi';
import useToggle from '../hooks/useToggle';

import { isWideWidth } from '../has';

const IS_WIDE_WIDTH = isWideWidth();

const useSettingsMenuMore = (CL_ROW) => {
  const [
    isShowLabels,
    toggleLabels
  ] = useToggle(IS_WIDE_WIDTH)
  /*eslint-disable react-hooks/exhaustive-deps */
  , menuModel = useMemo(() => ({
    titleCl: CL_ROW,
    pageWidth: 190,
    maxPages: 1,
    p0: [{
      cn: CL_ROW,
      onClick: toggleLabels,
      name: "Toggle Input Labels",
      isClose: true
    }]
  }), [])
  //toggleLabels, CL_ROW
  /*eslint-enable react-hooks/exhaustive-deps */
  return [
    isShowLabels,
    menuModel
  ];
};

export default useSettingsMenuMore
