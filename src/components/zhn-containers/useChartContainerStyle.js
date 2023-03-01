import useTheme from '../hooks/useTheme';
import crCn from '../zhn-utils/crCn';

const TH_ID = 'CHART_CONTAINER'
, CL_ROOT = "item-container"
, CL_SHOW_CONT = "show-cont"
, S_INLINE = { display: 'inline-block' }
, S_NONE = { display: 'none' };

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
