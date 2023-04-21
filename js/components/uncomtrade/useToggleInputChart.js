"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
const _isInputChart = (tp, aggr) => !(tp.v !== '0' && aggr.v === 'TOTAL');
const useToggleInputChart = (getTradePartner, getTradeAggregaton) => {
  const [isInputChart, setInputChart] = (0, _uiApi.useState)(true)
    /*eslint-disable react-hooks/exhaustive-deps */,
    toggleInputChart = (0, _uiApi.useCallback)(() => {
      setInputChart(_isInputChart(getTradePartner(), getTradeAggregaton()));
    }, []);
  //getTradePartner, getTradeAggregaton
  /*eslint-enable react-hooks/exhaustive-deps */
  return [isInputChart, toggleInputChart];
};
var _default = useToggleInputChart;
exports.default = _default;
//# sourceMappingURL=useToggleInputChart.js.map