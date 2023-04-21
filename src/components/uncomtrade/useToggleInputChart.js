import {
  useState,
  useCallback
} from '../uiApi';

const _isInputChart = (
  tp,
  aggr
) => !(tp.v !== '0' && aggr.v === 'TOTAL');

const useToggleInputChart = (
  getTradePartner,
  getTradeAggregaton
) => {
  const [
    isInputChart,
    setInputChart
  ] = useState(true)
  /*eslint-disable react-hooks/exhaustive-deps */
  , toggleInputChart = useCallback(() => {
    setInputChart(_isInputChart(
      getTradePartner(),
      getTradeAggregaton()
    ))
  }, []);
  //getTradePartner, getTradeAggregaton
  /*eslint-enable react-hooks/exhaustive-deps */
  return [
    isInputChart,
    toggleInputChart
  ];
};

export default useToggleInputChart
