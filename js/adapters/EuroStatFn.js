'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ChartConfig = require('../charts/ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

var _Chart = require('../charts/Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _QuandlFn = require('./QuandlFn2');

var _QuandlFn2 = _interopRequireDefault(_QuandlFn);

var _DateUtils = require('../utils/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EuroStatFn = {
  setDataAndInfo: function setDataAndInfo(_ref) {
    var config = _ref.config;
    var data = _ref.data;
    var json = _ref.json;
    var option = _ref.option;
    var title = option.title;
    var subtitle = option.subtitle;

    _Chart2.default.setDefaultTitle(config, title, subtitle);

    config.zhConfig = this.createZhConfig(option);
    config.info = this.createDatasetInfo(json);

    config.valueMoving = _QuandlFn2.default.createValueMovingFromSeria(data);
    config.valueMoving.date = _DateUtils2.default.formatTo(data[data.length - 1][0]);
    config.series[0].zhSeriaId = option.key;
    config.series[0].data = data;
  },
  convertToUTC: function convertToUTC(str) {
    if (str.indexOf('M') !== -1) {
      var arrDate = str.split('M'),
          _month = parseInt(arrDate[1], 10) - 1,
          _day = _month === 1 ? 28 : 30;

      return Date.UTC(arrDate[0], _month, _day);
    }
    if (str.indexOf('Q') !== -1) {
      var _arrDate = str.split('Q'),
          _month2 = parseInt(_arrDate[1], 10) * 3 - 1;

      return Date.UTC(_arrDate[0], _month2, 30);
    }
  },
  setLineExtrems: function setLineExtrems(_ref2) {
    var config = _ref2.config;
    var max = _ref2.max;
    var min = _ref2.min;

    var plotLines = config.yAxis.plotLines;

    if (max > Number.NEGATIVE_INFINITY) {
      plotLines[0].value = max;
      plotLines[0].label.text = _ChartConfig2.default.fnNumberFormat(max);
    }
    if (min < Number.POSITIVE_INFINITY) {
      plotLines[1].value = min;
      plotLines[1].label.text = _ChartConfig2.default.fnNumberFormat(min);
    }

    config.yAxis.min = _Chart2.default.calcMinY({ maxPoint: max, minPoint: min });
  },
  createZhConfig: function createZhConfig(option) {
    return {
      id: option.key,
      key: option.key,
      itemCaption: option.itemCaption,
      isWithoutIndicator: true,
      isWithoutAdd: true
    };
  },
  createDatasetInfo: function createDatasetInfo(json) {
    return {
      name: json.label,
      description: '<a href=' + json.href + '>EuroStat Data Link</a>',
      newest_available_date: json.updated,
      oldest_available_date: '1996-01-30',
      frequency: 'Monthly'
    };
  },
  findMinY: function findMinY(data) {
    return _QuandlFn2.default.findMinY(data);
  }
};

exports.default = EuroStatFn;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\EuroStatFn.js.map