'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rToConfig2;

var _flow = require('lodash/flow');

var _flow2 = _interopRequireDefault(_flow);

var _sortBy = require('lodash/sortBy');

var _sortBy2 = _interopRequireDefault(_sortBy);

var _big = require('big.js');

var _big2 = _interopRequireDefault(_big);

var _Type = require('../constants/Type');

var _Chart = require('../constants/Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _ChartConfig = require('../constants/ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

var _IndicatorSma = require('./IndicatorSma');

var _QuandlFn = require('./QuandlFn2');

var _QuandlFn2 = _interopRequireDefault(_QuandlFn);

var _QuandlToPie = require('./QuandlToPie');

var _QuandlToStackedArea = require('./QuandlToStackedArea');

var _QuandlToStackedColumn = require('./QuandlToStackedColumn');

var _QuandlToTreeMap = require('./QuandlToTreeMap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var C = {
  OPEN: "Open",
  CLOSE: "Close",
  LOW: "Low",
  HIGH: "High",
  VOLUME: "Volume",
  EX_DIVIDEND: "Ex-Dividend",
  SPLIT_RATIO: "Split Ratio",
  UNKNOWN: "Unknown",

  COLOR_BLUE: "#7cb5ec",
  COLOR_GREEN: "#80c040",
  COLOR_RED: "#F44336",
  COLOR_WHITE: "white",
  COLOR_GRAY: "gray"
};
var QuandlAdapter = {};

var _fnConvertToUTC = function _fnConvertToUTC(point, result) {
  var arrDate = point[0].split('-');
  result.dateUTC = Date.UTC(arrDate[0], parseInt(arrDate[1], 10) - 1, arrDate[2]);
  result.point = point;
  return result;
};

var _fnCheckExtrems = function _fnCheckExtrems(result) {
  var point = result.point;
  var yPointIndex = result.yPointIndex;
  var maxPoint = result.maxPoint;
  var minPoint = result.minPoint;

  if (point[yPointIndex] && point[yPointIndex] >= maxPoint) {
    result.maxPoint = point[yPointIndex];
  }
  if (point[yPointIndex] && point[yPointIndex] <= minPoint || point[yPointIndex] === 0) {
    result.minPoint = point[yPointIndex];
  }

  return result;
};

var _fnAddToSeria = function _fnAddToSeria(result) {
  var seria = result.seria;
  var dateUTC = result.dateUTC;
  var point = result.point;
  var yPointIndex = result.yPointIndex;

  seria.push([dateUTC, point[yPointIndex]]);

  return result;
};

var _fnAddSplitRatio = function _fnAddSplitRatio(splitRationIndex, result) {
  var point = result.point;
  var dateUTC = result.dateUTC;
  var yPointIndex = result.yPointIndex;
  var dataSplitRatio = result.dataSplitRatio;

  if (point[splitRationIndex] !== 1) {
    var x = dateUTC,
        splitRatio = point[splitRationIndex],
        price = point[yPointIndex];

    dataSplitRatio.push(Object.assign(_ChartConfig2.default.fMarkerSplitRatio(), { x: x, splitRatio: splitRatio, price: price }));
  }
  return result;
};

var _fnAddExDividend = function _fnAddExDividend(exDividendIndex, result) {
  var point = result.point;
  var dateUTC = result.dateUTC;
  var yPointIndex = result.yPointIndex;
  var dataExDividend = result.dataExDividend;


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
  var volume = optionIndex.volume;
  var _optionIndex$open = optionIndex.open;
  var open = _optionIndex$open === undefined ? 1 : _optionIndex$open;
  var _optionIndex$close = optionIndex.close;
  var close = _optionIndex$close === undefined ? 4 : _optionIndex$close;
  var _optionIndex$low = optionIndex.low;
  var low = _optionIndex$low === undefined ? 3 : _optionIndex$low;
  var _optionIndex$high = optionIndex.high;
  var high = _optionIndex$high === undefined ? 2 : _optionIndex$high;
  var point = result.point;
  var dateUTC = result.dateUTC;
  var dataVolume = result.dataVolume;
  var dataVolumeColumn = result.dataVolumeColumn;

  dataVolume.push([dateUTC, point[volume]]);
  if (point[close] > point[open]) {
    dataVolumeColumn.push({
      x: dateUTC, y: point[volume],
      _open: point[open], _close: point[close],
      _low: point[low], _high: point[high],
      color: C.COLOR_GREEN
    });
  } else if (point[close] < point[open]) {
    dataVolumeColumn.push({
      x: dateUTC, y: point[volume],
      _open: point[open], _close: point[close],
      _low: point[low], _high: point[high],
      color: C.COLOR_RED
    });
  } else {
    dataVolumeColumn.push({
      x: dateUTC, y: point[volume],
      _open: point[open], _close: point[close],
      _low: point[low], _high: point[high],
      color: C.COLOR_GRAY
    });
  }
  return result;
};

var _fnAddATH = function _fnAddATH(optionIndex, result) {
  var _optionIndex$open2 = optionIndex.open;
  var open = _optionIndex$open2 === undefined ? 1 : _optionIndex$open2;
  var dateUTC = result.dateUTC;
  var point = result.point;
  var seria = result.seria;
  var dataATH = result.dataATH;
  var len = seria.length;

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
  var _optionIndex$open3 = optionIndex.open;
  var open = _optionIndex$open3 === undefined ? 1 : _optionIndex$open3;
  var _optionIndex$high2 = optionIndex.high;
  var high = _optionIndex$high2 === undefined ? 2 : _optionIndex$high2;
  var _optionIndex$low2 = optionIndex.low;
  var low = _optionIndex$low2 === undefined ? 3 : _optionIndex$low2;
  var dateUTC = result.dateUTC;
  var yPointIndex = result.yPointIndex;
  var point = result.point;
  var dataHighLow = result.dataHighLow;


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
  var dateUTC = result.dateUTC;
  var point = result.point;
  var legendSeries = result.legendSeries;

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
      var _Chart$fSeriaMarkerCo = _Chart2.default.fSeriaMarkerConfig(columnName);

      var color = _Chart$fSeriaMarkerCo.color;
      var symbol = _Chart$fSeriaMarkerCo.symbol;

      legendSeries.push({ data: [], name: columnName, color: color, symbol: symbol });
      columns.push(columnIndex);
    }
  }

  return { legendSeries: legendSeries, columns: columns };
};

