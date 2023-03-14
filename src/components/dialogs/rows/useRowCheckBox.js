import { useCallback } from '../../uiApi';
import useTheme from '../../hooks/useTheme';

const TH_ID = 'ROW_CHECKBOX';

const useRowCheckBox = (
  value,
  hCheck,
  hUnCheck
) => [
  useTheme(TH_ID),
  useCallback(() => {
    if (value) {
      hUnCheck()
    } else {
      hCheck()
    }
  }, [value, hCheck, hUnCheck])
];

export default useRowCheckBox
