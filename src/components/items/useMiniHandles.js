import { useCallback } from 'react';

const useMiniHandles = (getMainChart) => {
  /*eslint-disable react-hooks/exhaustive-deps */
  const _hLoadedMiniChart = useCallback((miniChart) => {
    const mainChart = getMainChart()
    if (mainChart) {
      mainChart.zhAddDetailChart(miniChart)
    }
  }, [])
  // getMainChart
  , _hUnLoadedMiniChart = useCallback((miniChart) => {
    const mainChart = getMainChart()
    if (mainChart) {
      mainChart.zhRemoveDetailChart(miniChart)
    }
  }, []);
  // getMainChart
  /*eslint-enable react-hooks/exhaustive-deps */
  return [_hLoadedMiniChart, _hUnLoadedMiniChart];
};

export default useMiniHandles
