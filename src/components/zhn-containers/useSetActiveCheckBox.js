import { useMemo } from '../uiApi';

/*eslint-disable react-hooks/exhaustive-deps */
const useSetActiveCheckBox = (
  chartType,
  browserType,
  onSetActive
) => useMemo(() => [
  (checkBox) => {
    checkBox.chartType = chartType
    checkBox.browserType = browserType
    onSetActive(true, checkBox)
  },
  (checkBox) => {
    checkBox.chartType = chartType
    checkBox.browserType = browserType
    onSetActive(false, checkBox)
  }
], []);
// chartType, browserType, onSetActive
/*eslint-enable react-hooks/exhaustive-deps */

export default useSetActiveCheckBox
