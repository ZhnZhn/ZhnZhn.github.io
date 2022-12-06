import { useMemo } from 'react';

//_hLoadedMiniChart, _hUnLoadedMiniChart
/*eslint-disable react-hooks/exhaustive-deps */
const useMiniHandles = (
  getMainChart
) => useMemo(() => [
  (miniChart) => {
    const mainChart = getMainChart();
    if (mainChart) {
      mainChart.zhAddDetailChart(miniChart)
    }
  },
  (miniChart) => {
    const mainChart = getMainChart();
    if (mainChart) {
      mainChart.zhRemoveDetailChart(miniChart)
    }
  }
], []);
// getMainChart
/*eslint-enable react-hooks/exhaustive-deps */

export default useMiniHandles
