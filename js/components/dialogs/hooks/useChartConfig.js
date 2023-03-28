"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
var _crDateConfig = _interopRequireDefault(require("../fns/crDateConfig"));
var _ChartOptionsFn = require("../ChartOptionsFn");
const DF_MAP_FREQUENCY = 'EMPTY';
const _getChartConfigFromItem = (item, mapFrequency, mapDateDf) => [item.mapFrequency || mapFrequency, item.mapDateDf || mapDateDf];
const _isRequireUpdateChartConfig = (prevState, mapFrequency, mapDateDf) => prevState._mapFrequency !== mapFrequency || prevState._mapDateDf !== mapDateDf;
const useChartConfig = (selectProps, chartsType, loadId, dfProps, onUpdateChartConfig) => {
  const {
      mapFrequency = DF_MAP_FREQUENCY,
      mapDateDf
    } = dfProps || {},
    [chartConfig, setChartConfig] = (0, _uiApi.useState)({
      _mapFrequency: mapFrequency,
      _mapDateDf: mapDateDf
    }),
    {
      _mapFrequency,
      _mapDateDf
    } = chartConfig,
    {
      chartOptions,
      dateDefault,
      dateOptions
    } = (0, _uiApi.useMemo)(() => ({
      chartOptions: (0, _ChartOptionsFn.crChartOptions)(selectProps, chartsType, _mapFrequency),
      ...(0, _crDateConfig.default)(_mapFrequency, _mapDateDf, loadId)
    }), [_mapFrequency, _mapDateDf, selectProps, chartsType, loadId])

    /*eslint-disable react-hooks/exhaustive-deps */,
    setChartConfigFromItem = (0, _uiApi.useMemo)(() => item => {
      const [_mapFrequency, _mapDateDf] = _getChartConfigFromItem(item, mapFrequency, mapDateDf);
      setChartConfig(prevState => _isRequireUpdateChartConfig(prevState, _mapFrequency, _mapDateDf) ? (onUpdateChartConfig(), {
        _mapFrequency,
        _mapDateDf
      }) : prevState);
    }, []);
  // mapFrequency, mapDateDf, onUpdateChartConfig
  /*eslint-enable react-hooks/exhaustive-deps */

  return [chartOptions, dateDefault, dateOptions, setChartConfigFromItem];
};
var _default = useChartConfig;
exports.default = _default;
//# sourceMappingURL=useChartConfig.js.map