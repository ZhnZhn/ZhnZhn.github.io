import { useCallback } from 'react';

const useSetCheckBox = (
  getMainChart,
  chartType,
  onSetActive
) => {
  /*eslint-disable react-hooks/exhaustive-deps */
  const onCheck = useCallback((checkBox) => {
    checkBox.chartType = chartType
    onSetActive(true, checkBox, getMainChart())
  }, [])
  , onUnCheck = useCallback((checkBox) => {
    checkBox.chartType = chartType
    onSetActive(false, checkBox, getMainChart())
  }, [])
  // chartType, onSetActive, getMainChart
  /*eslint-enable react-hooks/exhaustive-deps */
  return [onCheck, onUnCheck];
};

export default useSetCheckBox
