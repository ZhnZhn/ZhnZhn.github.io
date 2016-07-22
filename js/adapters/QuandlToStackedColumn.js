'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.fCreateStackedColumnConfig = undefined;

var _Type = require('../constants/Type');

var _Chart = require('../charts/Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _ChartConfig = require('../charts/ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

var _StackedFn = require('./StackedFn');

var _QuandlFn = require('./QuandlFn2');

var _QuandlFn2 = _interopRequireDefault(_QuandlFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fCreateStackedColumnConfig = exports.fCreateStackedColumnConfig = function fCreateStackedColumnConfig(json, option) {
   var chartType = option.seriaType;
   var stacking = chartType === _Type.ChartType.STACKED_COLUMN_PERCENT ? 'percent' : 'normal';
   var PERCENT = stacking === 'percent' ? ':PERCENT' : '';
   var config = _ChartConfig2.default.fBaseStackedColumnConfig({ stacking: stacking });
   var _option$sliceItems = option.sliceItems;
   var items100 = _option$sliceItems === undefined ? [] : _option$sliceItems;
   var _option$value = option.value;
   var value = _option$value === undefined ? '' : _option$value;
   var zhSeriaId = value + '_' + chartType;
   var jsonData = json.dataset && json.dataset.data ? json.dataset.data : [];

   var _fnCreateStackedConfi = (0, _StackedFn.fnCreateStackedConfig)({ jsonData: jsonData, items100: items100, zhSeriaId: zhSeriaId, chartType: chartType, stacking: stacking });

   var bNowTotal = _fnCreateStackedConfi.bNowTotal;
   var bPrevTotal = _fnCreateStackedConfi.bPrevTotal;
   var series = _fnCreateStackedConfi.series;
   var categories = _fnCreateStackedConfi.categories;


   config.series = series;
   config.xAxis.categories = categories;
   config.chart.height = _Chart2.default.STACKED_HEIGHT;

   option.title = '' + option.title + PERCENT;
   _QuandlFn2.default.setTitleToConfig(config, option);

   config.valueMoving = _QuandlFn2.default.createValueMoving({
      bNowValue: bNowTotal,
      bPrevValue: bPrevTotal
   });
   config.valueMoving.date = categories && categories.length > 1 ? categories[categories.length - 1] : '';

   config.zhConfig = _QuandlFn2.default.createZhConfig(option);
   config.zhConfig.id = zhSeriaId;
   config.zhConfig.isWithoutAdd = true;
   config.zhConfig.isWithoutIndicator = true;
   config.info = _QuandlFn2.default.createDatasetInfo(json);

   return { config: config };
};
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\QuandlToStackedColumn.js.map