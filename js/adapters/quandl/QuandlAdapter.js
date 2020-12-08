"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _big = _interopRequireDefault(require("big.js"));

var _pipe = _interopRequireDefault(require("../../utils/pipe"));

var _Type = require("../../constants/Type");

var _Chart = _interopRequireDefault(require("../../charts/Chart"));

var _ChartFn = _interopRequireDefault(require("../../charts/ChartFn"));

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _ChartLegend = _interopRequireDefault(require("../../charts/ChartLegend"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _QuandlFn = _interopRequireDefault(require("./QuandlFn"));

var _toSemiDonut = _interopRequireDefault(require("./toSemiDonut"));

var _toStackedArea = _interopRequireDefault(require("./toStackedArea"));

var _toStackedColumn = _interopRequireDefault(require("./toStackedColumn"));

var _toTreeMap = _interopRequireDefault(require("./toTreeMap"));

var _toYearsByMonths = _interopRequireDefault(require("../toYearsByMonths"));

var _toScatter = _interopRequireDefault(require("./toScatter"));

var _rToConfig2, _rToSeria2;

var getData = _QuandlFn["default"].getData,
    getColumnNames = _QuandlFn["default"].getColumnNames;
var crDividendSeria = _ChartConfig["default"].crDividendSeria,
    crSplitRatioSeria = _ChartConfig["default"].crSplitRatioSeria;
var calcMinY = _ChartFn["default"].calcMinY,
    setMinMaxPlotLines = _ChartFn["default"].setMinMaxPlotLines;
var _assign = Object.assign;
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
  COLOR_BLUE: '#2f7ed8'
};

var _notNull2 = function _notNull2(a, b) {
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
        splitRatio = _AdapterFn["default"].roundBy(point[splitRationIndex]),
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
      _open = open ? point[open] : undefined;

  dataVolume.push([dateUTC, point[volume]]);
  dataVolumeColumn.push(_AdapterFn["default"].crVolumePoint({
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
    dataATH.push(_AdapterFn["default"].crAthPoint({
      date: dateUTC,
      close: _prevPoint[1],
      open: point[open]
    }));
  }

  return result;
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
      _openValue = _notNull2(point[open], _closeValue) ? point[open] : C.UNKNOWN,
      _bHigh = _notNull2(point[high], _closeValue) ? (0, _big["default"])(point[high]).minus(_closeValue) : (0, _big["default"])('0.0'),
      _bLow = _notNull2(point[low], _closeValue) ? (0, _big["default"])(point[low]).minus(_closeValue) : (0, _big["default"])('0.0'),
      _dayHigh = point[high] || C.UNKNOWN,
      _dayLow = point[low] || C.UNKNOWN;

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

var _fLegendConfig = function _fLegendConfig(seriaColumnNames, column_names) {
  var legendSeries = [],
      columns = [];

  if (seriaColumnNames[0] === 'All') {
    var j = 1,
        _len = column_names.length;

    for (j; j < _len; j++) {
      legendSeries.push(_ChartLegend["default"].fLegendConfig(column_names[j]));
      columns.push(j);
    }
  } else {
    var i = 0,
        max = seriaColumnNames.length;

    for (; i < max; i++) {
      var columnName = seriaColumnNames[i],
          columnIndex = _QuandlFn["default"].findColumnIndex(column_names, columnName);

      if (columnIndex) {
        legendSeries.push(_ChartLegend["default"].fLegendConfig(columnName));
        columns.push(columnIndex);
      }
    }
  }

  return {
    legendSeries: legendSeries,
    columns: columns
  };
};

var _fnCreatePointFlow = function _fnCreatePointFlow(json, yPointIndex, option) {
  var fnStep = [_fnConvertToUTC, _fnCheckExtrems, _fnAddToSeria],
      _json$dataset = json.dataset,
      dataset = _json$dataset === void 0 ? {} : _json$dataset,
      column_names = getColumnNames(json),
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

  var open = _QuandlFn["default"].findColumnIndex(column_names, C.OPEN),
      _closeIndex = _QuandlFn["default"].findColumnIndex(column_names, C.CLOSE),
      close = typeof _closeIndex !== 'undefined' ? _closeIndex : _QuandlFn["default"].findColumnIndex(column_names, C.PRICE),
      low = _QuandlFn["default"].findColumnIndex(column_names, C.LOW),
      high = _QuandlFn["default"].findColumnIndex(column_names, C.HIGH),
      volume = _QuandlFn["default"].findColumnIndex(column_names, C.VOLUME),
      exDividend = _QuandlFn["default"].findColumnIndex(column_names, C.EX_DIVIDEND),
      splitRatio = _QuandlFn["default"].findColumnIndex(column_names, C.SPLIT_RATIO);

  if (volume) {
    fnStep.push(_fnAddVolume.bind(null, {
      volume: volume,
      open: open,
      close: close,
      low: low,
      high: high
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
    var _fLegendConfig2 = _fLegendConfig(seriaColumnNames, column_names),
        legendSeries = _fLegendConfig2.legendSeries,
        columns = _fLegendConfig2.columns;

    if (legendSeries.length !== 0) {
      result.legendSeries = legendSeries;
      fnStep.push(_fnAddCustomSeries.bind(null, columns));
    }
  }

  return {
    //fnPointsFlow : flow(fnStep),
    fnPointsFlow: _pipe["default"].apply(void 0, fnStep),
    result: result
  };
};

var _fnSeriesPipe = function _fnSeriesPipe(json, yPointIndex, option) {
  var _fnCreatePointFlow2 = _fnCreatePointFlow(json, yPointIndex, option),
      fnPointsFlow = _fnCreatePointFlow2.fnPointsFlow,
      result = _fnCreatePointFlow2.result,
      data = getData(json),
      points = data.sort(_AdapterFn["default"].compareByDate);

  var i = 0,
      _max = points.length;

  for (; i < _max; i++) {
    fnPointsFlow(points[i], result);
  }

  var minPoint = result.minPoint,
      maxPoint = result.maxPoint;

  _assign(result, {
    zhPoints: points,
    minY: calcMinY(minPoint, maxPoint)
  });

  return result;
};

var _fnSetYForPoints = function _fnSetYForPoints(data, y) {
  var i = 0,
      max = data.length;

  for (; i < max; i++) {
    data[i].y = y;
  }
};

var _fnAddSeriesExDivident = function _fnAddSeriesExDivident(config, data, y) {
  if (data.length > 0) {
    _fnSetYForPoints(data, y);

    config.series.push(crDividendSeria(data));
    config.chart.spacingBottom = 40;
  }
};

var _fnAddSeriesSplitRatio = function _fnAddSeriesSplitRatio(config, data, y) {
  if (data.length > 0) {
    _fnSetYForPoints(data, y);

    config.series.push(crSplitRatioSeria(data));
    config.chart.spacingBottom = 40;
  }
};

var _fnCheckIsMfi = function _fnCheckIsMfi(config, json, zhPoints) {
  var names = getColumnNames(json);

  if (names[2] === C.HIGH && names[3] === C.LOW && names[4] === C.CLOSE && names[5] === C.VOLUME) {
    _assign(config, {
      zhPoints: zhPoints,
      zhIsMfi: true
    });
  }
};

var _fnCheckIsMomAth = function _fnCheckIsMomAth(config, json, zhPoints) {
  var names = getColumnNames(json);

  if (names[1] === C.OPEN && names[4] === C.CLOSE) {
    _assign(config, {
      zhPoints: zhPoints,
      zhIsMomAth: true
    });
  }
};

var _fnSetChartTitle = function _fnSetChartTitle(config, option) {
  var title = option.title,
      subtitle = option.subtitle;

  if (title) {
    _Chart["default"].setDefaultTitle(config, title, subtitle);
  }
};

var _fnSetLegendSeriesToConfig = function _fnSetLegendSeriesToConfig(legendSeries, config) {
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

  var i = 0,
      max = legendSeries.length;

  for (i; i < max; i++) {
    var _legendSeries$i = legendSeries[i],
        data = _legendSeries$i.data,
        name = _legendSeries$i.name,
        color = _legendSeries$i.color,
        symbol = _legendSeries$i.symbol,
        isSecondAxes = _legendSeries$i.isSecondAxes,
        seria = _ChartConfig["default"].crSeria({
      zhValueText: name,
      visible: false,
      marker: _Chart["default"].fSeriaMarker({
        color: color,
        symbol: symbol
      }),
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
      isNotZoomToMinMax = option.isNotZoomToMinMax,
      dfR = option.dfR;

  _fnSetChartTitle(config, option);

  config.zhConfig = _QuandlFn["default"].createZhConfig(option);
  config.info = _QuandlFn["default"].createDatasetInfo(json);

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

  _fnCheckIsMomAth(config, json, zhPoints);

  config.series[0].data = seria;

  _fnAddSeriesExDivident(config, dataExDividend, minY);

  _fnAddSeriesSplitRatio(config, dataSplitRatio, minY);

  config = (0, _ConfigBuilder["default"])().init(config).add({
    valueMoving: _AdapterFn["default"].valueMoving(seria, dfR)
  }).addMiniVolume({
    id: chartId,
    dColumn: dataVolumeColumn,
    dVolume: dataVolume
  }).addMiniATH({
    id: chartId,
    data: dataATH
  }).addMiniHL({
    id: chartId,
    data: dataHighLow
  }).toConfig();

  if (legendSeries) {
    _fnSetLegendSeriesToConfig(legendSeries, config);
  }

  return {
    config: config,
    minPoint: minPoint,
    maxPoint: maxPoint,
    minY: minY,
    isDrawDeltaExtrems: isDrawDeltaExtrems,
    isNotZoomToMinMax: isNotZoomToMinMax
  };
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
      _recentValue = _maxIndex > -1 ? _data[_maxIndex][1] : 0;

  setMinMaxPlotLines({
    plotLines: plotLines,
    min: minPoint,
    max: maxPoint,
    value: _recentValue,
    isDrawDeltaExtrems: isDrawDeltaExtrems
  });

  if (!isNotZoomToMinMax) {
    config.yAxis.min = minY;
  }

  return result;
}; //const fnQuandlFlow = flow(fnGetSeries, fnConfigAxes);


var fnQuandlFlow = (0, _pipe["default"])(fnGetSeries, fnConfigAxes);

var _fCreateAreaConfig = function _fCreateAreaConfig(json, option) {
  var config = _ChartConfig["default"].crAreaConfig(),
      columnName = option.columnName;

  option.dataColumn = _QuandlFn["default"].getDataColumnIndex(json, option);

  if (columnName) {
    config.series[0].zhValueText = columnName;
  }

  return fnQuandlFlow(config, json, option);
};

var _fToConfig = function _fToConfig(builder) {
  return function (json, option) {
    var data = getData(json);
    return {
      config: builder.toConfig(data, option)
    };
  };
};

var _fToSeria = function _fToSeria(builder) {
  return function (json, option, chart) {
    var data = getData(json);
    return builder.toSeria(data, option, chart);
  };
};

var _rToConfig = (_rToConfig2 = {}, _rToConfig2[_Type.ChartType.AREA] = _fCreateAreaConfig, _rToConfig2[_Type.ChartType.SEMI_DONUT] = _toSemiDonut["default"], _rToConfig2[_Type.ChartType.STACKED_AREA] = _toStackedArea["default"], _rToConfig2[_Type.ChartType.STACKED_AREA_PERCENT] = _toStackedArea["default"], _rToConfig2[_Type.ChartType.STACKED_COLUMN] = _toStackedColumn["default"], _rToConfig2[_Type.ChartType.STACKED_COLUMN_PERCENT] = _toStackedColumn["default"], _rToConfig2[_Type.ChartType.TREE_MAP] = _toTreeMap["default"], _rToConfig2[_Type.ChartType.YEARLY] = _fToConfig(_toYearsByMonths["default"]), _rToConfig2[_Type.ChartType.SCATTER] = _fToConfig(_toScatter["default"]), _rToConfig2[_Type.ChartType.SCATTER_UP] = _fToConfig(_toScatter["default"]), _rToConfig2[_Type.ChartType.SCATTER_DOWN] = _fToConfig(_toScatter["default"]), _rToConfig2);

var _crSeriaData = function _crSeriaData(data, yIndex) {
  return data.map(function (p) {
    return [_AdapterFn["default"].ymdToUTC(p[0]), p[yIndex]];
  }).sort(_AdapterFn["default"].compareByDate);
};

var _toSeria = function _toSeria(json, option) {
  var chartId = option.value,
      yPointIndex = _QuandlFn["default"].getDataColumnIndex(json, option),
      data = _crSeriaData(getData(json), yPointIndex);

  return _ChartConfig["default"].crSeria({
    zhValueText: chartId.substring(0, 12),
    data: data,
    minY: _AdapterFn["default"].findMinY(data)
  });
};

var _rToSeria = (_rToSeria2 = {
  DF: _toSeria
}, _rToSeria2[_Type.ChartType.SCATTER] = _fToSeria(_toScatter["default"]), _rToSeria2[_Type.ChartType.SCATTER_UP] = _fToSeria(_toScatter["default"]), _rToSeria2[_Type.ChartType.SCATTER_DOWN] = _fToSeria(_toScatter["default"]), _rToSeria2);

var QuandlAdapter = {
  toConfig: function toConfig(json, option) {
    var _option$seriaType = option.seriaType,
        seriaType = _option$seriaType === void 0 ? _Type.ChartType.AREA : _option$seriaType,
        config = _rToConfig[seriaType](json, option);

    return config;
  },
  toSeries: function toSeries(json, option, chart) {
    var seriaType = option.seriaType,
        _toSeria = _rToSeria[seriaType] || _rToSeria.DF,
        seria = _toSeria(json, option, chart);

    return seria;
  }
};
var _default = QuandlAdapter;
exports["default"] = _default;
//# sourceMappingURL=QuandlAdapter.js.map