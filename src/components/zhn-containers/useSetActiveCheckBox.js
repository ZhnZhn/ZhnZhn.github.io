import { useMemo } from '../uiApi';

/*eslint-disable react-hooks/exhaustive-deps */
const useSetActiveCheckBox = (
  chartType,
  browserType,
  onSetActive
) => useMemo(() => [
  (checkBox) => {
    onSetActive(checkBox, true)
  },
  (checkBox) => {    
    onSetActive(checkBox, false)
  }
], []);
// chartType, browserType, onSetActive
/*eslint-enable react-hooks/exhaustive-deps */

export default useSetActiveCheckBox
