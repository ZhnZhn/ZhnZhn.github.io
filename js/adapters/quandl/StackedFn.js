"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.fnCreateSparkData = exports.fnCreateStackedConfig = exports.fnCalcTotal = void 0;

var _big = _interopRequireDefault(require("big.js"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _Type = require("../../constants/Type");

var _Chart = _interopRequireDefault(require("../../charts/Chart"));

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _QuandlFn = _interopRequireDefault(require("./QuandlFn"));

var _rFactorySeria2;

var crStackedAreaSeria = _ChartConfig["default"].crStackedAreaSeria,
    crStackedColumnSeria = _ChartConfig["default"].crStackedColumnSeria;

var _rFactorySeria = (_rFactorySeria2 = {}, _rFactorySeria2[_Type.ChartType.STACKED_AREA] = crStackedAreaSeria, _rFactorySeria2[_Type.ChartType.STACKED_AREA_PERCENT] = crStackedAreaSeria, _rFactorySeria2[_Type.ChartType.STACKED_COLUMN] = crStackedColumnSeria, _rFactorySeria2[_Type.ChartType.STACKED_COLUMN_PERCENT] = crStackedColumnSeria, _rFactorySeria2);

var fnCalcTotal = function fnCalcTotal(jsonData, items) {
  if (jsonData === void 0) {
    jsonData = [];
  }

  if (items === void 0) {
    items = [];
  }

  var _bTotal = (0, _big["default"])('0.0');

  for (var i = 0, max = items.length; i < max; i++) {
    var y = jsonData[items[i].value];

    if (y) {
      _bTotal = _bTotal.plus(y);
    }
  }

  return _bTotal;
};

exports.fnCalcTotal = fnCalcTotal;

var _fnCreateReferenceDataAndTotal = function _fnCreateReferenceDataAndTotal(jsonData, items) {
  var _data = [],
      _bTotal = (0, _big["default"])('0.0');

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

  _data.sort(_AdapterFn["default"].compareByY).reverse();

  return {
    referenceData: _data,
    bTotal: _bTotal
  };
};

var _fnCreateDataTopPercent = function _fnCreateDataTopPercent(data, bTotal, percent) {
  var _dataTopPercent = [],
      _bTotal90 = bTotal.times(percent);

  var _bArrTotal = (0, _big["default"])('0.0');

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
      chartType = _ref.chartType,
      fSeria = _ref.fSeria;
  return items.map(function (item, itemIndex) {
    var color = _Chart["default"].getMonoColor(itemIndex),
        name = item.name;

    return fSeria({
      name: name,
      color: color
    });
  });
};

var _fnCalcPercent = function _fnCalcPercent(bTotal, bValue) {
  if (bTotal === void 0) {
    bTotal = (0, _big["default"])('0.0');
  }

  if (bValue === void 0) {
    bValue = (0, _big["default"])('0.0');
  }

  return !bTotal.eq((0, _big["default"])(0.0)) ? bValue.times(100).div(bTotal).abs().toFixed(2) + '%' : (0, _big["default"])(0.0) + '%';
};

var _fnCreateStackedSeries = function _fnCreateStackedSeries(_ref2) {
  var jsonData = _ref2.jsonData,
      items100 = _ref2.items100,
      items90 = _ref2.items90,
      chartType = _ref2.chartType,
      stacking = _ref2.stacking;

  var fSeria = _rFactorySeria[chartType],
      series = _fnInitSeries({
    items: items90,
    chartType: chartType,
    fSeria: fSeria
  }),
      categories = [],
      dataOther = [];

  jsonData = jsonData.reverse();
  jsonData.forEach(function (yearData, i) {
    var yearTotal100 = fnCalcTotal(yearData, items100),
        yearTotal90 = (0, _big["default"])('0.0'),
        isFullYearData = true;
    items90.forEach(function (item, itemIndex) {
      var y = yearData[item._jsonIndex],
          percent = y ? _fnCalcPercent(yearTotal100, (0, _big["default"])(y)) : '0.0%';
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
        percent: _fnCalcPercent(yearTotal100, (0, _big["default"])(yOther)),
        total: parseInt(yearTotal100.toString(), 10)
      });
    }
  });
  series.push(fSeria({
    name: 'Other',
    data: dataOther,
    color: 'gray'
  }));
  return {
    series: series,
    categories: categories
  };
};

var fnCreateStackedConfig = function fnCreateStackedConfig(_ref3) {
  var jsonData = _ref3.jsonData,
      items100 = _ref3.items100,
      _ref3$chartType = _ref3.chartType,
      chartType = _ref3$chartType === void 0 ? _Type.ChartType.STACKED_AREA : _ref3$chartType,
      _ref3$stacking = _ref3.stacking,
      stacking = _ref3$stacking === void 0 ? 'normal' : _ref3$stacking;

  var _fnCreateReferenceDat = _fnCreateReferenceDataAndTotal(jsonData[0], items100),
      referenceData = _fnCreateReferenceDat.referenceData,
      bTotal = _fnCreateReferenceDat.bTotal,
      items90 = _fnCreateDataTopPercent(referenceData, bTotal, 0.9),
      bPrevTotal = fnCalcTotal(jsonData[1], items100),
      dateTo = jsonData[1][0] ? jsonData[1][0] : '',
      _fnCreateStackedSerie = _fnCreateStackedSeries({
    jsonData: jsonData,
    items100: items100,
    items90: items90,
    chartType: chartType,
    stacking: stacking
  }),
      series = _fnCreateStackedSerie.series,
      categories = _fnCreateStackedSerie.categories,
      date = categories && categories.length > 1 ? categories[categories.length - 1] : '';

  return {
    bNowTotal: bTotal,
    date: date,
    bPrevTotal: bPrevTotal,
    dateTo: dateTo,
    series: series,
    categories: categories
  };
};

exports.fnCreateStackedConfig = fnCreateStackedConfig;

var fnCreateSparkData = function fnCreateSparkData(jsonData, itemIndex, bYearTotals) {
  var sparkvalues = [],
      sparkpercent = [];
  jsonData.forEach(function (yearData, yearIndex) {
    sparkvalues.push(yearData[itemIndex]);

    if (yearData[itemIndex]) {
      sparkpercent.push(parseFloat(_QuandlFn["default"].createPercent({
        bValue: (0, _big["default"])(yearData[itemIndex]),
        bTotal: bYearTotals[yearIndex]
      }), 10));
    } else {
      sparkpercent.push(null);
    }
  });
  return {
    sparkvalues: sparkvalues,
    sparkpercent: sparkpercent
  };
};

exports.fnCreateSparkData = fnCreateSparkData;
//# sourceMappingURL=StackedFn.js.map