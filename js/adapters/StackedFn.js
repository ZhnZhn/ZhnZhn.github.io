'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crZhConfig = exports.crValueMoving = exports.fnCreateSparkData = exports.fnCreateStackedConfig = exports.fnCalcTotal = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _rFactorySeria2;

var _big = require('big.js');

var _big2 = _interopRequireDefault(_big);

var _AdapterFn = require('./AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

var _Type = require('../constants/Type');

var _Chart = require('../charts/Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _ChartConfig = require('../charts/ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

var _QuandlFn = require('./QuandlFn2');

var _QuandlFn2 = _interopRequireDefault(_QuandlFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _rFactorySeria = (_rFactorySeria2 = {}, (0, _defineProperty3.default)(_rFactorySeria2, _Type.ChartType.STACKED_AREA, _ChartConfig2.default.fStackAreaSeria), (0, _defineProperty3.default)(_rFactorySeria2, _Type.ChartType.STACKED_AREA_PERCENT, _ChartConfig2.default.fStackAreaSeria), (0, _defineProperty3.default)(_rFactorySeria2, _Type.ChartType.STACKED_COLUMN, _ChartConfig2.default.fStackedColumnSeria), (0, _defineProperty3.default)(_rFactorySeria2, _Type.ChartType.STACKED_COLUMN_PERCENT, _ChartConfig2.default.fStackedColumnSeria), _rFactorySeria2);

var fnCalcTotal = exports.fnCalcTotal = function fnCalcTotal() {
  var jsonData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var items = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var _bTotal = (0, _big2.default)('0.0');
  for (var i = 0, max = items.length; i < max; i++) {
    var y = jsonData[items[i].value];
    if (y) {
      _bTotal = _bTotal.plus(y);
    }
  }
  return _bTotal;
};

var _fnCreateReferenceDataAndTotal = function _fnCreateReferenceDataAndTotal(jsonData, items) {
  var _data = [],
      _bTotal = (0, _big2.default)('0.0');

  items.forEach(function (item) {
    var caption = item.caption,
        value = item.value,
        y = jsonData[value];

    if (y) {
      var _arr = caption.split(';'),
          _name = _arr[0] ? _arr[0].substring(0, 9) : caption;
      _data.push({
        name: _name,
        nameFull: caption,
        y: y,
        _jsonIndex: value
      });
      _bTotal = _bTotal.plus(y);
    }
  });

  _data.sort(_AdapterFn2.default.compareByY).reverse();

  return { referenceData: _data, bTotal: _bTotal };
};

var _fnCreateDataTopPercent = function _fnCreateDataTopPercent(data, bTotal, percent) {
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

var _fnInitSeries = function _fnInitSeries(_ref) {
  var items = _ref.items,
      zhSeriaId = _ref.zhSeriaId,
      chartType = _ref.chartType,
      fSeria = _ref.fSeria;

  return items.map(function (item, itemIndex) {
    var color = _Chart2.default.fnGetMonoColor(itemIndex),
        name = item.name;

    return fSeria({ zhSeriaId: zhSeriaId, name: name, color: color });
  });
};

var _fnCalcPercent = function _fnCalcPercent() {
  var bTotal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _big2.default)('0.0');
  var bValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _big2.default)('0.0');

  return !bTotal.eq((0, _big2.default)(0.0)) ? bValue.times(100).div(bTotal).abs().toFixed(2) + '%' : (0, _big2.default)(0.0) + '%';
};

var _fnCreateStackedSeries = function _fnCreateStackedSeries(_ref2) {
  var jsonData = _ref2.jsonData,
      items100 = _ref2.items100,
      items90 = _ref2.items90,
      zhSeriaId = _ref2.zhSeriaId,
      chartType = _ref2.chartType,
      stacking = _ref2.stacking;

  var fSeria = _rFactorySeria[chartType],
      series = _fnInitSeries({ items: items90, zhSeriaId: zhSeriaId, chartType: chartType, fSeria: fSeria }),
      categories = [],
      dataOther = [];

  jsonData = jsonData.reverse();
  jsonData.forEach(function (yearData, i) {
    var yearTotal100 = fnCalcTotal(yearData, items100),
        yearTotal90 = (0, _big2.default)('0.0'),
        isFullYearData = true;
    items90.forEach(function (item, itemIndex) {
      var y = yearData[item._jsonIndex],
          percent = y ? _fnCalcPercent(yearTotal100, (0, _big2.default)(y)) : '0.0%';
      series[itemIndex].data.push({
        y: y,
        nameFull: item.nameFull,
        percent: percent,
        total: parseInt(yearTotal100.toString(), 10)
      });
      if (y) {
        yearTotal90 = yearTotal90.plus(y);
      } else {
        isFullYearData = false;
      }
    });
    if (stacking === 'percent' && !isFullYearData && categories.length === 0) {
      items90.forEach(function (item, itemIndex) {
        series[itemIndex].data = [];
      });
    } else {
      categories.push(yearData[0].split('-')[0]);
      var yOther = parseInt(yearTotal100.minus(yearTotal90).toString(), 10);
      dataOther.push({
        y: yOther,
        nameFull: 'Other',
        percent: _fnCalcPercent(yearTotal100, (0, _big2.default)(yOther)),
        total: parseInt(yearTotal100.toString(), 10)
      });
    }
  });

  series.push(fSeria({
    zhSeriaId: zhSeriaId,
    name: 'Other',
    data: dataOther,
    color: 'gray'
  }));

  return { series: series, categories: categories };
};

var fnCreateStackedConfig = exports.fnCreateStackedConfig = function fnCreateStackedConfig(_ref3) {
  var jsonData = _ref3.jsonData,
      items100 = _ref3.items100,
      zhSeriaId = _ref3.zhSeriaId,
      _ref3$chartType = _ref3.chartType,
      chartType = _ref3$chartType === undefined ? _Type.ChartType.STACKED_AREA : _ref3$chartType,
      _ref3$stacking = _ref3.stacking,
      stacking = _ref3$stacking === undefined ? 'normal' : _ref3$stacking;

  var _fnCreateReferenceDat = _fnCreateReferenceDataAndTotal(jsonData[0], items100),
      referenceData = _fnCreateReferenceDat.referenceData,
      bTotal = _fnCreateReferenceDat.bTotal,
      items90 = _fnCreateDataTopPercent(referenceData, bTotal, 0.9),
      bPrevTotal = fnCalcTotal(jsonData[1], items100),
      dateTo = jsonData[1][0] ? jsonData[1][0] : '',
      _fnCreateStackedSerie = _fnCreateStackedSeries({
    jsonData: jsonData, items100: items100, items90: items90, zhSeriaId: zhSeriaId, chartType: chartType, stacking: stacking
  }),
      series = _fnCreateStackedSerie.series,
      categories = _fnCreateStackedSerie.categories,
      date = categories && categories.length > 1 ? categories[categories.length - 1] : '';

  return { bNowTotal: bTotal, date: date, bPrevTotal: bPrevTotal, dateTo: dateTo, series: series, categories: categories };
};

var fnCreateSparkData = exports.fnCreateSparkData = function fnCreateSparkData(jsonData, itemIndex, bYearTotals) {
  var sparkvalues = [],
      sparkpercent = [];

  jsonData.forEach(function (yearData, yearIndex) {
    sparkvalues.push(yearData[itemIndex]);
    if (yearData[itemIndex]) {
      sparkpercent.push(parseFloat(_QuandlFn2.default.createPercent({
        bValue: (0, _big2.default)(yearData[itemIndex]),
        bTotal: bYearTotals[yearIndex]
      }), 10));
    } else {
      sparkpercent.push(null);
    }
  });

  return { sparkvalues: sparkvalues, sparkpercent: sparkpercent };
};

var crValueMoving = exports.crValueMoving = function crValueMoving(bNowTotal, date, bPrevTotal, dateTo) {
  return Object.assign(_QuandlFn2.default.createValueMoving({
    bNowValue: bNowTotal,
    bPrevValue: bPrevTotal
  }), {
    date: date,
    dateTo: dateTo.split('-')[0],
    valueTo: _ChartConfig2.default.fnNumberFormat(bPrevTotal),
    isDenyToChange: true
  });
};

var crZhConfig = exports.crZhConfig = function crZhConfig(option, zhSeriaId) {
  return Object.assign(_QuandlFn2.default.createZhConfig(option), {
    id: zhSeriaId,
    isWithoutAdd: true,
    isWithoutIndicator: true
  });
};
//# sourceMappingURL=StackedFn.js.map