import { useRef, useCallback } from 'react';

const useLoadChart = () => {
  const _refChart = useRef()
  , onLoaded = useCallback(chart => _refChart.current = chart, [])
  , getChart = useCallback(() => _refChart.current, [])
  return [onLoaded, getChart];
};

export default useLoadChart
