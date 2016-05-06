'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _big = require('big.js');

var _big2 = _interopRequireDefault(_big);

var _Type = require('../constants/Type');

var _ChartConfigs = require('../constants/ChartConfigs');

var _ChartConfigs2 = _interopRequireDefault(_ChartConfigs);

var _IndicatorSma = require('./IndicatorSma');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QuandlAdapter = {};

var fnCheckWithPrev = function fnCheckWithPrev(arr, checkedDate, predicate) {
  var length = arr.length;
  if (length === 0) {
    return true;
  }
  var prevDate = arr[length - 1].x;
  if (Math.abs((checkedDate.valueOf() - prevDate.valueOf()) / (24 * 60 * 60 * 1000)) < predicate) {
    return false;
  } else {
    return true;
  }
};

var fnGetXAxesConfig = function fnGetXAxesConfig() {
  return {
    opposite: true,
    tickLength: 0,
    tickPosition: 'inside',
    labels: {
      y: -5
    }
  };
};

var _fnGetDatasetInfo = function _fnGetDatasetInfo(json) {
  var dataset = json.dataset;
  return {
    name: dataset.name,
    description: dataset.description,
    newest_available_date: dataset.newest_available_date,
    oldest_available_date: dataset.oldest_available_date,
    frequency: dataset.frequency
  };
};

