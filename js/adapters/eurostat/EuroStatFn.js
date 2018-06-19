'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _ChartConfig = require('../../charts/ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

var _Chart = require('../../charts/Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _Tooltip = require('../../charts/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _QuandlFn = require('../QuandlFn2');

var _QuandlFn2 = _interopRequireDefault(_QuandlFn);

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

var _ChoroplethMapSlice = require('./ChoroplethMapSlice');

var _ChoroplethMapSlice2 = _interopRequireDefault(_ChoroplethMapSlice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var COLOR = {
  EU: "#0088FF",
  EA: "#FF5800",
  EU_MEMBER: "#7CB5EC"
};
var C = {
  EU_CODES: ["EU", "EU27", "EU28"],
  EA_CODES: ["EA", "EA18", "EA19"],
  EU_MEMBER: ["Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden", "United Kingdom"]
};

var _rFrequency = {
  default: '',
  m: 'Monthly',
  q: 'Quarterly'
};

var _is = function _is(value) {
  return function (element) {
    return element === value;
  };
};

var _colorSeria = function _colorSeria(config, categories, codes, color) {
  var data = config.series[0].data;
  codes.forEach(function (code) {
    var _index = categories.findIndex(_is(code));
    if (_index !== -1) {
      data[_index].color = color;
    }
  });
};

var EuroStatFn = (0, _extends3.default)({
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
  toPointArr: function toPointArr(timeIndex, value) {
    var data = [];
    Object.keys(timeIndex).map(function (key) {
      var pointValue = value[timeIndex[key]];
      if (!(pointValue == null)) {
        data.push([key.replace('M', '-'), pointValue]);
      }
    });

    return data;
  },
  setDataAndInfo: function setDataAndInfo(_ref) {
    var config = _ref.config,
        data = _ref.data,
        json = _ref.json,
        option = _ref.option;
    var title = option.title,
        subtitle = option.subtitle,
        _option$seriaType = option.seriaType,
        seriaType = _option$seriaType === undefined ? 'AREA' : _option$seriaType;

    _Chart2.default.setDefaultTitle(config, title, subtitle);

    config.zhConfig = this.createZhConfig(json, option);
    config.info = this.createDatasetInfo(json, option);

    if (seriaType && seriaType.toUpperCase() === 'AREA') {
      config.valueMoving = _AdapterFn2.default.valueMoving(data);
    }

    config.series[0].zhSeriaId = option.key;
    config.series[0].data = data;
  },
  setInfo: function setInfo(_ref2) {
    var config = _ref2.config,
        json = _ref2.json,
        option = _ref2.option;

    config.info = this.createDatasetInfo(json, option);
  },
  setCategories: function setCategories(_ref3) {
    var config = _ref3.config,
        categories = _ref3.categories,
        min = _ref3.min,
        time = _ref3.time,
        subtitle = _ref3.subtitle,
        _ref3$tooltip = _ref3.tooltip,
        tooltip = _ref3$tooltip === undefined ? _Tooltip2.default.category : _ref3$tooltip;

    config.xAxis.categories = categories;
    config.yAxis.min = min;
    config.series[0].name = time;
    config.tooltip = _Chart2.default.fTooltip(tooltip);

    config.zhConfig.itemCaption = 'EU: ' + subtitle;
    config.zhConfig.itemTime = time;
  },
  colorEU: function colorEU(_ref4) {
    var config = _ref4.config,
        categories = _ref4.categories;

    _colorSeria(config, categories, C.EU_CODES, COLOR.EU);
    _colorSeria(config, categories, C.EA_CODES, COLOR.EA);
    _colorSeria(config, categories, C.EU_MEMBER, COLOR.EU_MEMBER);
  },
  setTooltip: function setTooltip(_ref5) {
    var config = _ref5.config,
        tooltip = _ref5.tooltip;

    config.tooltip = _Chart2.default.fTooltip(tooltip);
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
  setLineExtrems: function setLineExtrems(_ref6) {
    var config = _ref6.config,
        max = _ref6.max,
        min = _ref6.min,
        isNotZoomToMinMax = _ref6.isNotZoomToMinMax;

    var plotLines = config.yAxis.plotLines;

    if (max > Number.NEGATIVE_INFINITY) {
      plotLines[0].value = max;
      plotLines[0].label.text = _ChartConfig2.default.fnNumberFormat(max);
    }
    if (min < Number.POSITIVE_INFINITY) {
      plotLines[1].value = min;
      plotLines[1].label.text = _ChartConfig2.default.fnNumberFormat(min);
    }

    if (!isNotZoomToMinMax) {
      config.yAxis.min = _Chart2.default.calcMinY({ maxPoint: max, minPoint: min });
    }
  },
  createZhConfig: function createZhConfig(json, option) {
    var href = json.href,
        _href = href && href.replace ? href.replace('http', 'https') : href,
        key = option.key,
        itemCaption = option.itemCaption,
        dataSource = option.dataSource,
        dfTable = option.dfTable;

    return {
      id: key,
      key: key,
      itemCaption: itemCaption,
      isWithoutIndicator: true,
      isWithoutAdd: true,
      dataSource: dataSource,
      linkFn: 'ES',
      item: {
        dataset: dfTable,
        href: _href
      }
    };
  },
  createDatasetInfo: function createDatasetInfo(json, option) {
    var _option$group = option.group,
        group = _option$group === undefined ? '' : _option$group,
        arr = group.split('_'),
        _frequency = _rFrequency[arr[arr.length - 1]] ? _rFrequency[arr[arr.length - 1]] : _rFrequency.default,
        _ext = json.extension || {},
        datasetId = _ext.datasetId,
        subTitle = _ext.subTitle,
        _id = datasetId ? 'DatasetId: ' + datasetId + '.' : '',
        _sub = subTitle ? 'Metric: ' + subTitle + '.' : '',
        _d = _ext.description || '',
        _descr = (_d + ' ' + _id + ' ' + _sub).trim();

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