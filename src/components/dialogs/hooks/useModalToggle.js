import { useToggleFalse } from '../../hooks/useBool';
import useToggleLabels from './useToggleLabels';

const useModalToggle = () => {
  const [
    isToggle,
    toggleInputs,
    hideToggle
  ] = useToggleFalse()
  , [
    isShowLabels,
    toggleLabels
  ] = useToggleLabels(hideToggle);
  return [
    isToggle,
    toggleInputs,
    hideToggle,
    isShowLabels,
    toggleLabels
  ];
}

export default useModalToggle
