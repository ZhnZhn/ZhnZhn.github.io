import {
  useState,
  useCallback
} from "../uiApi";

import {
  getV
} from "../../utils/getPropertyFn";

import {
  CHT_BAR_SET,
  CHT_TREE_MAP
} from "../../constants/ChartType";

import { useProperty } from "../hooks/useProperty";

import { crInputSelectDfProps } from "./dialogFn";

const CHART_OPTIONS = [
  { c: "Bar (60, 90): By Partners", v: CHT_BAR_SET},
  { c: "TreeMap (60, 90): By Partners", v: CHT_TREE_MAP}
]
, WORLD_CASE_CHART_OPTIONS = CHART_OPTIONS
, [
  DF_CHART,
  CHART_PLACEHOLDER
] = crInputSelectDfProps(CHART_OPTIONS);

const _isInputChart = (
  tp,
  aggr
) => !(getV(tp) !== "0" && getV(aggr) === "TOTAL");

const _crChartOptions = (
  tradePartner,
  tradeAggr
) => getV(tradePartner) === "0" && getV(tradeAggr) === "TOTAL"
  ? WORLD_CASE_CHART_OPTIONS
  : CHART_OPTIONS

/*
const _isPeriod = (
  itemChart
)  => !(itemChart && itemChart.v === "SPLINE");
*/

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
     //setIsPeriod(() => _isPeriod(itemChart))
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
    CHART_PLACEHOLDER,
    isInputChart,
    isPeriod,
    toggleInputChart,
    _setChart,
    getChart,
    chartOptions
  ];
};

export default useInputChart
