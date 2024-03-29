"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useProperty = _interopRequireDefault(require("../hooks/useProperty"));
const CHART_OPTIONS = [{
    c: "TreeMap (60, 90)",
    v: "TREE_MAP"
  }, {
    c: "Bar (60, 90)",
    v: "BAR"
  }],
  WORLD_CHART_OPTIONS = [...CHART_OPTIONS, {
    c: "Spline",
    v: 'SPLINE'
  }],
  DF_CHART = CHART_OPTIONS[0];
const _isInputChart = (tp, aggr) => !(tp.v !== '0' && aggr.v === 'TOTAL');
const _crChartOptions = (tradePartner, tradeAggr) => tradePartner.v === "0" && tradeAggr.v === "TOTAL" ? WORLD_CHART_OPTIONS : CHART_OPTIONS;
const useInputChart = (getTradePartner, getTradeAggregaton) => {
  const [setChart, getChart] = (0, _useProperty.default)(DF_CHART, DF_CHART),
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
        }
        return _nextChartOptions;
      });
    }, []);
  //getTradePartner, getTradeAggregaton
  /*eslint-enable react-hooks/exhaustive-deps */
  return [isInputChart, toggleInputChart, setChart, getChart, chartOptions];
};
var _default = useInputChart;
exports.default = _default;
//# sourceMappingURL=useToggleInputChart.js.map