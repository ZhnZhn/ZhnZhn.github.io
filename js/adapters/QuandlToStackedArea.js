'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fCreateStackedAreaConfig = undefined;

var _Type = require('../constants/Type');

var _Chart = require('../charts/Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _ChartConfig = require('../charts/ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

var _StackedFn = require('./StackedFn');

var _QuandlFn = require('./QuandlFn2');

var _QuandlFn2 = _interopRequireDefault(_QuandlFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fCreateStackedAreaConfig = exports.fCreateStackedAreaConfig = function fCreateStackedAreaConfig(json, option) {
  var chartType = option.seriaType,
      stacking = chartType === _Type.ChartType.STACKED_AREA_PERCENT ? 'percent' : 'normal',
      PERCENT = stacking === 'percent' ? ':PERCENT' : '',
      config = _ChartConfig2.default.fBaseStackAreaConfig({ stacking: stacking }),
      _option$sliceItems = option.sliceItems,
      items100 = _option$sliceItems === undefined ? [] : _option$sliceItems,
      _option$value = option.value,
      value = _option$value === undefined ? '' : _option$value,
      zhSeriaId = value + '_' + chartType,
      jsonData = json.dataset && json.dataset.data ? json.dataset.data : [],
      _fnCreateStackedConfi = (0, _StackedFn.fnCreateStackedConfig)({ jsonData: jsonData, items100: items100, zhSeriaId: zhSeriaId, chartType: chartType, stacking: stacking }),
      bNowTotal = _fnCreateStackedConfi.bNowTotal,
      date = _fnCreateStackedConfi.date,
      bPrevTotal = _fnCreateStackedConfi.bPrevTotal,
      dateTo = _fnCreateStackedConfi.dateTo,
      series = _fnCreateStackedConfi.series,
      categories = _fnCreateStackedConfi.categories;


  config.series = series;
  config.xAxis.categories = categories;
  config.chart.height = _Chart2.default.STACKED_HEIGHT;

  option.title = '' + option.title + PERCENT;
  _QuandlFn2.default.setTitleToConfig(config, option);

  config.valueMoving = (0, _StackedFn.crValueMoving)(bNowTotal, date, bPrevTotal, dateTo);
  config.zhConfig = (0, _StackedFn.crZhConfig)(option, zhSeriaId);

  config.info = _QuandlFn2.default.createDatasetInfo(json);

  return { config: config };
};
//# sourceMappingURL=QuandlToStackedArea.js.map