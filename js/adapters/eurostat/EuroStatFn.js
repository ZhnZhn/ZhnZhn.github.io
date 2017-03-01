'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ChartConfig = require('../../charts/ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

var _Chart = require('../../charts/Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _QuandlFn = require('../QuandlFn2');

var _QuandlFn2 = _interopRequireDefault(_QuandlFn);

var _ChoroplethMapSlice = require('./ChoroplethMapSlice');

var _ChoroplethMapSlice2 = _interopRequireDefault(_ChoroplethMapSlice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SPAN_UNIT = '<span style="color:#1b75bb;font-weight:bold;">Unit: </span>';

var _rFrequency = {
  default: '',
  m: 'Monthly',
  q: 'Quarterly'
};

var _crDataSourceLink = function _crDataSourceLink(json) {
  var href = json.href;

  return href ? '<a href=' + href + '>Eurostat Data Link</a>' : '';
};

var _crSubTitle = function _crSubTitle(subTitle) {
  return '<span style="color:black;font-weight:bold;">' + subTitle + '</span>';
};

var EuroStatFn = _extends({
  createData: function createData(timeIndex, value) {
    var _this = this;

    var data = [];
    var max = Number.NEGATIVE_INFINITY,
        min = Number.POSITIVE_INFINITY;

    Object.keys(timeIndex).map(function (key) {
      var pointValue = value[timeIndex[key]];
      if (!(pointValue == null)) {
        data.push([_this.convertToUTC(key), pointValue]);

        if (pointValue >= max) {
          max = pointValue;
        }
        if (pointValue <= min) {
          min = pointValue;
        }
      }
    });

    return { data: data, max: max, min: min };
  },
  setDataAndInfo: function setDataAndInfo(_ref) {
    var config = _ref.config,
        data = _ref.data,
        json = _ref.json,
        option = _ref.option;
    var title = option.title,
        subtitle = option.subtitle,
        seriaType = option.seriaType;

    _Chart2.default.setDefaultTitle(config, title, subtitle);

    config.zhConfig = this.createZhConfig(option);
    config.info = this.createDatasetInfo(json, option);

    if (seriaType === 'AREA') {
      config.valueMoving = _QuandlFn2.default.createValueMovingFromSeria(data);
    }
    config.series[0].zhSeriaId = option.key;
    config.series[0].data = data;
  },
  setCategories: function setCategories(_ref2) {
    var config = _ref2.config,
        categories = _ref2.categories,
        min = _ref2.min,
        time = _ref2.time,
        subtitle = _ref2.subtitle;

    config.xAxis.categories = categories;
    config.yAxis.min = min;
    config.series[0].name = time;

    config.zhConfig.itemCaption = 'EU:' + subtitle;
    config.zhConfig.itemTime = time;
  },
  convertToUTC: function convertToUTC(str) {
    if (str.indexOf('M') !== -1) {
      var arrDate = str.split('M'),
          _month = parseInt(arrDate[1], 10) - 1,
          _day = _month === 1 ? 28 : 30;

      return Date.UTC(arrDate[0], _month, _day);
    } else if (str.indexOf('Q') !== -1) {
      var _arrDate = str.split('Q'),
          _month2 = parseInt(_arrDate[1], 10) * 3 - 1;

      return Date.UTC(_arrDate[0], _month2, 30);
    } else {
      return Date.UTC(str, 11, 31);
    }
  },
  setLineExtrems: function setLineExtrems(_ref3) {
    var config = _ref3.config,
        max = _ref3.max,
        min = _ref3.min;

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
    var key = option.key,
        itemCaption = option.itemCaption;

    return {
      id: key,
      key: key,
      itemCaption: itemCaption,
      isWithoutIndicator: true,
      isWithoutAdd: true
    };
  },
  createDatasetInfo: function createDatasetInfo(json, option) {
    var _option$group = option.group,
        group = _option$group === undefined ? '' : _option$group,
        arr = group.split('_'),
        _frequency = _rFrequency[arr[arr.length - 1]] ? _rFrequency[arr[arr.length - 1]] : _rFrequency.default,
        _json$extension = json.extension,
        extension = _json$extension === undefined ? {} : _json$extension,
        description = extension.description,
        subTitle = extension.subTitle;

    var _descr = '';
    if (subTitle) {
      _descr = SPAN_UNIT + _crSubTitle(subTitle) + '<br>';
    }
    if (description) {
      _descr = _descr + description + '<br>';
    }
    _descr = _descr + _crDataSourceLink(json);

    return {
      name: json.label,
      description: _descr,
      newest_available_date: json.updated,
      oldest_available_date: '1996-01-30',
      frequency: _frequency
    };
  },
  findMinY: function findMinY(data) {
    return _QuandlFn2.default.findMinY(data);
  }
}, _ChoroplethMapSlice2.default);

exports.default = EuroStatFn;
//# sourceMappingURL=EuroStatFn.js.map