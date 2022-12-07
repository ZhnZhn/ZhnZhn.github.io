import { useMemo } from '../uiApi';

/*eslint-disable react-hooks/exhaustive-deps */
//onCheck, onUnCheck
const useSetCheckBox = (
  getMainChart,
  chartType,
  onSetActive
) => useMemo(() => [
  (checkBox) => {
    checkBox.chartType = chartType
    onSetActive(true, checkBox, getMainChart())
  },  
  (checkBox) => {
    checkBox.chartType = chartType
    onSetActive(false, checkBox, getMainChart())
  }
], []);
// chartType, onSetActive, getMainChart
/*eslint-enable react-hooks/exhaustive-deps */

export default useSetCheckBox
