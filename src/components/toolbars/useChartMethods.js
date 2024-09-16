import { isFn } from '../uiApi';
import useRefInit from '../hooks/useRefInit';

const useChartMethods = (
  getChart,
  onZoom,
  onCopy,
  onPasteTo
) => useRefInit(() => ({
  onExport: () => getChart().exportChartLocal(),
  onFullScreen: () => getChart().fullscreen.open(),
  onPrint: () => getChart().print(),
  onX2H: () => getChart().zhToggle2H(),
  onMinMax: () => getChart().zhToggleMinMaxLines(),
  onZoom: () => {
    if (isFn(onZoom)) {
      onZoom({ chart: getChart() })
    }
  },
  onCopy: () => onCopy(getChart()),
  onPasteTo: () => onPasteTo(getChart())
}));

export default useChartMethods
