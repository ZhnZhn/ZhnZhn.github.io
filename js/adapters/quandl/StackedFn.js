"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.fnCreateStackedConfig = exports.fnCreateSparkData = exports.fnCalcTotal = void 0;

var _big = _interopRequireDefault(require("big.js"));

var _compareByFn = require("../compareByFn");

var _ChartType = require("../../constants/ChartType");

var _Chart = _interopRequireDefault(require("../../charts/Chart"));

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _QuandlFn = _interopRequireDefault(require("./QuandlFn"));

const {
  crStackedAreaSeria,
  crStackedColumnSeria
} = _ChartConfig.default;
const _rFactorySeria = {
  [_ChartType.CHT_STACKED_AREA]: crStackedAreaSeria,
  [_ChartType.CHT_STACKED_AREA_PERCENT]: crStackedAreaSeria,
  [_ChartType.CHT_STACKED_COLUMN]: crStackedColumnSeria,
  [_ChartType.CHT_STACKED_COLUMN_PERCENT]: crStackedColumnSeria
};

const fnCalcTotal = function (jsonData, items) {
  if (jsonData === void 0) {
    jsonData = [];
  }

  if (items === void 0) {
    items = [];
  }

  let _bTotal = (0, _big.default)('0.0');

  for (let i = 0, max = items.length; i < max; i++) {
    let y = jsonData[items[i].value];

    if (y) {
      _bTotal = _bTotal.plus(y);
    }
  }

  return _bTotal;
};

exports.fnCalcTotal = fnCalcTotal;

const _fnCreateReferenceDataAndTotal = function (jsonData, items) {
  let _data = [],
      _bTotal = (0, _big.default)('0.0');

  items.forEach(item => {
    const {
      caption,
      value
    } = item,
          y = jsonData[value];

    if (y) {
      const _arr = caption.split(';'),
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

  _data.sort(_compareByFn.compareByY).reverse();

  return {
    referenceData: _data,
    bTotal: _bTotal
  };
};

const _fnCreateDataTopPercent = function (data, bTotal, percent) {
  const _dataTopPercent = [],
        _bTotal90 = bTotal.times(percent);

  let _bArrTotal = (0, _big.default)('0.0');

  for (let i = 0, max = data.length; i < max; i++) {
    let item = data[i];

    if (i === 0 || !_bArrTotal.gte(_bTotal90) || i === max - 1) {
      _dataTopPercent.push(item);
    } else {
      break;
    }

    _bArrTotal = _bArrTotal.plus(item.y);
  }

  return _dataTopPercent;
};

const _fnInitSeries = function (_ref) {
  let {
    items,
    chartType,
    fSeria
  } = _ref;
  return items.map((item, itemIndex) => {
    const color = _Chart.default.getMonoColor(itemIndex),
          {
      name
    } = item;

    return fSeria({
      name,
      color
    });
  });
};

const _fnCalcPercent = function (bTotal, bValue) {
  if (bTotal === void 0) {
    bTotal = (0, _big.default)('0.0');
  }

  if (bValue === void 0) {
    bValue = (0, _big.default)('0.0');
  }

  return !bTotal.eq((0, _big.default)(0.0)) ? bValue.times(100).div(bTotal).abs().toFixed(2) + '%' : (0, _big.default)(0.0) + '%';
};

const _fnCreateStackedSeries = function (_ref2) {
  let {
    jsonData,
    items100,
    items90,
    chartType,
    stacking
  } = _ref2;

  const fSeria = _rFactorySeria[chartType],
        series = _fnInitSeries({
    items: items90,
    chartType,
    fSeria
  }),
        categories = [],
        dataOther = [];

  jsonData = jsonData.reverse();
  jsonData.forEach((yearData, i) => {
    let yearTotal100 = fnCalcTotal(yearData, items100),
        yearTotal90 = (0, _big.default)('0.0'),
        isFullYearData = true;
    items90.forEach((item, itemIndex) => {
      const y = yearData[item._jsonIndex],
            percent = y ? _fnCalcPercent(yearTotal100, (0, _big.default)(y)) : '0.0%';
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
      items90.forEach((item, itemIndex) => {
        series[itemIndex].data = [];
      });
    } else {
      categories.push(yearData[0].split('-')[0]);
      const yOther = parseInt(yearTotal100.minus(yearTotal90).toString(), 10);
      dataOther.push({
        y: yOther,
        nameFull: 'Other',
        percent: _fnCalcPercent(yearTotal100, (0, _big.default)(yOther)),
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
    series,
    categories
  };
};

const fnCreateStackedConfig = function (_ref3) {
  let {
    jsonData,
    items100,
    chartType = _ChartType.CHT_STACKED_AREA,
    stacking = 'normal'
  } = _ref3;

  const {
    referenceData,
    bTotal
  } = _fnCreateReferenceDataAndTotal(jsonData[0], items100),
        items90 = _fnCreateDataTopPercent(referenceData, bTotal, 0.9),
        bPrevTotal = fnCalcTotal(jsonData[1], items100),
        dateTo = jsonData[1][0] ? jsonData[1][0] : '',
        {
    series,
    categories
  } = _fnCreateStackedSeries({
    jsonData,
    items100,
    items90,
    chartType,
    stacking
  }),
        date = categories && categories.length > 1 ? categories[categories.length - 1] : '';

  return {
    bNowTotal: bTotal,
    date,
    bPrevTotal,
    dateTo,
    series,
    categories
  };
};

exports.fnCreateStackedConfig = fnCreateStackedConfig;

const fnCreateSparkData = function (jsonData, itemIndex, bYearTotals) {
  const sparkvalues = [],
        sparkpercent = [];
  jsonData.forEach((yearData, yearIndex) => {
    sparkvalues.push(yearData[itemIndex]);

    if (yearData[itemIndex]) {
      sparkpercent.push(parseFloat(_QuandlFn.default.createPercent({
        bValue: (0, _big.default)(yearData[itemIndex]),
        bTotal: bYearTotals[yearIndex]
      }), 10));
    } else {
      sparkpercent.push(null);
    }
  });
  return {
    sparkvalues,
    sparkpercent
  };
};

exports.fnCreateSparkData = fnCreateSparkData;
//# sourceMappingURL=StackedFn.js.map