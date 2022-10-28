"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _big = _interopRequireDefault(require("big.js"));

var _pipe = _interopRequireDefault(require("../../utils/pipe"));

var _MarkerFn = require("../../charts/MarkerFn");

var _ChartLegend = require("../../charts/ChartLegend");

var _AdapterFn = require("../AdapterFn");

var _compareByFn = require("../compareByFn");

var _pointFn = require("../pointFn");

var _QuandlFn = require("./QuandlFn");

var _C = require("./C");

const _assign = Object.assign,
      _isUndef = v => typeof v === 'undefined',
      _notNull2 = (a, b) => a !== null && b !== null;

const _convertToUTC = (point, result) => {
  const arrDate = point[0].split('-');
  result.dateUTC = Date.UTC(arrDate[0], parseInt(arrDate[1], 10) - 1, arrDate[2]);
  result.point = point;
  return result;
};

const _checkExtrems = result => {
  const {
    point,
    yPointIndex,
    maxY,
    minY
  } = result,
        value = point[yPointIndex];

  if ((0, _AdapterFn.isNumber)(value)) {
    if (value > maxY) {
      result.maxY = value;
    }

    if (value < minY) {
      result.minY = value;
    }
  }

  return result;
};

const _addToSeria = result => {
  const {
    seria,
    dateUTC,
    point,
    yPointIndex
  } = result;
  seria.push([dateUTC, point[yPointIndex]]);
  return result;
};

const _addSplitRatio = (splitRationIndex, result) => {
  const {
    point,
    dateUTC,
    yPointIndex,
    dataSplitRatio
  } = result;

  if (point[splitRationIndex] !== 1) {
    const x = dateUTC,
          splitRatio = (0, _AdapterFn.roundBy)(point[splitRationIndex]),
          price = point[yPointIndex];
    dataSplitRatio.push(_assign((0, _MarkerFn.crMarkerSplitRatio)(), {
      x,
      splitRatio,
      price
    }));
  }

  return result;
};

const _addExDividend = (exDividendIndex, result) => {
  const {
    point,
    dateUTC,
    yPointIndex,
    dataExDividend
  } = result;

  if (point[exDividendIndex] !== 0) {
    const x = dateUTC,
          exValue = point[exDividendIndex],
          price = point[yPointIndex],
          marker = _assign((0, _MarkerFn.crMarkerExDividend)(), {
      x,
      exValue,
      price
    });

    if (!(0, _QuandlFn.isPrevDateAfter)(dataExDividend, x, 14)) {
      marker.dataLabels.y = 0;
    }

    dataExDividend.push(marker);
  }

  return result;
};

