import {
  useState,
  useCallback
} from '../uiApi';

import useProperty from '../hooks/useProperty';

const CHART_OPTIONS = [
  { c: "TreeMap (60, 90)", v: "TREE_MAP"},
  { c: "Bar (60, 90)", v: "BAR"}
]
, WORLD_CASE_CHART_OPTIONS = [
  ...CHART_OPTIONS,
  { c: "Spline", v: 'SPLINE' }
]
, DF_CHART = CHART_OPTIONS[0]

const _isInputChart = (
  tp,
  aggr
) => !(tp.v !== '0' && aggr.v === 'TOTAL');

const _crChartOptions = (
  tradePartner,
  tradeAggr
) => tradePartner.v === "0" && tradeAggr.v === "TOTAL"
  ? WORLD_CASE_CHART_OPTIONS
  : CHART_OPTIONS

const _isPeriod = (
  itemChart
)  => !(itemChart && itemChart.v === 'SPLINE');

const useInputChart = (
  getTradePartner,
  getTradeAggregaton
) => {
  const [
    setChart,
    getChart
  ] = useProperty(
    DF_CHART,
    DF_CHART
  )
  , [
    isPeriod,
    setIsPeriod
  ] = useState(true)
  /*eslint-disable react-hooks/exhaustive-deps */
  , _setChart = useCallback(itemChart => {
     setChart(itemChart)
     setIsPeriod(() => _isPeriod(itemChart))
  }, [])
  // setChart
  /*eslint-enable react-hooks/exhaustive-deps */
  , [
    isInputChart,
    setIsInputChart
  ] = useState(true)
  , [
     chartOptions,
     setChartOptions
   ] = useState(() => _crChartOptions(
      getTradePartner(),
      getTradeAggregaton()
    ))
  /*eslint-disable react-hooks/exhaustive-deps */
  , toggleInputChart = useCallback(() => {
      const _tradePartner = getTradePartner()
      , _tradeAggregation = getTradeAggregaton();
      setIsInputChart(_isInputChart(
        _tradePartner,
        _tradeAggregation
      ))
      setChartOptions(prevChartOptions => {
        const _nextChartOptions = _crChartOptions(
          _tradePartner,
          _tradeAggregation
        );
        if (_nextChartOptions !== prevChartOptions) {
          setChart(DF_CHART)
          setIsPeriod(true)
        }
        return _nextChartOptions;
      })
  }, []);
  //getTradePartner, getTradeAggregaton
  /*eslint-enable react-hooks/exhaustive-deps */
  return [
    isInputChart,
    isPeriod,
    toggleInputChart,
    _setChart,
    getChart,
    chartOptions
  ];
};

export default useInputChart
