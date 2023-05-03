"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.crStackedConfig = exports.crSparkData = exports.calcTotal = void 0;
var _big = _interopRequireDefault(require("big.js"));
var _compareByFn = require("../compareByFn");
var _ChartType = require("../../constants/ChartType");
var _MonoColorFn = require("../../charts/MonoColorFn");
var _StackedConfigFn = require("../../charts/StackedConfigFn");
var _NdlFn = require("./NdlFn");
const _rFactorySeria = {
  [_ChartType.CHT_STACKED_AREA]: _StackedConfigFn.crStackedAreaSeria,
  [_ChartType.CHT_STACKED_AREA_PERCENT]: _StackedConfigFn.crStackedAreaSeria,
  [_ChartType.CHT_STACKED_COLUMN]: _StackedConfigFn.crStackedColumnSeria,
  [_ChartType.CHT_STACKED_COLUMN_PERCENT]: _StackedConfigFn.crStackedColumnSeria
};
const calcTotal = function (jsonData, items) {
  if (jsonData === void 0) {
    jsonData = [];
  }
  if (items === void 0) {
    items = [];
  }
  let _y,
    _bTotal = (0, _big.default)('0.0');
  for (let i = 0, max = items.length; i < max; i++) {
    _y = jsonData[items[i].value];
    if (_y) {
      _bTotal = _bTotal.plus(_y);
    }
  }
  return _bTotal;
};
exports.calcTotal = calcTotal;
const _crReferenceDataAndTotal = (jsonData, items) => {
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
const _crDataTopPercent = (data, bTotal, percent) => {
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
const _initSeries = _ref => {
  let {
    items,
    chartType,
    fSeria
  } = _ref;
  return items.map((item, itemIndex) => {
    const color = (0, _MonoColorFn.getMonoColor)(itemIndex),
      {
        name
      } = item;
    return fSeria({
      name,
      color
    });
  });
};
const _calcPercent = function (bTotal, bValue) {
  if (bTotal === void 0) {
    bTotal = (0, _big.default)('0.0');
  }
  if (bValue === void 0) {
    bValue = (0, _big.default)('0.0');
  }
  return !bTotal.eq((0, _big.default)(0.0)) ? bValue.times(100).div(bTotal).abs().toFixed(2) + '%' : (0, _big.default)(0.0) + '%';
};
const _crStackedSeries = _ref2 => {
  let {
    jsonData,
    items100,
    items90,
    chartType,
    stacking
  } = _ref2;
  const fSeria = _rFactorySeria[chartType],
    series = _initSeries({
      items: items90,
      chartType,
      fSeria
    }),
    categories = [],
    dataOther = [];
  jsonData = jsonData.reverse();
  jsonData.forEach((yearData, i) => {
    let yearTotal100 = calcTotal(yearData, items100),
      yearTotal90 = (0, _big.default)('0.0'),
      isFullYearData = true;
    items90.forEach((item, itemIndex) => {
      const y = yearData[item._jsonIndex],
        percent = y ? _calcPercent(yearTotal100, (0, _big.default)(y)) : '0.0%';
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
        percent: _calcPercent(yearTotal100, (0, _big.default)(yOther)),
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
const crStackedConfig = _ref3 => {
  let {
    jsonData,
    items100,
    chartType = _ChartType.CHT_STACKED_AREA,
    stacking = 'normal'
  } = _ref3;
  const {
      referenceData,
      bTotal
    } = _crReferenceDataAndTotal(jsonData[0], items100),
    items90 = _crDataTopPercent(referenceData, bTotal, 0.9),
    bPrevTotal = calcTotal(jsonData[1], items100),
    dateTo = jsonData[1][0] ? jsonData[1][0] : '',
    {
      series,
      categories
    } = _crStackedSeries({
      jsonData,
      items100,
      items90,
      chartType,
      stacking
    }),
    _categoriesLength = (categories || []).length,
    date = _categoriesLength > 1 ? categories[_categoriesLength - 1] : '';
  return {
    bNowTotal: bTotal,
    date,
    bPrevTotal,
    dateTo,
    series,
    categories
  };
};
exports.crStackedConfig = crStackedConfig;
const crSparkData = (jsonData, itemIndex, bYearTotals) => {
  const sparkvalues = [],
    sparkpercent = [];
  jsonData.forEach((yearData, yearIndex) => {
    sparkvalues.push(yearData[itemIndex]);
    if (yearData[itemIndex]) {
      sparkpercent.push(parseFloat((0, _NdlFn.crPercent)({
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
exports.crSparkData = crSparkData;
//# sourceMappingURL=StackedFn.js.map