var _fnCreatePointFlow = function _fnCreatePointFlow(json, yPointIndex, option) {

  var fnStep = [_fnConvertToUTC, _fnCheckExtrems, _fnAddToSeria],
      column_names = json.dataset.column_names,
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
      close = _QuandlFn2.default.findColumnIndex(column_names, C.CLOSE),
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

  if (exDividend) {
    fnStep.push(_fnAddExDividend.bind(null, exDividend));
  }

  if (splitRatio) {
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
    var _fLegendConfig2 = _fLegendConfig(seriaColumnNames, column_names);

    var legendSeries = _fLegendConfig2.legendSeries;
    var columns = _fLegendConfig2.columns;


    if (legendSeries.length !== 0) {
      result.legendSeries = legendSeries;
      fnStep.push(_fnAddCustomSeries.bind(null, columns));
    }
  }

  return {
    fnPointsFlow: (0, _flow2.default)(fnStep),
    result: result
  };
};

var _fnSeriesPipe = function _fnSeriesPipe(json, yPointIndex, option) {
  var _fnCreatePointFlow2 = _fnCreatePointFlow(json, yPointIndex, option);

  var fnPointsFlow = _fnCreatePointFlow2.fnPointsFlow;
  var result = _fnCreatePointFlow2.result;
  var points = (0, _sortBy2.default)(json.dataset.data, '0');

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
  var title = option.title;
  var subtitle = option.subtitle;

  if (title) {
    config.chart.spacingTop = _Chart2.default.STACKED_SPACING_TOP;
    config.title = _Chart2.default.fTitle({ text: title, y: _Chart2.default.STACKED_TITLE_Y });
    config.subtitle = _Chart2.default.fSubtitle({ text: subtitle, y: _Chart2.default.STACKED_SUBTITLE_Y });
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
    var _legendSeries$i = legendSeries[i];
    var data = _legendSeries$i.data;
    var name = _legendSeries$i.name;
    var color = _legendSeries$i.color;
    var symbol = _legendSeries$i.symbol;


    config.series.push(_ChartConfig2.default.fSeries({
      zhSeriaId: i + '_' + chartId,
      zhValueText: name,
      visible: false,
      marker: _Chart2.default.fSeriaMarker({ color: color, symbol: symbol }),
      color: color,
      data: data
    }));
    legend.push({
      name: name,
      index: _len + i,
      color: color,
      isVisible: false
    });
  }

  config.zhConfig.legend = legend;
};

