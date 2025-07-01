import { HAS_WIDE_SCREEN } from '../../has';
import { useToggleAsync } from '../../hooks/useToggle';

const useToggleLabels = (
  fnClose
) => useToggleAsync(
  HAS_WIDE_SCREEN,
  fnClose
)

export default useToggleLabels
