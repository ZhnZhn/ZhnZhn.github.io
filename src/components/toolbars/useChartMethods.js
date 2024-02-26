import { isFn } from '../uiApi';
import useRefInit from '../hooks/useRefInit';

const useChartMethods = (
  getChart,
  onZoom,
  onCopy,
  onPasteTo
) => useRefInit(() => ({
  onClick2H: () => getChart().zhToggle2H(),
  onMinMax: () => getChart().zhToggleMinMaxLines(),
  onZoomChart: () => {
    if (isFn(onZoom)) {
      onZoom({ chart: getChart() })
    }
  },
  onCopyChart: () => onCopy(getChart()),
  onPasteToChart: () => onPasteTo(getChart())
}));

export default useChartMethods