var fnGetSeries = function fnGetSeries(config, json, option) {
  var yPointIndex = option.dataColumn;
  var chartId = option.value;


  _fnSetChartTitle(config, option);
  config.zhConfig = _QuandlFn2.default.createZhConfig(option);
  config.info = _QuandlFn2.default.createDatasetInfo(json);

  var _fnSeriesPipe2 = _fnSeriesPipe(json, yPointIndex, option);

  var seria = _fnSeriesPipe2.seria;
  var minPoint = _fnSeriesPipe2.minPoint;
  var maxPoint = _fnSeriesPipe2.maxPoint;
  var minY = _fnSeriesPipe2.minY;
  var dataExDividend = _fnSeriesPipe2.dataExDividend;
  var dataSplitRatio = _fnSeriesPipe2.dataSplitRatio;
  var dataVolume = _fnSeriesPipe2.dataVolume;
  var dataVolumeColumn = _fnSeriesPipe2.dataVolumeColumn;
  var dataATH = _fnSeriesPipe2.dataATH;
  var dataHighLow = _fnSeriesPipe2.dataHighLow;
  var legendSeries = _fnSeriesPipe2.legendSeries;
  var zhPoints = _fnSeriesPipe2.zhPoints;


  _fnCheckIsMfi(config, json, zhPoints);
  config.zhFnAddSeriesSma = _IndicatorSma.fnAddSeriesSma;
  config.zhFnRemoveSeries = _IndicatorSma.fnRemoveSeries;

  config.valueMoving = _QuandlFn2.default.createValueMovingFromSeria(seria);
  config.valueMoving.date = _QuandlFn2.default.getRecentDate(seria, json);
  config.series[0].data = seria;
  config.series[0].zhSeriaId = chartId;

  config.xAxis.events = {
    afterSetExtremes: _ChartConfig2.default.zoomMetricCharts
  };

  _fnAddSeriesExDivident(config, dataExDividend, chartId, minY);
  _fnAddSeriesSplitRatio(config, dataSplitRatio, chartId, minY);

  config.zhVolumeConfig = dataVolume.length > 0 ? _ChartConfig2.default.fIndicatorVolumeConfig(chartId, dataVolumeColumn, dataVolume) : undefined;
  config.zhATHConfig = dataATH.length > 0 ? _ChartConfig2.default.fIndicatorATHConfig(chartId, dataATH) : undefined;
  config.zhHighLowConfig = dataHighLow.length > 0 ? _ChartConfig2.default.fIndicatorHighLowConfig(chartId, dataHighLow) : undefined;

  if (legendSeries) {
    _fnSetLegendSeriesToConfig(legendSeries, config, chartId);
    config.zhConfig.isWithLegend = true;
  }

  return { config: config, minPoint: minPoint, maxPoint: maxPoint, minY: minY };
};

