'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _rToConfig2;

var _lodash = require('lodash.flow');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.sortby');

var _lodash4 = _interopRequireDefault(_lodash3);

var _big = require('big.js');

var _big2 = _interopRequireDefault(_big);

var _Type = require('../constants/Type');

var _Chart = require('../charts/Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _ChartConfig = require('../charts/ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

var _ChartLegend = require('../charts/ChartLegend');

var _ChartLegend2 = _interopRequireDefault(_ChartLegend);

var _IndicatorSma = require('./IndicatorSma');

var _QuandlFn = require('./QuandlFn2');

var _QuandlFn2 = _interopRequireDefault(_QuandlFn);

var _QuandlToPie = require('./QuandlToPie');

var _QuandlToStackedArea = require('./QuandlToStackedArea');

var _QuandlToStackedColumn = require('./QuandlToStackedColumn');

var _QuandlToTreeMap = require('./QuandlToTreeMap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var C = {
  OPEN: "Open",
  CLOSE: "Close",
  PRICE: 'Price',
  LOW: "Low",
  HIGH: "High",
  VOLUME: "Volume",
  EX_DIVIDEND: "Ex-Dividend",
  SPLIT_RATIO: "Split Ratio",
  UNKNOWN: "Unknown",

  COLOR_BLUE: "#2f7ed8", // #7cb5ec
  COLOR_GREEN: "#80c040",
  COLOR_RED: "#F44336",
  COLOR_WHITE: "white",
  //COLOR_GRAY : "gray"
  COLOR_GRAY: '#607d8b'
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
      minPoint = result.minPoint;

  if (!(point[yPointIndex] == null) && point[yPointIndex] >= maxPoint) {
    result.maxPoint = point[yPointIndex];
  }
  if (!(point[yPointIndex] == null) && point[yPointIndex] <= minPoint) {
    result.minPoint = point[yPointIndex];
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
        splitRatio = point[splitRationIndex],
        price = point[yPointIndex];

    dataSplitRatio.push(Object.assign(_ChartConfig2.default.fMarkerSplitRatio(), { x: x, splitRatio: splitRatio, price: price }));
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
        price = point[yPointIndex];

    if (_QuandlFn2.default.isPrevDateAfter(dataExDividend, x, 14)) {
      dataExDividend.push(Object.assign(_ChartConfig2.default.fMarkerExDividend(), { x: x, exValue: exValue, price: price }));
    } else {
      var marker = Object.assign(_ChartConfig2.default.fMarkerExDividend(), { x: x, exValue: exValue, price: price });
      marker.dataLabels.y = 0;
      dataExDividend.push(marker);
    }
  }

  return result;
};

var _fnAddVolume = function _fnAddVolume(optionIndex, result) {
  var volume = optionIndex.volume,
      open = optionIndex.open,
      _optionIndex$close = optionIndex.close,
      close = _optionIndex$close === undefined ? 4 : _optionIndex$close,
      _optionIndex$low = optionIndex.low,
      low = _optionIndex$low === undefined ? 3 : _optionIndex$low,
      _optionIndex$high = optionIndex.high,
      high = _optionIndex$high === undefined ? 2 : _optionIndex$high,
      point = result.point,
      dateUTC = result.dateUTC,
      dataVolume = result.dataVolume,
      dataVolumeColumn = result.dataVolumeColumn,
      _open = open ? point[open] : undefined;

  dataVolume.push([dateUTC, point[volume]]);
  if (_open && point[close] > _open) {
    dataVolumeColumn.push({
      x: dateUTC, y: point[volume],
      _open: _open, _close: point[close],
      _low: point[low], _high: point[high],
      color: C.COLOR_GREEN
    });
  } else if (_open && point[close] < _open) {
    dataVolumeColumn.push({
      x: dateUTC, y: point[volume],
      _open: _open, _close: point[close],
      _low: point[low], _high: point[high],
      color: C.COLOR_RED
    });
  } else {
    dataVolumeColumn.push({
      x: dateUTC, y: point[volume],
      _open: _open, _close: point[close],
      _low: point[low], _high: point[high],
      color: C.COLOR_GRAY
    });
  }
  return result;
};

var _fnAddATH = function _fnAddATH(optionIndex, result) {
  var _optionIndex$open = optionIndex.open,
      open = _optionIndex$open === undefined ? 1 : _optionIndex$open,
      dateUTC = result.dateUTC,
      point = result.point,
      seria = result.seria,
      dataATH = result.dataATH,
      len = seria.length;


  if (len > 1) {
    var prevPoint = seria[len - 2],
        _closePrev = prevPoint[1],
        _bDelta = point[open] && _closePrev ? (0, _big2.default)(_closePrev).minus(point[open]) : (0, _big2.default)('0.0'),
        _bPercent = _closePrev ? _bDelta.times(100).div(_closePrev).abs().toFixed(2) : (0, _big2.default)('0.0');

    var _color = void 0;
    if (_bDelta.gt(0.0)) {
      _color = C.COLOR_RED;
    } else if (!_bDelta.gte(0.0)) {
      _color = C.COLOR_GREEN;
    } else {
      _color = point[open] ? C.COLOR_GRAY : C.COLOR_WHITE;
    }

    dataATH.push({
      x: dateUTC,
      y: parseFloat(_bPercent),
      close: _closePrev,
      open: point[open] ? point[open] : C.UNKNOWN,
      color: _color
    });
  }

  return result;
};

var _fnAddHighLow = function _fnAddHighLow(optionIndex, result) {
  var _optionIndex$open2 = optionIndex.open,
      open = _optionIndex$open2 === undefined ? 1 : _optionIndex$open2,
      _optionIndex$high2 = optionIndex.high,
      high = _optionIndex$high2 === undefined ? 2 : _optionIndex$high2,
      _optionIndex$low2 = optionIndex.low,
      low = _optionIndex$low2 === undefined ? 3 : _optionIndex$low2,
      dateUTC = result.dateUTC,
      yPointIndex = result.yPointIndex,
      point = result.point,
      dataHighLow = result.dataHighLow;


  var _closeValue = point[yPointIndex],
      _openValue = point[open] ? point[open] : C.UNKNOWN,
      _bHigh = point[high] ? (0, _big2.default)(point[high]).minus(_closeValue) : (0, _big2.default)('0.0'),
      _bLow = point[low] ? (0, _big2.default)(point[low]).minus(_closeValue) : (0, _big2.default)('0.0'),
      _dayHigh = point[high] ? point[high] : C.UNKNOWN,
      _dayLow = point[low] ? point[low] : C.UNKNOWN;

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

  for (var i = 0, max = columns.length; i < max; i++) {
    legendSeries[i].data.push([dateUTC, point[columns[i]]]);
  }
};

var _fLegendConfig = function _fLegendConfig(seriaColumnNames, column_names) {
  var legendSeries = [],
      columns = [];

  for (var i = 0, max = seriaColumnNames.length; i < max; i++) {
    var columnName = seriaColumnNames[i],
        columnIndex = _QuandlFn2.default.findColumnIndex(column_names, columnName);
    if (columnIndex) {
      legendSeries.push(_ChartLegend2.default.fLegendConfig(columnName));
      columns.push(columnIndex);
    }
  }

  return { legendSeries: legendSeries, columns: columns };
};

var _fnCreatePointFlow = function _fnCreatePointFlow(json, yPointIndex, option) {
  var fnStep = [_fnConvertToUTC, _fnCheckExtrems, _fnAddToSeria],
      _json$dataset = json.dataset,
      dataset = _json$dataset === undefined ? {} : _json$dataset,
      column_names = dataset.column_names,
      result = {
    yPointIndex: yPointIndex,
    minPoint: Number.POSITIVE_INFINITY,
    maxPoint: Number.NEGATIVE_INFINITY,
    seria: [],
    dataVolume: [], dataVolumeColumn: [],
    dataExDividend: [], dataSplitRatio: [],
    dataATH: [], dataHighLow: []
  };


  var open = _QuandlFn2.default.findColumnIndex(column_names, C.OPEN),
      _closeIndex = _QuandlFn2.default.findColumnIndex(column_names, C.CLOSE),
      close = typeof _closeIndex !== 'undefined' ? _closeIndex : _QuandlFn2.default.findColumnIndex(column_names, C.PRICE),
      low = _QuandlFn2.default.findColumnIndex(column_names, C.LOW),
      high = _QuandlFn2.default.findColumnIndex(column_names, C.HIGH),
      volume = _QuandlFn2.default.findColumnIndex(column_names, C.VOLUME),
      exDividend = _QuandlFn2.default.findColumnIndex(column_names, C.EX_DIVIDEND),
      splitRatio = _QuandlFn2.default.findColumnIndex(column_names, C.SPLIT_RATIO);

  if (volume) {
    fnStep.push(_fnAddVolume.bind(null, {
      volume: volume, open: open, close: close, low: low, high: high
    }));
  }

  var _isTransform = dataset.transform && dataset.transform !== 'none';
  if (exDividend && !_isTransform) {
    fnStep.push(_fnAddExDividend.bind(null, exDividend));
  }

  if (splitRatio && !_isTransform) {
    fnStep.push(_fnAddSplitRatio.bind(null, splitRatio));
  }

  if (open) {
    fnStep.push(_fnAddATH.bind(null, { open: open }));
  }

  if (high && low) {
    fnStep.push(_fnAddHighLow.bind(null, { open: open, high: high, low: low }));
  }

  var seriaColumnNames = option.seriaColumnNames;

  if (seriaColumnNames) {
    var _fLegendConfig2 = _fLegendConfig(seriaColumnNames, column_names),
        legendSeries = _fLegendConfig2.legendSeries,
        columns = _fLegendConfig2.columns;

    if (legendSeries.length !== 0) {
      result.legendSeries = legendSeries;
      fnStep.push(_fnAddCustomSeries.bind(null, columns));
    }
  }

  return {
    fnPointsFlow: (0, _lodash2.default)(fnStep),
    result: result
  };
};

var _fnSeriesPipe = function _fnSeriesPipe(json, yPointIndex, option) {
  var _fnCreatePointFlow2 = _fnCreatePointFlow(json, yPointIndex, option),
      fnPointsFlow = _fnCreatePointFlow2.fnPointsFlow,
      result = _fnCreatePointFlow2.result,
      points = (0, _lodash4.default)(json.dataset.data, '0');

  for (var i = 0, max = points.length; i < max; i++) {
    fnPointsFlow(points[i], result);
  }

  result.zhPoints = points;
  result.minY = _Chart2.default.calcMinY(result);

  return result;
};

var _fnSetYForPoints = function _fnSetYForPoints(data, y) {
  for (var i = 0, max = data.length; i < max; i++) {
    data[i].y = y;
  }
};

var _fnAddSeriesExDivident = function _fnAddSeriesExDivident(config, data, chartId, y) {
  if (data.length > 0) {
    _fnSetYForPoints(data, y);
    config.series.push(_ChartConfig2.default.fExDividendSeria(data, chartId));
    config.chart.spacingBottom = 40;
  }
};

var _fnAddSeriesSplitRatio = function _fnAddSeriesSplitRatio(config, data, chartId, y) {
  if (data.length > 0) {
    _fnSetYForPoints(data, y);
    config.series.push(_ChartConfig2.default.fSplitRatioSeria(data, chartId));
    config.chart.spacingBottom = 40;
  }
};

var _fnCheckIsMfi = function _fnCheckIsMfi(config, json, zhPoints) {
  var names = json.dataset.column_names;
  if (names[2] === C.HIGH && names[3] === C.LOW && names[4] === C.CLOSE && names[5] === C.VOLUME) {
    config.zhPoints = zhPoints;
    config.zhIsMfi = true;
    config.zhFnGetMfiConfig = _IndicatorSma.fnGetConfigMfi;
  }
};

var _fnSetChartTitle = function _fnSetChartTitle(config, option) {
  var title = option.title,
      subtitle = option.subtitle;

  if (title) {
    _Chart2.default.setDefaultTitle(config, title, subtitle);
  }
};

var _fnSetLegendSeriesToConfig = function _fnSetLegendSeriesToConfig(legendSeries, config, chartId) {
  var legend = [],
      _len = config.series.length;

  if (_len !== 0) {
    legend.push({
      name: config.series[0].zhValueText,
      index: 0,
      color: C.COLOR_BLUE,
      isVisible: true
    });
  }

  for (var i = 0, max = legendSeries.length; i < max; i++) {
    var _legendSeries$i = legendSeries[i],
        data = _legendSeries$i.data,
        name = _legendSeries$i.name,
        color = _legendSeries$i.color,
        symbol = _legendSeries$i.symbol,
        isSecondAxes = _legendSeries$i.isSecondAxes,
        seria = _ChartConfig2.default.fSeries({
      zhSeriaId: i + '_' + chartId,
      zhValueText: name,
      visible: false,
      marker: _Chart2.default.fSeriaMarker({ color: color, symbol: symbol }),
      color: color,
      data: data
    });

    if (!isSecondAxes) {
      config.series.push(seria);
      legend.push({
        name: name,
        index: config.series.length - 1,
        color: color,
        isVisible: false
      });
    } else {
      legend.push({
        name: name,
        color: color,
        isVisible: false,
        isSecondAxes: true,
        seria: seria
      });
    }
  }

  config.zhConfig.legend = legend;
};

var fnGetSeries = function fnGetSeries(config, json, option) {
  var yPointIndex = option.dataColumn,
      chartId = option.value,
      isDrawDeltaExtrems = option.isDrawDeltaExtrems,
      isNotZoomToMinMax = option.isNotZoomToMinMax;


  _fnSetChartTitle(config, option);
  config.zhConfig = _QuandlFn2.default.createZhConfig(option);
  config.info = _QuandlFn2.default.createDatasetInfo(json);

  var _fnSeriesPipe2 = _fnSeriesPipe(json, yPointIndex, option),
      seria = _fnSeriesPipe2.seria,
      minPoint = _fnSeriesPipe2.minPoint,
      maxPoint = _fnSeriesPipe2.maxPoint,
      minY = _fnSeriesPipe2.minY,
      dataExDividend = _fnSeriesPipe2.dataExDividend,
      dataSplitRatio = _fnSeriesPipe2.dataSplitRatio,
      dataVolume = _fnSeriesPipe2.dataVolume,
      dataVolumeColumn = _fnSeriesPipe2.dataVolumeColumn,
      dataATH = _fnSeriesPipe2.dataATH,
      dataHighLow = _fnSeriesPipe2.dataHighLow,
      legendSeries = _fnSeriesPipe2.legendSeries,
      zhPoints = _fnSeriesPipe2.zhPoints;

  _fnCheckIsMfi(config, json, zhPoints);
  config.zhFnAddSeriesSma = _IndicatorSma.fnAddSeriesSma;
  config.zhFnRemoveSeries = _IndicatorSma.fnRemoveSeries;

  config.valueMoving = _QuandlFn2.default.createValueMovingFromSeria(seria);
  config.valueMoving.date = _QuandlFn2.default.getRecentDate(seria, json);
  config.series[0].data = seria;
  config.series[0].zhSeriaId = chartId;

  _fnAddSeriesExDivident(config, dataExDividend, chartId, minY);
  _fnAddSeriesSplitRatio(config, dataSplitRatio, chartId, minY);

  config.zhVolumeConfig = dataVolume.length > 0 ? _ChartConfig2.default.fIndicatorVolumeConfig(chartId, dataVolumeColumn, dataVolume) : undefined;
  config.zhATHConfig = dataATH.length > 0 ? _ChartConfig2.default.fIndicatorATHConfig(chartId, dataATH) : undefined;
  config.zhHighLowConfig = dataHighLow.length > 0 ? _ChartConfig2.default.fIndicatorHighLowConfig(chartId, dataHighLow) : undefined;

  if (legendSeries) {
    _fnSetLegendSeriesToConfig(legendSeries, config, chartId);
    config.zhConfig.isWithLegend = true;
  }

  return {
    config: config, minPoint: minPoint, maxPoint: maxPoint, minY: minY,
    isDrawDeltaExtrems: isDrawDeltaExtrems, isNotZoomToMinMax: isNotZoomToMinMax
  };
};

var _setPlotLinesExtremValues = function _setPlotLinesExtremValues(plotLines, minPoint, maxPoint, value, isDrawDeltaExtrems) {
  var _bMax = (0, _big2.default)(maxPoint),
      _bMin = (0, _big2.default)(minPoint),
      _bValue = (0, _big2.default)(value),
      _maxPoint = parseFloat(_bMax.round(4).toString(), 10),
      _minPoint = parseFloat(_bMin.round(4).toString(), 10);

  var _deltaMax = '',
      _deltaMin = '';
  if (isDrawDeltaExtrems) {
    var perToMax = _QuandlFn2.default.createPercent({ bValue: _bMax.minus(_bValue), bTotal: _bValue });
    var perToMin = _QuandlFn2.default.createPercent({ bValue: _bValue.minus(_bMin), bTotal: _bValue });
    _deltaMax = '\xA0\xA0\u0394 ' + perToMax + '%';
    _deltaMin = '\xA0\xA0\u0394 ' + perToMin + '%';
  }

  plotLines[0].value = _maxPoint;
  plotLines[0].label.text = '' + _ChartConfig2.default.fnNumberFormat(_maxPoint) + _deltaMax;
  plotLines[1].value = _minPoint;
  plotLines[1].label.text = '' + _ChartConfig2.default.fnNumberFormat(_minPoint) + _deltaMin;
};

var fnConfigAxes = function fnConfigAxes(result) {
  var config = result.config,
      minPoint = result.minPoint,
      maxPoint = result.maxPoint,
      minY = result.minY,
      isDrawDeltaExtrems = result.isDrawDeltaExtrems,
      isNotZoomToMinMax = result.isNotZoomToMinMax,
      plotLines = config.yAxis.plotLines,
      _data = config.series[0].data,
      _maxIndex = _data.length - 1,
      _recentValue = _data[_maxIndex][1];

  _setPlotLinesExtremValues(plotLines, minPoint, maxPoint, _recentValue, isDrawDeltaExtrems);

  if (!isNotZoomToMinMax) {
    config.yAxis.min = minY;
  }

  return result;
};

var fnQuandlFlow = (0, _lodash2.default)(fnGetSeries, fnConfigAxes);

var _fCreateAreaConfig = function _fCreateAreaConfig(json, option) {
  var config = _ChartConfig2.default.fBaseAreaConfig(),
      columnName = option.columnName;


  option.dataColumn = _QuandlFn2.default.getDataColumnIndex(json, option);
  if (columnName) {
    config.series[0].zhValueText = columnName;
  }

  return fnQuandlFlow(config, json, option);
};

var _rToConfig = (_rToConfig2 = {}, (0, _defineProperty3.default)(_rToConfig2, _Type.ChartType.AREA, _fCreateAreaConfig), (0, _defineProperty3.default)(_rToConfig2, _Type.ChartType.SEMI_DONUT, _QuandlToPie.fCreatePieConfig), (0, _defineProperty3.default)(_rToConfig2, _Type.ChartType.STACKED_AREA, _QuandlToStackedArea.fCreateStackedAreaConfig), (0, _defineProperty3.default)(_rToConfig2, _Type.ChartType.STACKED_AREA_PERCENT, _QuandlToStackedArea.fCreateStackedAreaConfig), (0, _defineProperty3.default)(_rToConfig2, _Type.ChartType.STACKED_COLUMN, _QuandlToStackedColumn.fCreateStackedColumnConfig), (0, _defineProperty3.default)(_rToConfig2, _Type.ChartType.STACKED_COLUMN_PERCENT, _QuandlToStackedColumn.fCreateStackedColumnConfig), (0, _defineProperty3.default)(_rToConfig2, _Type.ChartType.TREE_MAP, _QuandlToTreeMap.fCreateTreeMapConfig), _rToConfig2);

var QuandlAdapter = {
  toConfig: function toConfig(json, option) {
    var _option$seriaType = option.seriaType,
        seriaType = _option$seriaType === undefined ? _Type.ChartType.AREA : _option$seriaType;


    return _rToConfig[seriaType](json, option);
  },
  toSeries: function toSeries(json, option) {
    var chartId = option.value,
        parentId = option.parentId,
        yPointIndex = _QuandlFn2.default.getDataColumnIndex(json, option);

    var data = json.dataset.data.map(function (point, index) {
      var arrDate = point[0].split('-');
      return [Date.UTC(arrDate[0], parseInt(arrDate[1], 10) - 1, arrDate[2]), point[yPointIndex]];
    });
    data = (0, _lodash4.default)(data, '0');

    var valueText = chartId.length < 12 ? chartId : chartId.substring(0, 12),
        configSeries = _ChartConfig2.default.fSeries();

    configSeries.zhSeriaId = parentId + '_' + chartId;
    configSeries.zhValueText = valueText;
    configSeries.data = data;
    configSeries.minY = _QuandlFn2.default.findMinY(data);

    return configSeries;
  }
};

exports.default = QuandlAdapter;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\QuandlAdapter.js.map