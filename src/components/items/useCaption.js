import {
  useState,
  useCallback
} from '../uiApi';

const useCaption = (
  getMainChart,
  toggleToolbar
) => {
  const [isCaption, setIsCapion] = useState(true)
  /*eslint-disable react-hooks/exhaustive-deps */
  , hideCaption = useCallback(() => {
      const _mainChart = getMainChart();
      if (_mainChart) {
        _mainChart.zhHideCaption()
        setIsCapion(false)
        toggleToolbar(false)
      }
    }, [])
  // getMainChart, toggleToolbar
  , showCaption = useCallback(() => {
      const _mainChart = getMainChart();
      if (_mainChart) {
        _mainChart.zhShowCaption()
        setIsCapion(true)
        toggleToolbar(true)
      }
    }, [])
  // getMainChart, toggleToolbar
  /*eslint-enable react-hooks/exhaustive-deps */
  return [isCaption, showCaption, hideCaption];
};

export default useCaption
