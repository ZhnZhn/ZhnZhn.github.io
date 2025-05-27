import { HAS_WIDE_SCREEN } from '../../has';
import { useToggle } from '../../hooks/useToggle';

const useToggleLabels = () => useToggle(
  HAS_WIDE_SCREEN
)

export default useToggleLabels
