"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _big = _interopRequireDefault(require("big.js"));

var _pipe = _interopRequireDefault(require("../../utils/pipe"));

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _ChartLegend = _interopRequireDefault(require("../../charts/ChartLegend"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _QuandlFn = _interopRequireDefault(require("./QuandlFn"));

var _C = _interopRequireDefault(require("./C"));

var crLegendConfig = _ChartLegend["default"].crLegendConfig;
var compareByDate = _AdapterFn["default"].compareByDate,
    roundBy = _AdapterFn["default"].roundBy,
    crVolumePoint = _AdapterFn["default"].crVolumePoint,
    crAthPoint = _AdapterFn["default"].crAthPoint;
var getData = _QuandlFn["default"].getData,
    getColumnNames = _QuandlFn["default"].getColumnNames,
    getDataColumnIndex = _QuandlFn["default"].getDataColumnIndex,
    findColumnIndex = _QuandlFn["default"].findColumnIndex;

var _assign = Object.assign,
    _isUndef = function _isUndef(v) {
  return typeof v === 'undefined';
},
    _notNull2 = function _notNull2(a, b) {
  return a !== null && b !== null;
};

var _fnConvertToUTC = function _fnConvertToUTC(point, result) {
  var arrDate = point[0].split('-');
  result.dateUTC = Date.UTC(arrDate[0], parseInt(arrDate[1], 10) - 1, arrDate[2]);
  result.point = point;
  return result;
};

var _fnCheckExtrems = function _fnCheckExtrems(result) {
  var point = result.point,
      yPointIndex = result.yPointIndex,
      maxPoint = result.maxPoint,
      minPoint = result.minPoint,
      value = point[yPointIndex];

  if (!(value == null) && value > maxPoint) {
    result.maxPoint = value;
  }

  if (!(value == null) && value < minPoint) {
    result.minPoint = value;
  }

  return result;
};

var _fnAddToSeria = function _fnAddToSeria(result) {
  var seria = result.seria,
      dateUTC = result.dateUTC,
      point = result.point,
      yPointIndex = result.yPointIndex;
  seria.push([dateUTC, point[yPointIndex]]);
  return result;
};

var _fnAddSplitRatio = function _fnAddSplitRatio(splitRationIndex, result) {
  var point = result.point,
      dateUTC = result.dateUTC,
      yPointIndex = result.yPointIndex,
      dataSplitRatio = result.dataSplitRatio;

  if (point[splitRationIndex] !== 1) {
    var x = dateUTC,
        splitRatio = roundBy(point[splitRationIndex]),
        price = point[yPointIndex];
    dataSplitRatio.push(_assign(_ChartConfig["default"].crMarkerSplitRatio(), {
      x: x,
      splitRatio: splitRatio,
      price: price
    }));
  }

  return result;
};

var _fnAddExDividend = function _fnAddExDividend(exDividendIndex, result) {
  var point = result.point,
      dateUTC = result.dateUTC,
      yPointIndex = result.yPointIndex,
      dataExDividend = result.dataExDividend;

  if (point[exDividendIndex] !== 0) {
    var x = dateUTC,
        exValue = point[exDividendIndex],
        price = point[yPointIndex],
        marker = _assign(_ChartConfig["default"].crMarkerExDividend(), {
      x: x,
      exValue: exValue,
      price: price
    });

    if (!_QuandlFn["default"].isPrevDateAfter(dataExDividend, x, 14)) {
      marker.dataLabels.y = 0;
    }

    dataExDividend.push(marker);
  }

  return result;
};

var _fnAddVolume = function _fnAddVolume(optionIndex, result) {
  var volume = optionIndex.volume,
      open = optionIndex.open,
      _optionIndex$close = optionIndex.close,
      close = _optionIndex$close === void 0 ? 4 : _optionIndex$close,
      _optionIndex$low = optionIndex.low,
      low = _optionIndex$low === void 0 ? 3 : _optionIndex$low,
      _optionIndex$high = optionIndex.high,
      high = _optionIndex$high === void 0 ? 2 : _optionIndex$high,
      point = result.point,
      dateUTC = result.dateUTC,
      dataVolume = result.dataVolume,
      dataVolumeColumn = result.dataVolumeColumn,
      _open = open ? point[open] : void 0;

  dataVolume.push([dateUTC, point[volume]]);
  dataVolumeColumn.push(crVolumePoint({
    open: _open,
    close: point[close],
    date: dateUTC,
    volume: point[volume],
    option: {
      _low: point[low],
      _high: point[high]
    }
  }));
  return result;
};

var _fnAddATH = function _fnAddATH(optionIndex, result) {
  var _optionIndex$open = optionIndex.open,
      open = _optionIndex$open === void 0 ? 1 : _optionIndex$open,
      dateUTC = result.dateUTC,
      point = result.point,
      seria = result.seria,
      dataATH = result.dataATH,
      len = seria.length;

  if (len > 1) {
    var _prevPoint = seria[len - 2];
    dataATH.push(crAthPoint({
      date: dateUTC,
      close: _prevPoint[1],
      open: point[open]
    }));
  }

  return result;
};

var _crBigDiff = function _crBigDiff(value, closeValue) {
  return _notNull2(value, closeValue) ? (0, _big["default"])(value).minus(closeValue) : (0, _big["default"])('0.0');
};

var _fnAddHighLow = function _fnAddHighLow(optionIndex, result) {
  var _optionIndex$open2 = optionIndex.open,
      open = _optionIndex$open2 === void 0 ? 1 : _optionIndex$open2,
      _optionIndex$high2 = optionIndex.high,
      high = _optionIndex$high2 === void 0 ? 2 : _optionIndex$high2,
      _optionIndex$low2 = optionIndex.low,
      low = _optionIndex$low2 === void 0 ? 3 : _optionIndex$low2,
      dateUTC = result.dateUTC,
      yPointIndex = result.yPointIndex,
      point = result.point,
      dataHighLow = result.dataHighLow,
      _closeValue = point[yPointIndex],
      _openValue = _notNull2(point[open], _closeValue) ? point[open] : _C["default"].UNKNOWN,
      _bHigh = _crBigDiff(point[high], _closeValue),
      _bLow = _crBigDiff(point[low], _closeValue),
      _dayHigh = point[high] || _C["default"].UNKNOWN,
      _dayLow = point[low] || _C["default"].UNKNOWN;

  dataHighLow.push({
    x: dateUTC,
    high: parseFloat(_bHigh),
    low: parseFloat(_bLow),
    open: _openValue,
    dayHigh: _dayHigh,
    dayLow: _dayLow,
    close: _closeValue
  });
  return result;
};

var _fnAddCustomSeries = function _fnAddCustomSeries(columns, result) {
  var dateUTC = result.dateUTC,
      point = result.point,
      legendSeries = result.legendSeries;
  var i = 0,
      max = columns.length;

  for (; i < max; i++) {
    legendSeries[i].data.push([dateUTC, point[columns[i]]]);
  }
};

var _crLegendConfig = function _crLegendConfig(seriaColumnNames, columnNames) {
  var legendSeries = [],
      columns = [];

  if (seriaColumnNames[0] === 'All') {
    var j = 1,
        _len = columnNames.length;

    for (j; j < _len; j++) {
      legendSeries.push(crLegendConfig(columnNames[j]));
      columns.push(j);
    }
  } else {
    var i = 0,
        max = seriaColumnNames.length;

    for (; i < max; i++) {
      var columnName = seriaColumnNames[i],
          columnIndex = findColumnIndex(columnNames, columnName);

      if (columnIndex) {
        legendSeries.push(crLegendConfig(columnName));
        columns.push(columnIndex);
      }
    }
  }

  return {
    legendSeries: legendSeries,
    columns: columns
  };
};

var _isTransform = function _isTransform(_ref) {
  var dataset = _ref.dataset;

  var _ref2 = dataset || {},
      transform = _ref2.transform;

  return !!(transform && transform !== 'none');
};

var _crPointFlow = function _crPointFlow(json, option) {
  var yPointIndex = getDataColumnIndex(json, option),
      fnStep = [_fnConvertToUTC, _fnCheckExtrems, _fnAddToSeria],
      columnNames = getColumnNames(json),
      open = findColumnIndex(columnNames, _C["default"].OPEN),
      _closeIndex = findColumnIndex(columnNames, _C["default"].CLOSE),
      close = !_isUndef(_closeIndex) ? _closeIndex : findColumnIndex(columnNames, _C["default"].PRICE),
      low = findColumnIndex(columnNames, _C["default"].LOW),
      high = findColumnIndex(columnNames, _C["default"].HIGH),
      volume = findColumnIndex(columnNames, _C["default"].VOLUME),
      exDividend = findColumnIndex(columnNames, _C["default"].EX_DIVIDEND),
      splitRatio = findColumnIndex(columnNames, _C["default"].SPLIT_RATIO),
      result = {
    yPointIndex: yPointIndex,
    minPoint: Number.POSITIVE_INFINITY,
    maxPoint: Number.NEGATIVE_INFINITY,
    seria: [],
    dataVolume: [],
    dataVolumeColumn: [],
    dataExDividend: [],
    dataSplitRatio: [],
    dataATH: [],
    dataHighLow: []
  };

  if (volume) {
    fnStep.push(_fnAddVolume.bind(null, {
      volume: volume,
      open: open,
      close: close,
      low: low,
      high: high
    }));
  }

  var _hasNotTransform = !_isTransform(json);

  if (exDividend && _hasNotTransform) {
    fnStep.push(_fnAddExDividend.bind(null, exDividend));
  }

  if (splitRatio && _hasNotTransform) {
    fnStep.push(_fnAddSplitRatio.bind(null, splitRatio));
  }

  if (open) {
    fnStep.push(_fnAddATH.bind(null, {
      open: open
    }));
  }

  if (high && low) {
    fnStep.push(_fnAddHighLow.bind(null, {
      open: open,
      high: high,
      low: low
    }));
  }

  var seriaColumnNames = option.seriaColumnNames;

  if (seriaColumnNames) {
    var _crLegendConfig2 = _crLegendConfig(seriaColumnNames, columnNames),
        legendSeries = _crLegendConfig2.legendSeries,
        columns = _crLegendConfig2.columns;

    if (legendSeries.length !== 0) {
      result.legendSeries = legendSeries;
      fnStep.push(_fnAddCustomSeries.bind(null, columns));
    }
  }

  return [_pipe["default"].apply(void 0, fnStep), result];
};

var crAreaData = function crAreaData(json, option) {
  var _crPointFlow2 = _crPointFlow(json, option),
      callPointFlow = _crPointFlow2[0],
      result = _crPointFlow2[1],
      points = getData(json).sort(compareByDate);

  var i = 0,
      _max = points.length;

  for (; i < _max; i++) {
    callPointFlow(points[i], result);
  }

  _assign(result, {
    zhPoints: points
  });

  return result;
};

var _default = crAreaData;
exports["default"] = _default;
//# sourceMappingURL=crConfigData.js.map