var _fnGetValueMoving = function _fnGetValueMoving(seria) {

  var len = seria.length,
      nowValue = len > 0 ? seria[len - 1][1] : '0.0',
      bWasValue = len > 1 ? (0, _big2.default)(seria[len - 2][1]) : (0, _big2.default)(0.0),
      bDelta = bWasValue.minus(nowValue),
      bPercent = len > 1 ? bDelta.times(100).div(bWasValue.toString()).abs().toFixed(2) : (0, _big2.default)(0.0);

  var direction = void 0;
  if (bDelta.gt(0.0)) {
    direction = _Type.Direction.DOWN;
  } else if (!bDelta.gte(0.0)) {
    direction = _Type.Direction.UP;
  } else {
    direction = _Type.Direction.EQUAL;
  }

  return {
    value: (0, _ChartConfigs.fnNumberFormat)(nowValue),
    delta: (0, _ChartConfigs.fnNumberFormat)(bDelta.abs().toString()),
    percent: bPercent.toString() + '%',
    direction: direction
  };
};

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
  if (point[yPointIndex] && point[yPointIndex] <= minPoint) {
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

var _fnAddSplitRatio = function _fnAddSplitRatio(result) {
  var point = result.point;
  var dateUTC = result.dateUTC;
  var yPointIndex = result.yPointIndex;
  var dataSplitRatio = result.dataSplitRatio;

  if (point[7] !== 1) {
    var x = dateUTC,
        splitRatio = point[7],
        price = point[yPointIndex];

    dataSplitRatio.push(Object.assign({}, _ChartConfigs.markerSplitRatio, { x: x, splitRatio: splitRatio, price: price }));
  }
  return result;
};

var _fnAddExDividend = function _fnAddExDividend(result) {
  var point = result.point;
  var dateUTC = result.dateUTC;
  var yPointIndex = result.yPointIndex;
  var dataExDividend = result.dataExDividend;


  if (point[6] !== 0) {
    var x = dateUTC,
        exValue = point[6],
        price = point[yPointIndex];

    if (fnCheckWithPrev(dataExDividend, x, 14)) {
      dataExDividend.push(Object.assign({}, _ChartConfigs.markerExDivident, { x: x, exValue: exValue, price: price }));
    } else {
      var marker = Object.assign(_ChartConfigs2.default.fMarkerExDividend(), { x: x, exValue: exValue, price: price });
      marker.dataLabels.y = 0;
      dataExDividend.push(marker);
    }
  }

  return result;
};

var _fnAddVolume = function _fnAddVolume(result) {
  var point = result.point;
  var dateUTC = result.dateUTC;
  var dataVolume = result.dataVolume;
  var dataVolumeColumn = result.dataVolumeColumn;

  dataVolume.push([dateUTC, point[5]]);
  if (point[4] > point[1]) {
    dataVolumeColumn.push({
      x: dateUTC, y: point[5],
      open: point[1], close: point[4],
      low: point[3], high: point[2],
      color: '#80c040'
    });
  } else if (point[4] < point[1]) {
    dataVolumeColumn.push({
      x: dateUTC, y: point[5],
      open: point[1], close: point[4],
      low: point[3], high: point[2],
      color: '#F44336'
    });
  } else {
    dataVolumeColumn.push({
      x: dateUTC, y: point[5],
      open: point[1], close: point[4],
      low: point[3], high: point[2],
      color: 'gray' });
  }
  return result;
};

var _fnAddATH = function _fnAddATH(result) {
  var dateUTC = result.dateUTC;
  var point = result.point;
  var seria = result.seria;
  var dataATH = result.dataATH;

  var len = seria.length;
  if (len > 1) {
    var prevPoint = seria[len - 2];
    var bDelta = point[1] ? (0, _big2.default)(prevPoint[1]).minus(point[1]) : (0, _big2.default)('0.0');
    var bPercent = bDelta.times(100).div(prevPoint[1]).abs().toFixed(2);
    var color = void 0;
    if (bDelta.gt(0.0)) {
      color = '#F44336';
    } else if (!bDelta.gte(0.0)) {
      color = '#80c040';
    } else {
      color = point[1] ? 'gray' : 'white';
    }

    dataATH.push({
      x: dateUTC,
      y: parseFloat(bPercent),
      close: prevPoint[1],
      open: point[1],
      color: color
    });
  }

  return result;
};

var _fnAddHighLow = function _fnAddHighLow(result) {
  var dateUTC = result.dateUTC;
  var yPointIndex = result.yPointIndex;
  var point = result.point;
  var dataHighLow = result.dataHighLow;


  var closeValue = point[yPointIndex],
      bHigh = point[2] ? (0, _big2.default)(point[2]).minus(closeValue) : (0, _big2.default)('0.0'),
      bLow = point[3] ? (0, _big2.default)(point[3]).minus(closeValue) : (0, _big2.default)('0.0'),
      high = point[2] ? point[2] : 'Uknown',
      low = point[3] ? point[3] : 'Uknown';

  dataHighLow.push({
    x: dateUTC,
    high: parseFloat(bHigh),
    low: parseFloat(bLow),
    dayHigh: high,
    dayLow: low,
    close: closeValue
    //color : (point[2] && point[3]) ? undefined : 'white'
  });

  return result;
};

var _fnCreatePointFlow = function _fnCreatePointFlow(json, yPointIndex) {

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

  if (column_names[5] === "Volume") {
    fnStep.push(_fnAddVolume);
  }
  if (column_names[6] === "Ex-Dividend") {
    fnStep.push(_fnAddExDividend);
  }
  if (column_names[7] === "Split Ratio") {
    fnStep.push(_fnAddSplitRatio);
  }
  if (column_names[1] === "Open") {
    fnStep.push(_fnAddATH);
  }
  if (column_names[2] === "High" && column_names[3] === "Low") {
    fnStep.push(_fnAddHighLow);
  }
  return {
    fnPointsFlow: _lodash2.default.flow(fnStep),
    result: result
  };
};

var _fnSeriesPipe = function _fnSeriesPipe(json, yPointIndex) {
  var _fnCreatePointFlow2 = _fnCreatePointFlow(json, yPointIndex);

  var fnPointsFlow = _fnCreatePointFlow2.fnPointsFlow;
  var result = _fnCreatePointFlow2.result;
  var points = _lodash2.default.sortBy(json.dataset.data, '0');

  for (var i = 0, max = points.length; i < max; i++) {
    fnPointsFlow(points[i], result);
  }

  result.zhPoints = points;

  return result;
};

var _fnCreateIndicatorConfig = function _fnCreateIndicatorConfig() {

  var config = _ChartConfigs2.default.fBaseAreaConfig();

  config.chart.height = 140;
  config.chart.spacingTop = 8;
  config.chart.spacingBottom = 10;
  config.chart.zoomType = undefined;

  config.yAxis.opposite = true;
  config.yAxis.plotLines = [];

  return config;
};

var _fnCreateConfigATH = function _fnCreateConfigATH(data) {
  if (data.length > 0) {
    var config = _fnCreateIndicatorConfig();
    config.title = _ChartConfigs2.default.fTitleMetric('ATH Chart');
    config.credits = _ChartConfigs2.default.creditsMetric;

    config.series[0].zhValueText = "ATH";
    config.series[0].data = data;
    config.series[0].name = "ATH";
    config.series[0].visible = true;
    config.series[0].type = "column";
    config.series[0].borderWidth = 0;
    config.series[0].pointPlacement = 'on';
    config.series[0].minPointLength = 4;
    config.series[0].groupPadding = 0.1;

    config.series[0].tooltip = {
      pointFormatter: _ChartConfigs.fnATHPointFormatter,
      headerFormat: ''
    };
    return config;
  } else {
    return undefined;
  }
};

var _fnCreateConfigVolume = function _fnCreateConfigVolume(data, dataColumn) {
  if (data.length > 0) {
    var config = _ChartConfigs2.default.fBaseAreaConfig();
    config.title = _ChartConfigs2.default.fTitleMetric('Volume Chart');
    config.legend = _ChartConfigs2.default.legendVolume;
    config.credits = _ChartConfigs2.default.creditsMetric;

    config.chart.height = 140;
    config.chart.spacingTop = 8;
    config.chart.spacingBottom = 10;
    config.chart.zoomType = undefined;

    config.yAxis.opposite = true;
    config.yAxis.plotLines = [];

    config.series[0].data = data;
    config.series[0].zhValueText = "Volume";
    config.series[0].name = "Spline";

    config.series.push({
      type: "column",
      name: "Column",
      data: dataColumn,
      zhValueText: "Volume",
      visible: false,
      borderWidth: 0,
      pointPlacement: 'on',
      groupPadding: 0.1,
      states: {
        hover: {
          enabled: true,
          brightness: 0.07
        }
      },
      tooltip: {
        pointFormatter: _ChartConfigs.fnVolumePointFormatter,
        headerFormat: ''
      }
    });

    return config;
  } else {
    return undefined;
  }
};

var _fnCreateConfigHighLow = function _fnCreateConfigHighLow(data) {
  if (data.length > 0) {
    var config = _fnCreateIndicatorConfig();
    config.title = _ChartConfigs2.default.fTitleMetric('HighLow Chart');
    config.credits = _ChartConfigs2.default.creditsMetric;

    config.series[0].zhValueText = "HL";
    config.series[0].data = data;
    config.series[0].name = "HL";
    config.series[0].visible = true;
    config.series[0].type = "arearange";

    config.series[0].tooltip = {
      pointFormatter: _ChartConfigs2.default.pointFormatterHighLow,
      headerFormat: ''
    };

    return config;
  } else {
    return undefined;
  }
};

var _fnAddSeriesExDivident = function _fnAddSeriesExDivident(config, data) {
  if (data.length > 0) {
    config.series.push({
      type: 'scatter',
      color: 'green',
      tooltip: _ChartConfigs.tooltipExDivident,
      data: data
    });
  }
};

var _fnAddSeriesSplitRatio = function _fnAddSeriesSplitRatio(config, data) {
  if (data.length > 0) {
    config.series.push({
      type: 'scatter',
      color: ' #ED5813',
      tooltip: _ChartConfigs.tooltipSplitRatio,
      data: data
    });
  }
};

var _fnCheckIsMfi = function _fnCheckIsMfi(config, json, zhPoints) {
  var names = json.dataset.column_names;
  if (names[2] === 'High' && names[3] === 'Low' && names[4] === 'Close' && names[5] === 'Volume') {
    config.zhPoints = zhPoints;
    config.zhIsMfi = true;
    config.zhFnGetMfiConfig = _IndicatorSma.fnGetConfigMfi;
  }
};

var fnGetSeries = function fnGetSeries(config, json, yPointIndex) {

  config.info = _fnGetDatasetInfo(json);

  var _fnSeriesPipe2 = _fnSeriesPipe(json, yPointIndex);

  var seria = _fnSeriesPipe2.seria;
  var minPoint = _fnSeriesPipe2.minPoint;
  var maxPoint = _fnSeriesPipe2.maxPoint;
  var dataExDividend = _fnSeriesPipe2.dataExDividend;
  var dataSplitRatio = _fnSeriesPipe2.dataSplitRatio;
  var dataVolume = _fnSeriesPipe2.dataVolume;
  var dataVolumeColumn = _fnSeriesPipe2.dataVolumeColumn;
  var dataATH = _fnSeriesPipe2.dataATH;
  var dataHighLow = _fnSeriesPipe2.dataHighLow;
  var zhPoints = _fnSeriesPipe2.zhPoints;


  _fnCheckIsMfi(config, json, zhPoints);
  config.zhFnAddSeriesSma = _IndicatorSma.fnAddSeriesSma;
  config.zhFnRemoveSeries = _IndicatorSma.fnRemoveSeries;

  config.valueMoving = _fnGetValueMoving(seria);
  config.series[0].data = seria;

  config.xAxis.events = {
    afterSetExtremes: _ChartConfigs2.default.zoomMetricCharts
  };

  _fnAddSeriesExDivident(config, dataExDividend);
  _fnAddSeriesSplitRatio(config, dataSplitRatio);

  config.zhVolumeConfig = _fnCreateConfigVolume(dataVolume, dataVolumeColumn);
  config.zhATHConfig = _fnCreateConfigATH(dataATH);
  config.zhHighLowConfig = _fnCreateConfigHighLow(dataHighLow);

  return { config: config, minPoint: minPoint, maxPoint: maxPoint };
};

var fnConfigAxes = function fnConfigAxes(result) {
  var config = result.config;
  var minPoint = result.minPoint;
  var maxPoint = result.maxPoint;


  config.yAxis.plotLines[0].value = maxPoint;
  config.yAxis.plotLines[0].label.text = (0, _ChartConfigs.fnNumberFormat)(maxPoint);
  config.yAxis.plotLines[1].value = minPoint;
  config.yAxis.plotLines[1].label.text = (0, _ChartConfigs.fnNumberFormat)(minPoint);
  config.yAxis.opposite = true;

  config.xAxis = Object.assign({}, config.xAxis, fnGetXAxesConfig());

  return result;
};

var fnQuandlFlow = _lodash2.default.flow(fnGetSeries, fnConfigAxes);

QuandlAdapter.toConfig = function (json, yPointIndex) {
  var config = _ChartConfigs2.default.fBaseAreaConfig();
  return fnQuandlFlow(config, json, yPointIndex);
};

QuandlAdapter.toSeries = function (json, yPointIndex, chartId) {
  var data = json.dataset.data.map(function (point, index) {
    var arrDate = point[0].split('-');
    return [Date.UTC(arrDate[0], parseInt(arrDate[1], 10) - 1, arrDate[2]), point[yPointIndex]];
  });
  data = _lodash2.default.sortBy(data, '0');

  var valueText = chartId.length < 12 ? chartId : chartId.substring(0, 12),
      configSeries = _ChartConfigs2.default.fSeries();

  configSeries.zhValueText = valueText;
  configSeries.data = data;

  return configSeries;
};

exports.default = QuandlAdapter;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\QuandlAdapter.js.map