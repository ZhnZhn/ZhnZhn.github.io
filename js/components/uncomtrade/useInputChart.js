"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _getPropertyFn = require("../../utils/getPropertyFn");
var _ChartType = require("../../constants/ChartType");
var _useProperty = require("../hooks/useProperty");
var _dialogFn = require("./dialogFn");
const CHART_OPTIONS = [{
    c: "Bar (60, 90): By Partners",
    v: _ChartType.CHT_BAR_SET
  }, {
    c: "TreeMap (60, 90): By Partners",
    v: _ChartType.CHT_TREE_MAP
  }],
  WORLD_CASE_CHART_OPTIONS = CHART_OPTIONS,
  [DF_CHART, CHART_PLACEHOLDER] = (0, _dialogFn.crInputSelectDfProps)(CHART_OPTIONS);
const _isInputChart = (tp, aggr) => !((0, _getPropertyFn.getV)(tp) !== "0" && (0, _getPropertyFn.getV)(aggr) === "TOTAL");
const _crChartOptions = (tradePartner, tradeAggr) => (0, _getPropertyFn.getV)(tradePartner) === "0" && (0, _getPropertyFn.getV)(tradeAggr) === "TOTAL" ? WORLD_CASE_CHART_OPTIONS : CHART_OPTIONS;

/*
const _isPeriod = (
  itemChart
)  => !(itemChart && itemChart.v === "SPLINE");
*/

const useInputChart = (getTradePartner, getTradeAggregaton) => {
  const [setChart, getChart] = (0, _useProperty.useProperty)(DF_CHART, DF_CHART),
    [isPeriod, setIsPeriod] = (0, _uiApi.useState)(true)
    /*eslint-disable react-hooks/exhaustive-deps */,
    _setChart = (0, _uiApi.useCallback)(itemChart => {
      setChart(itemChart);
      //setIsPeriod(() => _isPeriod(itemChart))
    }, [])
    // setChart
    /*eslint-enable react-hooks/exhaustive-deps */,
    [isInputChart, setIsInputChart] = (0, _uiApi.useState)(true),
    [chartOptions, setChartOptions] = (0, _uiApi.useState)(() => _crChartOptions(getTradePartner(), getTradeAggregaton()))
    /*eslint-disable react-hooks/exhaustive-deps */,
    toggleInputChart = (0, _uiApi.useCallback)(() => {
      const _tradePartner = getTradePartner(),
        _tradeAggregation = getTradeAggregaton();
      setIsInputChart(_isInputChart(_tradePartner, _tradeAggregation));
      setChartOptions(prevChartOptions => {
        const _nextChartOptions = _crChartOptions(_tradePartner, _tradeAggregation);
        if (_nextChartOptions !== prevChartOptions) {
          setChart(DF_CHART);
          setIsPeriod(true);
        }
        return _nextChartOptions;
      });
    }, []);
  //getTradePartner, getTradeAggregaton
  /*eslint-enable react-hooks/exhaustive-deps */
  return [CHART_PLACEHOLDER, isInputChart, isPeriod, toggleInputChart, _setChart, getChart, chartOptions];
};
var _default = exports.default = useInputChart;
//# sourceMappingURL=useInputChart.js.map