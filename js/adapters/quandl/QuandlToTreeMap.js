"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.fCreateTreeMapConfig = void 0;

var _big = _interopRequireDefault(require("big.js"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _Type = require("../../constants/Type");

var _Chart = _interopRequireDefault(require("../../charts/Chart"));

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _StackedFn = require("./StackedFn");

var _QuandlFn = _interopRequireDefault(require("./QuandlFn2"));

var _fnCreateYearTotals = function _fnCreateYearTotals(jsonData, items) {
  return jsonData.map(function (year) {
    return (0, _StackedFn.fnCalcTotal)(year, items);
  });
};

var _fnCreateDataAndTotal = function _fnCreateDataAndTotal(jsonData, items, bYearTotals) {
  if (jsonData === void 0) {
    jsonData = [];
  }

  if (items === void 0) {
    items = [];
  }

  if (bYearTotals === void 0) {
    bYearTotals = [];
  }

  var yearData = jsonData[0],
      _year = yearData[0] ? yearData[0].split('-')[0] : '',
      bTotal = bYearTotals[0] ? bYearTotals[0] : (0, _big["default"])('0.0');

  var data = [];
  items.forEach(function (item, itemIndex) {
    var value = item.value,
        caption = item.caption,
        _value = yearData[value];

    if (_value) {
      var _fnCreateSparkData = (0, _StackedFn.fnCreateSparkData)(jsonData, value, bYearTotals),
          sparkvalues = _fnCreateSparkData.sparkvalues,
          sparkpercent = _fnCreateSparkData.sparkpercent;

      data.push({
        sparkvalues: sparkvalues.reverse(),
        sparkpercent: sparkpercent.reverse(),
        year: _year,
        name: caption,
        nameFull: caption,
        value: _value
      });
    }
  });
  data.sort(_AdapterFn["default"].compareByValue).reverse();
  return {
    data: data,
    bTotal: bTotal
  };
};

var _fnCalcLevelAndSetPercent = function _fnCalcLevelAndSetPercent(data, bTotal) {
  var _bLevel = (0, _big["default"])('0.0'),
      level60 = 0,
      level90 = 0;

  data.forEach(function (point, pointIndex) {
    var value = point.value,
        name = point.name,
        percent = _QuandlFn["default"].createPercent({
      bValue: (0, _big["default"])(value),
      bTotal: bTotal
    }).toString();

    point.total = bTotal.toString();
    point.percent = percent;

    if (!_bLevel.gte('60.0')) {
      point.name = percent + " " + name;
      point.dataLabels = {
        style: {
          fontSize: '16px'
        }
      };
      level60 += 1;
    } else if (!_bLevel.gte('90.0')) {
      point.name = percent + " " + name.split(';')[0].substring(0, 9);
      level90 += 1;
    } else {
      point.name = percent;
    }

    _bLevel = _bLevel.plus(percent);
  });
  return {
    level60: level60,
    level90: level90
  };
};

var _fnSetColorToPoint = function _fnSetColorToPoint(data, level60, level90) {
  var period = _Chart["default"].COLOR_PERIOD,
      base1 = _Chart["default"].COLOR_BASE1,
      base2 = _Chart["default"].COLOR_BASE2;
  var deltaColor;
  data.forEach(function (point, pointIndex) {
    if (pointIndex < level60) {
      deltaColor = pointIndex * (period / level60);
      point.color = _Chart["default"].fCreateMonoColor(base1, deltaColor);
    } else if (pointIndex < level60 + level90) {
      deltaColor = (pointIndex - level60) * (period / level90);
      point.color = _Chart["default"].fCreateMonoColor(base2, deltaColor);
    } else {
      point.color = _Chart["default"].fnGetMonoColor(pointIndex - level60 - level90);
    }
  });
};

var fCreateTreeMapConfig = function fCreateTreeMapConfig(json, option) {
  var config = _ChartConfig["default"].fBaseTreeMapConfig(),
      _option$sliceItems = option.sliceItems,
      items100 = _option$sliceItems === void 0 ? [] : _option$sliceItems,
      _option$value = option.value,
      value = _option$value === void 0 ? '' : _option$value,
      zhSeriaId = value + "_" + _Type.ChartType.TREE_MAP,
      jsonData = json.dataset && json.dataset.data ? json.dataset.data : [],
      bYearTotals = _fnCreateYearTotals(jsonData, items100),
      _fnCreateDataAndTotal2 = _fnCreateDataAndTotal(jsonData, items100, bYearTotals),
      data = _fnCreateDataAndTotal2.data,
      bTotal = _fnCreateDataAndTotal2.bTotal,
      _fnCalcLevelAndSetPer = _fnCalcLevelAndSetPercent(data, bTotal),
      level60 = _fnCalcLevelAndSetPer.level60,
      level90 = _fnCalcLevelAndSetPer.level90,
      bPrevTotal = (0, _StackedFn.fnCalcTotal)(jsonData[1], items100),
      dateTo = jsonData[1][0] ? jsonData[1][0] : '';

  _fnSetColorToPoint(data, level60, level90);

  config.chart.height = _Chart["default"].STACKED_HEIGHT;
  var yearTitle = jsonData[0] && jsonData[0][0] ? jsonData[0][0].split('-')[0] : '';
  option.title = yearTitle + ":" + option.title;

  _QuandlFn["default"].setTitleToConfig(config, option);

  Object.assign(config, {
    series: [_ChartConfig["default"].fCreateTreeMapSeria(zhSeriaId, data)],
    valueMoving: (0, _StackedFn.crValueMoving)(bTotal, yearTitle, bPrevTotal, dateTo),
    zhConfig: (0, _StackedFn.crZhConfig)(option, zhSeriaId),
    info: _QuandlFn["default"].createDatasetInfo(json)
  });
  return {
    config: config
  };
};

exports.fCreateTreeMapConfig = fCreateTreeMapConfig;
//# sourceMappingURL=QuandlToTreeMap.js.map