import { useCallback } from '../uiApi';
import useToggle from '../hooks/useToggle';

const useInputToggle = () => {
  const [
    isShowToggle,
    toggleInputs
  ] = useToggle(false)
  , hideToggle = useCallback(() => {
    toggleInputs(false)
  }, [toggleInputs]);
  return [
    isShowToggle,
    toggleInputs,
    hideToggle
  ];
};

export default useInputToggle
