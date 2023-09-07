import {
  S_INLINE,
  S_NONE,
  crCn,
  crBsContainerCn
} from '../styleFn';
import useTheme from '../hooks/useTheme';

const TH_ID = 'CHART_CONTAINER'
, CL_ROOT = crBsContainerCn("item-container")
, CL_SHOW_CONT = "show-cont";

const useChartContainerStyle = (
  isShow
) => [
  useTheme(TH_ID),
  isShow ? S_INLINE : S_NONE,
  crCn(
    CL_ROOT,
    [isShow, CL_SHOW_CONT]
  )
];

export default useChartContainerStyle
