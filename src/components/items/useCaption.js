import {
  useState,
  useMemo
} from '../uiApi';

//[isCaption, showCaption, hideCaption]
const useCaption = (
  getMainChart,
  toggleToolbar
) => {
  const [
    isCaption,
    setIsCaption
  ] = useState(true);  
  return [
    isCaption,
    /*eslint-disable react-hooks/exhaustive-deps */
    ...useMemo(() => [
      () => {
        const _mainChart = getMainChart();
        if (_mainChart) {
          _mainChart.zhShowCaption()
          setIsCaption(true)
          toggleToolbar(true)
        }
      },
      () => {
        const _mainChart = getMainChart();
        if (_mainChart) {
          _mainChart.zhHideCaption()
          setIsCaption(false)
          toggleToolbar(false)
        }
      }
    ], [])
    // getMainChart, toggleToolbar
    /*eslint-enable react-hooks/exhaustive-deps */
  ];
};

export default useCaption
