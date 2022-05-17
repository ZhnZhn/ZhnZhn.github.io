"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _big = _interopRequireDefault(require("big.js"));

var _compareByFn = require("../compareByFn");

var _ChartType = require("../../constants/ChartType");

var _Chart = _interopRequireDefault(require("../../charts/Chart"));

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _StackedFn = require("./StackedFn");

var _QuandlFn = require("./QuandlFn");

var _fnStacked = _interopRequireDefault(require("./fnStacked"));

const _assign = Object.assign,
      {
  crValueMoving,
  crZhConfig
} = _fnStacked.default,
      {
  COLOR_PERIOD,
  COLOR_BASE1,
  COLOR_BASE2,
  crMonoColor,
  getMonoColor
} = _Chart.default,
      {
  crTreeMapConfig,
  crTreeMapSeria
} = _ChartConfig.default;

const _crYearTotals = (jsonData, items) => jsonData.map(year => (0, _StackedFn.calcTotal)(year, items));

const _crDataAndTotal = function (jsonData, items, bYearTotals) {
  if (jsonData === void 0) {
    jsonData = [];
  }

  if (items === void 0) {
    items = [];
  }

  if (bYearTotals === void 0) {
    bYearTotals = [];
  }

  const yearData = jsonData[0],
        _year = yearData[0] ? yearData[0].split('-')[0] : '',
        bTotal = bYearTotals[0] ? bYearTotals[0] : (0, _big.default)('0.0');

  let data = [];
  items.forEach(item => {
    const {
      value,
      caption
    } = item,
          _value = yearData[value];

    if (_value) {
      const {
        sparkvalues,
        sparkpercent
      } = (0, _StackedFn.crSparkData)(jsonData, value, bYearTotals);
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
  data.sort(_compareByFn.compareByValue).reverse();
  return {
    data,
    bTotal
  };
};

const _calcLevelAndSetPercent = (data, bTotal) => {
  let _bLevel = (0, _big.default)('0.0'),
      level60 = 0,
      level90 = 0;

  data.forEach(point => {
    const {
      value,
      name
    } = point,
          percent = (0, _QuandlFn.crPercent)({
      bValue: (0, _big.default)(value),
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
    level60,
    level90
  };
};

const _setColorToPoint = (data, level60, level90) => {
  const period = COLOR_PERIOD,
        base1 = COLOR_BASE1,
        base2 = COLOR_BASE2;
  let deltaColor;
  data.forEach((point, pointIndex) => {
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

const toTreeMap = (json, option) => {
  const config = crTreeMapConfig(),
        {
    sliceItems: items100 = [],
    value = ''
  } = option,
        id = value + "_" + _ChartType.CHT_TREE_MAP,
        jsonData = json.dataset.data,
        bYearTotals = _crYearTotals(jsonData, items100),
        {
    data,
    bTotal
  } = _crDataAndTotal(jsonData, items100, bYearTotals),
        {
    level60,
    level90
  } = _calcLevelAndSetPercent(data, bTotal),
        bPrevTotal = (0, _StackedFn.calcTotal)(jsonData[1], items100),
        dateTo = jsonData[1][0] ? jsonData[1][0] : '';

  _setColorToPoint(data, level60, level90);

  const yearTitle = jsonData[0] && jsonData[0][0] ? jsonData[0][0].split('-')[0] : '';
  option.title = yearTitle + ":" + option.title;
  (0, _QuandlFn.setTitleToConfig)(config, option);

  _assign(config, {
    series: [crTreeMapSeria(data)],
    valueMoving: crValueMoving(bTotal, yearTitle, bPrevTotal, dateTo),
    zhConfig: crZhConfig(option, id),
    info: (0, _QuandlFn.crDatasetInfo)(json)
  });

  return {
    config
  };
};

var _default = toTreeMap;
exports.default = _default;
//# sourceMappingURL=toTreeMap.js.map