var fnConfigAxes = function fnConfigAxes(result) {
  var config = result.config;
  var minPoint = result.minPoint;
  var maxPoint = result.maxPoint;
  var minY = result.minY;
  var _maxPoint = parseFloat((0, _big2.default)(maxPoint).round(4).toString(), 10);
  var _minPoint = parseFloat((0, _big2.default)(minPoint).round(4).toString(), 10);

  config.yAxis.plotLines[0].value = _maxPoint;
  config.yAxis.plotLines[0].label.text = _ChartConfig2.default.fnNumberFormat(_maxPoint);
  config.yAxis.plotLines[1].value = _minPoint;
  config.yAxis.plotLines[1].label.text = _ChartConfig2.default.fnNumberFormat(_minPoint);
  config.yAxis.opposite = true;
  config.yAxis.min = minY;

  config.xAxis = _Chart2.default.fXAxisOpposite(config.xAxis);

  return result;
};

var fnQuandlFlow = (0, _flow2.default)(fnGetSeries, fnConfigAxes);

var _fCreateAreaConfig = function _fCreateAreaConfig(json, option) {
  var config = _ChartConfig2.default.fBaseAreaConfig();
  var columnName = option.columnName;


  option.dataColumn = _QuandlFn2.default.getDataColumnIndex(json, option);
  if (columnName) {
    config.series[0].zhValueText = columnName;
  }

  return fnQuandlFlow(config, json, option);
};

var _rToConfig = (_rToConfig2 = {}, _defineProperty(_rToConfig2, _Type.ChartType.AREA, _fCreateAreaConfig), _defineProperty(_rToConfig2, _Type.ChartType.SEMI_DONUT, _QuandlToPie.fCreatePieConfig), _defineProperty(_rToConfig2, _Type.ChartType.STACKED_AREA, _QuandlToStackedArea.fCreateStackedAreaConfig), _defineProperty(_rToConfig2, _Type.ChartType.STACKED_AREA_PERCENT, _QuandlToStackedArea.fCreateStackedAreaConfig), _defineProperty(_rToConfig2, _Type.ChartType.STACKED_COLUMN, _QuandlToStackedColumn.fCreateStackedColumnConfig), _defineProperty(_rToConfig2, _Type.ChartType.STACKED_COLUMN_PERCENT, _QuandlToStackedColumn.fCreateStackedColumnConfig), _defineProperty(_rToConfig2, _Type.ChartType.TREE_MAP, _QuandlToTreeMap.fCreateTreeMapConfig), _rToConfig2);

QuandlAdapter.toConfig = function (json, option) {
  var _option$seriaType = option.seriaType;
  var seriaType = _option$seriaType === undefined ? _Type.ChartType.AREA : _option$seriaType;


  return _rToConfig[seriaType](json, option);
};

var _fnFindMinY = function _fnFindMinY() {
  var data = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

  var minY = Number.POSITIVE_INFINITY;
  for (var i = 0, max = data.length; i < max; i++) {
    if (data[i][1] < minY) {
      minY = data[i][1];
    }
  }

  if (minY !== Number.POSITIVE_INFINITY) {
    return minY;
  } else {
    return undefined;
  }
};

QuandlAdapter.toSeries = function (json, option) {
  var chartId = option.value;
  var parentId = option.parentId;
  var yPointIndex = _QuandlFn2.default.getDataColumnIndex(json, option);

  var data = json.dataset.data.map(function (point, index) {
    var arrDate = point[0].split('-');
    return [Date.UTC(arrDate[0], parseInt(arrDate[1], 10) - 1, arrDate[2]), point[yPointIndex]];
  });
  data = (0, _sortBy2.default)(data, '0');

  var valueText = chartId.length < 12 ? chartId : chartId.substring(0, 12),
      configSeries = _ChartConfig2.default.fSeries();

  configSeries.zhSeriaId = parentId + '_' + chartId;
  configSeries.zhValueText = valueText;
  configSeries.data = data;
  configSeries.minY = _fnFindMinY(data);

  return configSeries;
};

exports.default = QuandlAdapter;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\QuandlAdapter.js.map