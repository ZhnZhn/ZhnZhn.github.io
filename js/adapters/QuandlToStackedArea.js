'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fCreateStackedAreaConfig = undefined;

var _Type = require('../constants/Type');

var _Chart = require('../constants/Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _ChartConfig = require('../constants/ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

var _StackedFn = require('./StackedFn');

var _QuandlFn = require('./QuandlFn');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fCreateStackedAreaConfig = exports.fCreateStackedAreaConfig = function fCreateStackedAreaConfig(json, option) {
  var config = _ChartConfig2.default.fBaseStackAreaConfig();
  var _option$sliceItems = option.sliceItems;
  var items100 = _option$sliceItems === undefined ? [] : _option$sliceItems;
  var _option$value = option.value;
  var value = _option$value === undefined ? '' : _option$value;
  var zhSeriaId = value + '_' + _Type.ChartType.STACKED_AREA;
  var jsonData = json.dataset && json.dataset.data ? json.dataset.data : [];
  var chartType = _Type.ChartType.STACKED_AREA;

  var _fnCreateStackedConfi = (0, _StackedFn.fnCreateStackedConfig)({ jsonData: jsonData, items100: items100, zhSeriaId: zhSeriaId, chartType: chartType });

  var bNowTotal = _fnCreateStackedConfi.bNowTotal;
  var bPrevTotal = _fnCreateStackedConfi.bPrevTotal;
  var series = _fnCreateStackedConfi.series;
  var categories = _fnCreateStackedConfi.categories;


  config.series = series;
  config.xAxis.categories = categories;
  config.chart.height = _Chart2.default.STACKED_HEIGHT;

  (0, _QuandlFn.fnSetTitleToConfig)(config, option);

  config.valueMoving = (0, _QuandlFn.fnCreateValueMoving)({
    bNowValue: bNowTotal,
    bPrevValue: bPrevTotal
  });

  config.zhConfig = (0, _QuandlFn.fnCreateZhConfig)(option);
  config.zhConfig.id = zhSeriaId;
  config.zhConfig.isWithoutAdd = true;
  config.zhConfig.isWithoutIndicator = true;
  config.info = (0, _QuandlFn.fnCreateDatasetInfo)(json);

  return { config: config };
};
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\QuandlToStackedArea.js.map