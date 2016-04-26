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

var addExDividend = function addExDividend(json, config, yPointIndex) {
  var dataExDividend = [];
  json.dataset.data.forEach(function (point) {
    if (point[6] !== 0) {
      var arrDate = point[0].split('-'),
          x = Date.UTC(arrDate[0], parseInt(arrDate[1], 10) - 1, arrDate[2]),
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
  });

  if (dataExDividend.length > 0) {
    dataExDividend = _lodash2.default.sortBy(dataExDividend, 'x');
    config.series.push({
      type: 'scatter',
      color: 'green',
      tooltip: _ChartConfigs.tooltipExDivident,
      data: dataExDividend
    });
  }
};

var addSplitRatio = function addSplitRatio(json, config, yPointIndex) {
  var dataSplitRatio = [];
  json.dataset.data.forEach(function (point) {
    if (point[7] !== 1) {
      var arrDate = point[0].split('-');
      var x = Date.UTC(arrDate[0], parseInt(arrDate[1], 10) - 1, arrDate[2]);
      var splitRatio = point[7];
      var price = point[yPointIndex];
      dataSplitRatio.push(Object.assign({}, _ChartConfigs.markerSplitRatio, { x: x, splitRatio: splitRatio, price: price }));
    }
  });

  if (dataSplitRatio.length > 0) {
    dataSplitRatio = _lodash2.default.sortBy(dataSplitRatio, 'x');
    config.series.push({
      type: 'scatter',
      color: '#ED5813',
      tooltip: _ChartConfigs.tooltipSplitRatio,
      data: dataSplitRatio
    });
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

var fnGetYAxesConfig = function fnGetYAxesConfig(maxPoint, minPoint) {
  var plotLines = [{
    value: maxPoint,
    label: {
      text: maxPoint
    }
  }, {
    value: minPoint,
    label: {
      text: minPoint
    }
  }];

  plotLines[0].value = maxPoint;
  plotLines[0].label.text = maxPoint;
  plotLines[1].value = minPoint;
  plotLines[1].label.text = minPoint;

  return {
    opposite: true,
    plotLines: plotLines
  };
};

var fnGetDatasetInfo = function fnGetDatasetInfo(json) {
  return {
    name: json.dataset.name,
    description: json.dataset.description,
    newest_available_date: json.dataset.newest_available_date,
    oldest_available_date: json.dataset.oldest_available_date,
    frequency: json.dataset.frequency
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
    value: nowValue,
    delta: bDelta.abs().toString(),
    percent: bPercent.toString() + '%',
    direction: direction
  };
};

QuandlAdapter.toConfig = function (json, yPointIndex) {
  var minPoint = Number.POSITIVE_INFINITY;
  var maxPoint = Number.NEGATIVE_INFINITY;
  var seria = json.dataset.data.map(function (point, index) {
    var arrDate = point[0].split('-');

    if (point[yPointIndex] >= maxPoint) {
      maxPoint = point[yPointIndex];
    }
    if (point[yPointIndex] <= minPoint) {
      minPoint = point[yPointIndex];
    }

    return [Date.UTC(arrDate[0], parseInt(arrDate[1], 10) - 1, arrDate[2]), point[yPointIndex]];
  });

  var config = _lodash2.default.cloneDeep(_ChartConfigs2.default.baseAreaConfig);

  seria = _lodash2.default.sortBy(seria, '0');

  config.series[0].data = seria;

  config.valueMoving = fnGetValueMoving(seria);

  //config.yAxis = fnGetYAxesConfig(maxPoint, minPoint);

  config.yAxis.plotLines[0].value = maxPoint;
  config.yAxis.plotLines[0].label.text = maxPoint;
  config.yAxis.plotLines[1].value = minPoint;
  config.yAxis.plotLines[1].label.text = minPoint;

  config.yAxis.opposite = true;

  config.xAxis = Object.assign({}, config.xAxis, fnGetXAxesConfig());
  config.info = fnGetDatasetInfo(json);

  if (json.dataset.column_names[6] === "Ex-Dividend") {
    addExDividend(json, config, yPointIndex);
  }
  if (json.dataset.column_names[7] === "Split Ratio") {
    addSplitRatio(json, config, yPointIndex);
  }

  return config;
};

exports.default = QuandlAdapter;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\QuandlAdapter.js.map