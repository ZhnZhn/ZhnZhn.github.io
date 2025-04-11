import { showCustomizeExport } from '../../flux/actions/ComponentActions';

import { isFn } from '../uiApi';
import { useRefInit } from '../hooks/useProperty';

const useChartMethods = (
  getChart,
  onZoom,
  onCopy,
  onPasteTo
) => useRefInit(() => ({
  onExport: () => {
    showCustomizeExport({
      chart: getChart()
    });
  },
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
