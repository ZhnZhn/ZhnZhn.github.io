'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ChartConfig = require('../../charts/ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

var _Chart = require('../../charts/Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _Tooltip = require('../../charts/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DF_SLICE_TITLE = 'EU';

//import QuandlFn2 from '../quandl/QuandlFn2';


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

var _crDescr = function _crDescr(extension) {
  var _ext = extension || {},
      datasetId = _ext.datasetId,
      subTitle = _ext.subTitle,
      _id = datasetId ? 'DatasetId: ' + datasetId + '.' : '',
      _sub = subTitle ? 'Metric: ' + subTitle + '.' : '',
      _d = _ext.description || '';

  return (_d + ' ' + _id + ' ' + _sub).trim();
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

var _isDataDes = function _isDataDes(d) {
  return d.length > 0 && d[0][0] > d[d.length - 1][0];
};

var EuroStatFn = {
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

    return {
      data: _isDataDes(data) ? data.reverse() : data,
      max: max, min: min
    };
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
    config.info = this.createDatasetInfo(json);

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

    config.info = this.createDatasetInfo(json);
  },
  setCategories: function setCategories(_ref3) {
    var config = _ref3.config,
        categories = _ref3.categories,
        min = _ref3.min,
        _ref3$tooltip = _ref3.tooltip,
        tooltip = _ref3$tooltip === undefined ? _Tooltip2.default.category : _ref3$tooltip,
        option = _ref3.option;
    var time = option.time;

    config.xAxis.categories = categories;
    config.yAxis.min = min;
    config.series[0].name = time;
    config.tooltip = _Chart2.default.fTooltip(tooltip);

    config.zhConfig.itemCaption = EuroStatFn.crItemCaption(option);
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
    }
    if (str.indexOf('Q') !== -1) {
      var _arrDate = str.split('Q'),
          _month2 = parseInt(_arrDate[1], 10) * 3 - 1;
      return Date.UTC(_arrDate[0], _month2, 30);
    }
    if (str.indexOf('S' !== -1)) {
      var _arrS = str.split('S');
      return _arrS[1] === '1' ? Date.UTC(_arrS[0], 5, 30) : Date.UTC(_arrS[0], 11, 31);
    }
    return Date.UTC(str, 11, 31);
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


  crItemCaption: function crItemCaption(_ref7) {
    var subtitle = _ref7.subtitle,
        dfSliceTitle = _ref7.dfSliceTitle;

    var _pre = dfSliceTitle || DF_SLICE_TITLE;
    return _pre + ': ' + (subtitle || '');
  },

  createZhConfig: function createZhConfig(json, option) {
    var href = json.href,
        _href = href && href.replace ? href.replace('http', 'https') : href,
        key = option.key,
        itemCaption = option.itemCaption,
        dataSource = option.dataSource,
        dfTable = option.dfTable,
        _dataSource = dfTable ? dataSource + ' (' + dfTable + ')' : dataSource;

    return {
      id: key,
      key: key,
      itemCaption: itemCaption,
      isWithoutIndicator: true,
      isWithoutAdd: true,
      dataSource: _dataSource,
      linkFn: 'ES',
      item: {
        dataset: dfTable,
        href: _href
      }
    };
  },
  createDatasetInfo: function createDatasetInfo(json) {
    var label = json.label,
        updated = json.updated,
        extension = json.extension,
        _descr = _crDescr(extension);

    return {
      name: label,
      description: _descr,
      newest_available_date: updated,
      oldest_available_date: '1996-01-30'
    };
  },
  findMinY: function findMinY(data) {
    return _AdapterFn2.default.findMinY(data);
    //return QuandlFn2.findMinY(data);
  }
};

exports.default = EuroStatFn;
//# sourceMappingURL=EuroStatFn.js.map