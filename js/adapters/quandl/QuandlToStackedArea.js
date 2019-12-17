"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.fCreateStackedAreaConfig = void 0;

var _Type = require("../../constants/Type");

var _Chart = _interopRequireDefault(require("../../charts/Chart"));

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _StackedFn = require("./StackedFn");

var _QuandlFn = _interopRequireDefault(require("./QuandlFn2"));

var fCreateStackedAreaConfig = function fCreateStackedAreaConfig(json, option) {
  var chartType = option.seriaType,
      stacking = chartType === _Type.ChartType.STACKED_AREA_PERCENT ? 'percent' : 'normal',
      PERCENT = stacking === 'percent' ? ':PERCENT' : '',
      config = _ChartConfig["default"].fBaseStackAreaConfig({
    stacking: stacking
  }),
      _option$sliceItems = option.sliceItems,
      items100 = _option$sliceItems === void 0 ? [] : _option$sliceItems,
      _option$value = option.value,
      value = _option$value === void 0 ? '' : _option$value,
      zhSeriaId = value + "_" + chartType,
      jsonData = json.dataset && json.dataset.data ? json.dataset.data : [],
      _fnCreateStackedConfi = (0, _StackedFn.fnCreateStackedConfig)({
    jsonData: jsonData,
    items100: items100,
    zhSeriaId: zhSeriaId,
    chartType: chartType,
    stacking: stacking
  }),
      bNowTotal = _fnCreateStackedConfi.bNowTotal,
      date = _fnCreateStackedConfi.date,
      bPrevTotal = _fnCreateStackedConfi.bPrevTotal,
      dateTo = _fnCreateStackedConfi.dateTo,
      series = _fnCreateStackedConfi.series,
      categories = _fnCreateStackedConfi.categories;

  config.series = series;
  config.xAxis.categories = categories;
  config.chart.height = _Chart["default"].STACKED_HEIGHT;
  option.title = "" + option.title + PERCENT;

  _QuandlFn["default"].setTitleToConfig(config, option);

  config.valueMoving = (0, _StackedFn.crValueMoving)(bNowTotal, date, bPrevTotal, dateTo);
  config.zhConfig = (0, _StackedFn.crZhConfig)(option, zhSeriaId);
  config.info = _QuandlFn["default"].createDatasetInfo(json);
  return {
    config: config
  };
};

exports.fCreateStackedAreaConfig = fCreateStackedAreaConfig;
//# sourceMappingURL=QuandlToStackedArea.js.map