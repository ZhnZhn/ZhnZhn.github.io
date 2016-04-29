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

var fnGetDatasetInfo = function fnGetDatasetInfo(json) {
  var dataset = json.dataset;
  return {
    name: dataset.name,
    description: dataset.description,
    newest_available_date: dataset.newest_available_date,
    oldest_available_date: dataset.oldest_available_date,
    frequency: dataset.frequency
  };
};

var fnGetValueMoving = function fnGetValueMoving(seria) {
  var len = seria.length,
      nowValue = seria[len - 1][1],
      bWasValue = (0, _big2.default)(seria[len - 2][1]),
      bDelta = bWasValue.minus(nowValue),
      bPercent = bDelta.times(100).div(bWasValue.toString()).abs().toFixed(2);

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
      var marker = Object.assign(_lodash2.default.cloneDeep(_ChartConfigs.markerExDivident), { x: x, exValue: exValue, price: price });
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

  dataVolume.push([dateUTC, point[5]]);
  return result;
};

var _fnCreatePointFlow = function _fnCreatePointFlow(json) {
  var fnStep = [_fnConvertToUTC, _fnCheckExtrems, _fnAddToSeria],
      column_names = json.dataset.column_names;
  if (column_names[5] === "Volume") {
    fnStep.push(_fnAddVolume);
  }
  if (column_names[6] === "Ex-Dividend") {
    fnStep.push(_fnAddExDividend);
  }
  if (column_names[7] === "Split Ratio") {
    fnStep.push(_fnAddSplitRatio);
  }
  return _lodash2.default.flow(fnStep);
};

var fnSeriesPipe = function fnSeriesPipe(json, yPointIndex) {
  var fnPointsFlow = _fnCreatePointFlow(json),
      points = json.dataset.data,
      minPoint = Number.POSITIVE_INFINITY,
      maxPoint = Number.NEGATIVE_INFINITY,
      seria = [],
      dataExDividend = [],
      dataSplitRatio = [],
      dataVolume = [],
      result = {
    yPointIndex: yPointIndex, minPoint: minPoint, maxPoint: maxPoint, seria: seria,
    dataVolume: dataVolume, dataExDividend: dataExDividend, dataSplitRatio: dataSplitRatio
  };

  for (var i = 0, max = points.length; i < max; i++) {
    fnPointsFlow(points[i], result);
  }
  result.seria = _lodash2.default.sortBy(result.seria, '0');

  return result;
};

var fnGetSeries = function fnGetSeries(config, json, yPointIndex) {
  config.info = fnGetDatasetInfo(json);

  var result = fnSeriesPipe(json, yPointIndex);

  var seria = result.seria;
  var minPoint = result.minPoint;
  var maxPoint = result.maxPoint;
  var dataExDividend = result.dataExDividend;
  var dataSplitRatio = result.dataSplitRatio;
  var dataVolume = result.dataVolume;


  config.series[0].data = seria;

  if (dataExDividend.length > 0) {
    dataExDividend = _lodash2.default.sortBy(dataExDividend, 'x');
    config.series.push({
      type: 'scatter',
      color: 'green',
      tooltip: _ChartConfigs.tooltipExDivident,
      data: dataExDividend
    });
  }

  if (dataSplitRatio.length > 0) {
    dataSplitRatio = _lodash2.default.sortBy(dataSplitRatio, 'x');
    config.series.push({
      type: 'scatter',
      color: ' #ED5813',
      tooltip: _ChartConfigs.tooltipSplitRatio,
      data: dataSplitRatio
    });
  }

  config.valueMoving = fnGetValueMoving(seria);

  var configVolume = void 0;
  if (dataVolume.length > 0) {
    dataVolume = _lodash2.default.sortBy(dataVolume, '0');
    configVolume = _lodash2.default.cloneDeep(_ChartConfigs2.default.baseAreaConfig);
    configVolume.series[0].data = dataVolume;
    configVolume.series[0].zhValueText = "Volume";
    //configVolume.series[0].type = "column";
    configVolume.chart.height = 140;
    configVolume.chart.spacingTop = 8, configVolume.chart.spacingBottom = 10, configVolume.yAxis.opposite = true;
    configVolume.yAxis.plotLines = [];

    configVolume.credits = {
      position: {
        align: 'right',
        x: -10,
        verticalAlign: 'bottom',
        y: -5
      }
    };
  }
  config.zhVolumeConfig = configVolume;

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
  var config = _lodash2.default.cloneDeep(_ChartConfigs2.default.baseAreaConfig);
  return fnQuandlFlow(config, json, yPointIndex);
};

QuandlAdapter.toSeries = function (json, yPointIndex, chartId) {
  var data = json.dataset.data.map(function (point, index) {
    var arrDate = point[0].split('-');
    return [Date.UTC(arrDate[0], parseInt(arrDate[1], 10) - 1, arrDate[2]), point[yPointIndex]];
  });
  data = _lodash2.default.sortBy(data, '0');

  var valueText = chartId.length < 12 ? chartId : chartId.substring(0, 12),
      configSeries = _lodash2.default.cloneDeep(_ChartConfigs.configSeriesAdded);

  configSeries.zhValueText = valueText;
  configSeries.data = data;

  return configSeries;
};

exports.default = QuandlAdapter;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\QuandlAdapter.js.map