const _addVolume = (optionIndex, result) => {
  const {
    volume,
    open,
    close = 4,
    low = 3,
    high = 2
  } = optionIndex,
        {
    point,
    dateUTC,
    dataVolume,
    dataVolumeColumn
  } = result,
        _open = open ? point[open] : void 0;

  dataVolume.push([dateUTC, point[volume]]);
  dataVolumeColumn.push((0, _pointFn.crVolumePoint)({
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

const _addATH = (optionIndex, result) => {
  const {
    open = 1
  } = optionIndex,
        {
    dateUTC,
    point,
    seria,
    dataATH
  } = result,
        len = seria.length;

  if (len > 1) {
    const _prevPoint = seria[len - 2];
    dataATH.push((0, _pointFn.crAthPoint)({
      date: dateUTC,
      close: _prevPoint[1],
      open: point[open]
    }));
  }

  return result;
};

const _crBigDiff = (value, closeValue) => _notNull2(value, closeValue) ? (0, _big.default)(value).minus(closeValue) : (0, _big.default)('0.0');

const _addHighLow = (optionIndex, result) => {
  const {
    open = 1,
    high = 2,
    low = 3
  } = optionIndex,
        {
    dateUTC,
    yPointIndex,
    point,
    dataHighLow
  } = result,
        _closeValue = point[yPointIndex],
        _openValue = _notNull2(point[open], _closeValue) ? point[open] : _C.UNKNOWN,
        _bHigh = _crBigDiff(point[high], _closeValue),
        _bLow = _crBigDiff(point[low], _closeValue),
        _dayHigh = point[high] || _C.UNKNOWN,
        _dayLow = point[low] || _C.UNKNOWN;

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

const _addCustomSeries = (columns, result) => {
  const {
    dateUTC,
    point,
    legendSeries
  } = result;
  let i = 0,
      max = columns.length;

  for (; i < max; i++) {
    legendSeries[i].data.push([dateUTC, point[columns[i]]]);
  }
};

const _crLegendConfig = (seriaColumnNames, columnNames) => {
  const legendSeries = [],
        columns = [];

  if (seriaColumnNames[0] === 'All') {
    let j = 1,
        _len = columnNames.length;

    for (j; j < _len; j++) {
      legendSeries.push((0, _ChartLegend.crLegendConfig)(columnNames[j]));
      columns.push(j);
    }
  } else {
    let i = 0,
        max = seriaColumnNames.length;

    for (; i < max; i++) {
      const columnName = seriaColumnNames[i],
            columnIndex = (0, _QuandlFn.findColumnIndex)(columnNames, columnName);

      if (columnIndex) {
        legendSeries.push((0, _ChartLegend.crLegendConfig)(columnName));
        columns.push(columnIndex);
      }
    }
  }

  return {
    legendSeries,
    columns
  };
};

const _isTransform = _ref => {
  let {
    dataset
  } = _ref;
  const {
    transform
  } = dataset || {};
  return !!(transform && transform !== 'none');
};

const _crPointFlow = (json, option) => {
  const yPointIndex = (0, _QuandlFn.getDataColumnIndex)(json, option),
        fnStep = [_convertToUTC, _checkExtrems, _addToSeria],
        columnNames = (0, _QuandlFn.getColumnNames)(json),
        open = (0, _QuandlFn.findColumnIndex)(columnNames, _C.OPEN),
        _closeIndex = (0, _QuandlFn.findColumnIndex)(columnNames, _C.CLOSE),
        close = !_isUndef(_closeIndex) ? _closeIndex : (0, _QuandlFn.findColumnIndex)(columnNames, _C.PRICE),
        low = (0, _QuandlFn.findColumnIndex)(columnNames, _C.LOW),
        high = (0, _QuandlFn.findColumnIndex)(columnNames, _C.HIGH),
        volume = (0, _QuandlFn.findColumnIndex)(columnNames, _C.VOLUME),
        exDividend = (0, _QuandlFn.findColumnIndex)(columnNames, _C.EX_DIVIDEND),
        splitRatio = (0, _QuandlFn.findColumnIndex)(columnNames, _C.SPLIT_RATIO),
        result = {
    yPointIndex,
    minY: Number.POSITIVE_INFINITY,
    maxY: Number.NEGATIVE_INFINITY,
    seria: [],
    dataVolume: [],
    dataVolumeColumn: [],
    dataExDividend: [],
    dataSplitRatio: [],
    dataATH: [],
    dataHighLow: []
  };

  if (volume) {
    fnStep.push(_addVolume.bind(null, {
      volume,
      open,
      close,
      low,
      high
    }));
  }

  const _hasNotTransform = !_isTransform(json);

  if (exDividend && _hasNotTransform) {
    fnStep.push(_addExDividend.bind(null, exDividend));
  }

  if (splitRatio && _hasNotTransform) {
    fnStep.push(_addSplitRatio.bind(null, splitRatio));
  }

  if (open) {
    fnStep.push(_addATH.bind(null, {
      open
    }));
  }

  if (high && low) {
    fnStep.push(_addHighLow.bind(null, {
      open,
      high,
      low
    }));
  }

  const {
    seriaColumnNames
  } = option;

  if (seriaColumnNames) {
    const {
      legendSeries,
      columns
    } = _crLegendConfig(seriaColumnNames, columnNames);

    if (legendSeries.length !== 0) {
      result.legendSeries = legendSeries;
      fnStep.push(_addCustomSeries.bind(null, columns));
    }
  }

  return [(0, _pipe.default)(...fnStep), result];
};

const crAreaData = (json, option) => {
  const [callPointFlow, result] = _crPointFlow(json, option),
        points = (0, _QuandlFn.getData)(json).sort(_compareByFn.compareByDate);

  let i = 0,
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
exports.default = _default;
//# sourceMappingURL=crAreaData.js.map