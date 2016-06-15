'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fCreateStackedAreaConfig = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _big = require('big.js');

var _big2 = _interopRequireDefault(_big);

var _Type = require('../constants/Type');

var _Chart = require('../constants/Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _ChartConfig = require('../constants/ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

var _QuandlAdapterFn = require('./QuandlAdapterFn');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _fnCalcTotal = function _fnCalcTotal() {
  var items = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var jsonData = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

  var _bTotal = (0, _big2.default)('0.0');
  for (var i = 0, max = items.length; i < max; i++) {
    var y = jsonData[items[i].value];
    if (y) {
      _bTotal = _bTotal.plus(y);
    }
  }
  return _bTotal;
};

var _fnDataAndTotalFromItems = function _fnDataAndTotalFromItems(items, jsonData) {
  var _data = [],
      _bTotal = (0, _big2.default)('0.0');

  items.forEach(function (item, index) {
    var y = jsonData[item.value];
    if (y) {
      //const _nameFull = item.caption.replace(/;/g, '<br/>')
      var _name = item.caption.split(';')[0].substring(0, 9);
      _data.push({
        name: _name,
        nameFull: item.caption,
        y: y,
        _jsonIndex: item.value
      });
      _bTotal = _bTotal.plus(y);
    }
  });

  _data = _lodash2.default.sortBy(_data, 'y').reverse();

  return { _data: _data, _bTotal: _bTotal };
};

var _fnDataTopPercent = function _fnDataTopPercent(data, bTotal, percent) {
  var _dataTopPercent = [],
      _bTotal90 = bTotal.times(percent);
  var _bArrTotal = (0, _big2.default)('0.0');
  for (var i = 0, max = data.length; i < max; i++) {
    var item = data[i];
    if (i === 0 || !_bArrTotal.gte(_bTotal90) || i === max - 1) {
      _dataTopPercent.push(item);
    } else {
      break;
    }

    _bArrTotal = _bArrTotal.plus(item.y);
  }

  return _dataTopPercent;
};

var _fnInitSeries = function _fnInitSeries(items, zhSeriaId) {
  return items.map(function (item, itemIndex) {
    var color = _Chart2.default.fnGetMonoColor(itemIndex);
    var name = item.name;

    return _ChartConfig2.default.fStackAreaSeria({ zhSeriaId: zhSeriaId, name: name, color: color });
  });
};

var _fnCreateStackedSeries = function _fnCreateStackedSeries(jsonData, items100, items90, zhSeriaId) {
  var series = _fnInitSeries(items90, zhSeriaId),
      categories = [],
      dataOther = [];

  jsonData = jsonData.reverse();
  jsonData.forEach(function (yearData, i) {
    var yearTotal100 = _fnCalcTotal(items100, yearData),
        yearTotal90 = (0, _big2.default)('0.0');
    categories.push(yearData[0].split('-')[0]);
    items90.forEach(function (item, itemIndex) {
      var y = yearData[item._jsonIndex];
      series[itemIndex].data.push({
        y: y,
        nameFull: item.nameFull
      });
      if (y) {
        yearTotal90 = yearTotal90.plus(y);
      }
    });
    dataOther.push({
      nameFull: 'Other',
      y: parseInt(yearTotal100.minus(yearTotal90).toString(), 10)
    });
  });

  series.push(_ChartConfig2.default.fStackAreaSeria({
    zhSeriaId: zhSeriaId,
    name: 'Other',
    data: dataOther,
    color: 'gray'
  }));

  return { series: series, categories: categories };
};

var fCreateStackedAreaConfig = exports.fCreateStackedAreaConfig = function fCreateStackedAreaConfig(json, option) {
  var config = _ChartConfig2.default.fBaseStackAreaConfig();
  var _option$sliceItems = option.sliceItems;
  var items100 = _option$sliceItems === undefined ? [] : _option$sliceItems;
  var _option$value = option.value;
  var value = _option$value === undefined ? '' : _option$value;
  var zhSeriaId = value + '_' + _Type.ChartType.STACKED_AREA;
  var jsonData = json.dataset && json.dataset.data ? json.dataset.data : [];

  var _fnDataAndTotalFromIt = _fnDataAndTotalFromItems(items100, jsonData[0]);

  var _data = _fnDataAndTotalFromIt._data;
  var _bTotal = _fnDataAndTotalFromIt._bTotal;
  var items90 = _fnDataTopPercent(_data, _bTotal, 0.9);
  var _bPrevTotal = _fnCalcTotal(items100, jsonData[1]);

  var _fnCreateStackedSerie = _fnCreateStackedSeries(jsonData, items100, items90, zhSeriaId);

  var series = _fnCreateStackedSerie.series;
  var categories = _fnCreateStackedSerie.categories;


  config.series = series;
  config.xAxis.categories = categories;
  config.chart.height = 500;

  (0, _QuandlAdapterFn.fnSetTitleToConfig)(config, option);

  config.valueMoving = (0, _QuandlAdapterFn.fnCreateValueMoving)({
    bNowValue: _bTotal,
    bPrevValue: _bPrevTotal
  });

  config.zhConfig = (0, _QuandlAdapterFn.fnCreateZhConfig)(option);
  config.zhConfig.id = zhSeriaId;
  config.zhConfig.isWithoutAdd = true;
  config.zhConfig.isWithoutIndicator = true;
  config.info = (0, _QuandlAdapterFn.fnCreateDatasetInfo)(json);

  return { config: config };
};
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\QuandlAdapterToStackedArea.js.map