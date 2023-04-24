"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useProperty = _interopRequireDefault(require("../hooks/useProperty"));
var _dialogFn = require("./dialogFn");
const CHART_OPTIONS = [{
    c: "TreeMap (60, 90)",
    v: "TREE_MAP"
  }, {
    c: "Bar (60, 90)",
    v: "BAR"
  }],
  WORLD_CASE_CHART_OPTIONS = [...CHART_OPTIONS, {
    c: "Spline",
    v: 'SPLINE'
  }],
  [DF_CHART, CHART_PLACEHOLDER] = (0, _dialogFn.crInputSelectDfProps)(CHART_OPTIONS);
const _isInputChart = (tp, aggr) => !(tp.v !== '0' && aggr.v === 'TOTAL');
const _crChartOptions = (tradePartner, tradeAggr) => tradePartner.v === "0" && tradeAggr.v === "TOTAL" ? WORLD_CASE_CHART_OPTIONS : CHART_OPTIONS;
const _isPeriod = itemChart => !(itemChart && itemChart.v === 'SPLINE');
const useInputChart = (getTradePartner, getTradeAggregaton) => {
  const [setChart, getChart] = (0, _useProperty.default)(DF_CHART, DF_CHART),
    [isPeriod, setIsPeriod] = (0, _uiApi.useState)(true)
    /*eslint-disable react-hooks/exhaustive-deps */,
    _setChart = (0, _uiApi.useCallback)(itemChart => {
      setChart(itemChart);
      setIsPeriod(() => _isPeriod(itemChart));
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
var _default = useInputChart;
exports.default = _default;
//# sourceMappingURL=useInputChart.js.map