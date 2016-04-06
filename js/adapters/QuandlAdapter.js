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

   var config = Object.assign({}, _ChartConfigs2.default.baseAreaConfig);

   seria = _lodash2.default.sortBy(seria, '0');

   config.series[0].data = seria;

   config.yAxis.plotLines[0].value = maxPoint;
   config.yAxis.plotLines[0].label.text = maxPoint;
   config.yAxis.plotLines[1].value = minPoint;
   config.yAxis.plotLines[1].label.text = minPoint;

   config.info = {
      name: json.dataset.name,
      description: json.dataset.description,
      newest_available_date: json.dataset.newest_available_date,
      oldest_available_date: json.dataset.oldest_available_date,
      frequency: json.dataset.frequency
   };

   return config;
};

exports.default = QuandlAdapter;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\QuandlAdapter.js.map