import {
  useState,
  useCallback
} from '../../uiApi';
import { useToggle } from '../../hooks/useToggle';

import { isCategoryItem } from '../ChartOptionsFn';

const useSelectChartType = () => {
  const [
    isShowFd,
    toggleIsShowFd
  ] = useToggle()
  , [
    chartType,
    setChartType
  ] = useState()
  /*eslint-disable react-hooks/exhaustive-deps */
  , hSelectChartType = useCallback(chartType => {
      setChartType(chartType)
      if (isCategoryItem(chartType)) {
        toggleIsShowFd(false)
      }
  }, [])
  // toggleIsShowFd
  /*eslint-enable react-hooks/exhaustive-deps */
  return [
    isShowFd,
    toggleIsShowFd,
    chartType,
    hSelectChartType
  ];
};

export default useSelectChartType
