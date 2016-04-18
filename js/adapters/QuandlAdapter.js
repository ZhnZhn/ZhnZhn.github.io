'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _ChartConfigs = require('../constants/ChartConfigs');

var _ChartConfigs2 = _interopRequireDefault(_ChartConfigs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QuandlAdapter = {};

var addExDividend = function addExDividend(json, config, yPointIndex) {
   var dataExDividend = [];
   json.dataset.data.forEach(function (point) {
      if (point[6] !== 0) {
         var arrDate = point[0].split('-');
         var x = Date.UTC(arrDate[0], parseInt(arrDate[1], 10) - 1, arrDate[2]);
         var exValue = point[6];
         var price = point[yPointIndex];
         dataExDividend.push(Object.assign({}, _ChartConfigs.markerExDivident, { x: x, exValue: exValue, price: price }));
      }
   });

   if (dataExDividend.length > 0) {
      dataExDividend = _lodash2.default.sortBy(dataExDividend, 'x');
      config.series.push({
         type: 'scatter',
         color: 'green',
         tooltip: {
            headerFormat: '<span style="font-weight: bold; font-size: 12px; color:rgba(194,149,23,1);">{point.key}</span><br/>',
            pointFormat: '<span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Ex-Dividend: </span>' + '<span style="style="font-weight: bold; color: green;">{point.exValue}</span><br/>' + '<span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Stock Price: </span>' + '<span style="font-weight: bold; color:rgba(194,149,23,1);">{point.price}</span>'
         },
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
         tooltip: {
            style: {},
            headerFormat: '<span style="font-weight: bold; font-size: 12px; color:rgba(194,149,23,1);">{point.key}</span><br/>',
            pointFormat: '<span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Split Ratio: </span>' + '<span style="font-weight: bold; color: #ED5813;">{point.splitRatio}</span><br/>' + '<span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Stock Price: </span>' + '<span style="font-weight: bold; color:rgba(194,149,23,1);">{point.price}</span>'
         },
         data: dataSplitRatio
      });
   }
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

   config.yAxis.plotLines[0].value = maxPoint;
   config.yAxis.plotLines[0].label.text = maxPoint;
   config.yAxis.plotLines[1].value = minPoint;
   config.yAxis.plotLines[1].label.text = minPoint;

   config.yAxis.opposite = true;

   config.xAxis.opposite = true;
   config.xAxis.tickLength = 0;
   config.xAxis.tickPosition = 'inside';
   config.xAxis.labels.y = -5;

   config.info = {
      name: json.dataset.name,
      description: json.dataset.description,
      newest_available_date: json.dataset.newest_available_date,
      oldest_available_date: json.dataset.oldest_available_date,
      frequency: json.dataset.frequency
   };

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