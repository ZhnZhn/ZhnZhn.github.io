"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _big = _interopRequireDefault(require("big.js"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _Type = require("../../constants/Type");

var _Chart = _interopRequireDefault(require("../../charts/Chart"));

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _StackedFn = require("./StackedFn");

var _QuandlFn = _interopRequireDefault(require("./QuandlFn"));

var _fnStacked = _interopRequireDefault(require("./fnStacked"));

var _assign = Object.assign,
    crValueMoving = _fnStacked["default"].crValueMoving,
    crZhConfig = _fnStacked["default"].crZhConfig,
    compareByValue = _AdapterFn["default"].compareByValue,
    createPercent = _QuandlFn["default"].createPercent,
    setTitleToConfig = _QuandlFn["default"].setTitleToConfig,
    createDatasetInfo = _QuandlFn["default"].createDatasetInfo,
    COLOR_PERIOD = _Chart["default"].COLOR_PERIOD,
    COLOR_BASE1 = _Chart["default"].COLOR_BASE1,
    COLOR_BASE2 = _Chart["default"].COLOR_BASE2,
    crMonoColor = _Chart["default"].crMonoColor,
    getMonoColor = _Chart["default"].getMonoColor,
    crTreeMapConfig = _ChartConfig["default"].crTreeMapConfig,
    crTreeMapSeria = _ChartConfig["default"].crTreeMapSeria;

var _crYearTotals = function _crYearTotals(jsonData, items) {
  return jsonData.map(function (year) {
    return (0, _StackedFn.fnCalcTotal)(year, items);
  });
};

var _crDataAndTotal = function _crDataAndTotal(jsonData, items, bYearTotals) {
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
  items.forEach(function (item) {
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
  data.sort(compareByValue).reverse();
  return {
    data: data,
    bTotal: bTotal
  };
};

var _calcLevelAndSetPercent = function _calcLevelAndSetPercent(data, bTotal) {
  var _bLevel = (0, _big["default"])('0.0'),
      level60 = 0,
      level90 = 0;

  data.forEach(function (point) {
    var value = point.value,
        name = point.name,
        percent = createPercent({
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

var _setColorToPoint = function _setColorToPoint(data, level60, level90) {
  var period = COLOR_PERIOD,
      base1 = COLOR_BASE1,
      base2 = COLOR_BASE2;
  var deltaColor;
  data.forEach(function (point, pointIndex) {
    if (pointIndex < level60) {
      deltaColor = pointIndex * (period / level60);
      point.color = crMonoColor(base1, deltaColor);
    } else if (pointIndex < level60 + level90) {
      deltaColor = (pointIndex - level60) * (period / level90);
      point.color = crMonoColor(base2, deltaColor);
    } else {
      point.color = getMonoColor(pointIndex - level60 - level90);
    }
  });
};

var toTreeMap = function toTreeMap(json, option) {
  var config = crTreeMapConfig(),
      _option$sliceItems = option.sliceItems,
      items100 = _option$sliceItems === void 0 ? [] : _option$sliceItems,
      _option$value = option.value,
      value = _option$value === void 0 ? '' : _option$value,
      id = value + "_" + _Type.ChartType.TREE_MAP,
      jsonData = json.dataset.data,
      bYearTotals = _crYearTotals(jsonData, items100),
      _crDataAndTotal2 = _crDataAndTotal(jsonData, items100, bYearTotals),
      data = _crDataAndTotal2.data,
      bTotal = _crDataAndTotal2.bTotal,
      _calcLevelAndSetPerce = _calcLevelAndSetPercent(data, bTotal),
      level60 = _calcLevelAndSetPerce.level60,
      level90 = _calcLevelAndSetPerce.level90,
      bPrevTotal = (0, _StackedFn.fnCalcTotal)(jsonData[1], items100),
      dateTo = jsonData[1][0] ? jsonData[1][0] : '';

  _setColorToPoint(data, level60, level90);

  var yearTitle = jsonData[0] && jsonData[0][0] ? jsonData[0][0].split('-')[0] : '';
  option.title = yearTitle + ":" + option.title;
  setTitleToConfig(config, option);

  _assign(config, {
    series: [crTreeMapSeria(data)],
    valueMoving: crValueMoving(bTotal, yearTitle, bPrevTotal, dateTo),
    zhConfig: crZhConfig(option, id),
    info: createDatasetInfo(json)
  });

  return {
    config: config
  };
};

var _default = toTreeMap;
exports["default"] = _default;
//# sourceMappingURL=toTreeMap.js.map