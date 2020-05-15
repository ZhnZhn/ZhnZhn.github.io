"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _Chart = _interopRequireDefault(require("../../charts/Chart"));

var _ChartFn = _interopRequireDefault(require("../../charts/ChartFn"));

var _Tooltip = _interopRequireDefault(require("../../charts/Tooltip"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var setPlotLinesMinMax = _ChartFn["default"].setPlotLinesMinMax;
var compareByDate = _AdapterFn["default"].compareByDate,
    valueMoving = _AdapterFn["default"].valueMoving,
    findMinY = _AdapterFn["default"].findMinY,
    joinBy = _AdapterFn["default"].joinBy,
    crItemConf = _AdapterFn["default"].crItemConf;
var COLOR = {
  EU: "#0088ff",
  EA: "#ff5800",
  NOT_EU_MEMBER: '#8085e9'
};
var C = {
  EU_CODES: ["EU", "EU28", "EU27_2020", "G20", "Group of Twenty"],
  EA_CODES: ["EA", "EA11", "EA12", "EA13", "EA15", "EA16", "EA17", "EA18", "EA19"],
  EU_MEMBER: ["Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czechia", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden"]
};

var _crDescr = function _crDescr(extension) {
  var _ext = extension || {},
      datasetId = _ext.datasetId,
      subTitle = _ext.subTitle,
      _id = "DatasetId: " + datasetId,
      _sub = subTitle ? "Metric: " + subTitle : '',
      _d = _ext.description || '';

  return (_d + " " + _id + " " + _sub).trim();
};

var _colorSeriaIn = function _colorSeriaIn(config, codes, color) {
  var data = config.series[0].data;
  data.forEach(function (p) {
    if (codes.indexOf(p.c) !== -1 && !p.color) {
      p.color = color;
    }
  });
};

var _colorSeriaNotIn = function _colorSeriaNotIn(config, codes, color) {
  var data = config.series[0].data;
  data.forEach(function (p) {
    if (codes.indexOf(p.c) === -1 && !p.color) {
      p.color = color;
    }
  });
};

var _isLineSeria = function _isLineSeria(type) {
  return type && (type === 'AREA' || type === 'SPLINE');
};

var _filterZeroCategories = function _filterZeroCategories(data, categories) {
  var _data = [],
      _arrC = [];
  data.forEach(function (p) {
    if (p.y !== 0) {
      _data.push(p);
    } else {
      _arrC.push(p.c);
    }
  });

  if (_arrC.length !== 0) {
    categories = categories.filter(function (c) {
      return _arrC.indexOf(c) === -1;
    });
  }

  return {
    data: _data,
    categories: categories
  };
};

var _isYearOrMapFrequencyKey = function _isYearOrMapFrequencyKey(key, mapFrequency) {
  return !mapFrequency || mapFrequency === "Y" || key.indexOf(mapFrequency) !== -1;
};

var EuroStatFn = {
  joinBy: joinBy,
  createData: function createData(timeIndex, value, mapFrequency) {
    var data = [];
    var max = Number.NEGATIVE_INFINITY,
        min = Number.POSITIVE_INFINITY;
    Object.keys(timeIndex).forEach(function (key) {
      if (_isYearOrMapFrequencyKey(key, mapFrequency)) {
        var y = value[timeIndex[key]];

        if (y != null) {
          data.push([EuroStatFn.convertToUTC(key), y]);

          if (y >= max) {
            max = y;
          }

          if (y <= min) {
            min = y;
          }
        }
      }
    });
    return {
      data: data.sort(compareByDate),
      max: max,
      min: min
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
        seriaType = option.seriaType;

    _Chart["default"].setDefaultTitle(config, title, subtitle);

    config.zhConfig = EuroStatFn.createZhConfig(json, option);
    config.info = EuroStatFn.createDatasetInfo(json);

    if (_isLineSeria(seriaType)) {
      config.valueMoving = valueMoving(data);
    }

    config.series[0].zhSeriaId = option.key;
    config.series[0].data = data;
  },
  setInfo: function setInfo(_ref2) {
    var config = _ref2.config,
        json = _ref2.json,
        option = _ref2.option;
    config.info = EuroStatFn.createDatasetInfo(json);
  },
  setCategories: function setCategories(_ref3) {
    var config = _ref3.config,
        categories = _ref3.categories,
        min = _ref3.min,
        _ref3$tooltip = _ref3.tooltip,
        tooltip = _ref3$tooltip === void 0 ? _Tooltip["default"].category : _ref3$tooltip,
        option = _ref3.option;
    var time = option.time,
        isNotZoomToMinMax = option.isNotZoomToMinMax;
    config.xAxis.categories = categories;

    if (isNotZoomToMinMax) {
      config.yAxis.zhNotZoomToMinMax = true;
    } else {
      config.yAxis.min = min;
    }

    config.series[0].name = time;
    config.tooltip = _Chart["default"].fTooltip(tooltip);
    config.zhConfig.itemCaption = EuroStatFn.crItemCaption(option);
    config.zhConfig.itemTime = time;
  },
  colorSeries: function colorSeries(config) {
    _colorSeriaIn(config, C.EU_CODES, COLOR.EU);

    _colorSeriaIn(config, C.EA_CODES, COLOR.EA);

    _colorSeriaNotIn(config, C.EU_MEMBER, COLOR.NOT_EU_MEMBER);
  },
  addToCategoryConfig: function addToCategoryConfig(config, _ref4) {
    var json = _ref4.json,
        option = _ref4.option,
        data = _ref4.data,
        categories = _ref4.categories,
        min = _ref4.min;

    if (option.isFilterZero) {
      var _r = _filterZeroCategories(data, categories);

      data = _r.data;
      categories = _r.categories;
    }

    EuroStatFn.setDataAndInfo({
      config: config,
      data: data,
      json: json,
      option: option
    });
    EuroStatFn.setCategories({
      config: config,
      categories: categories,
      min: min,
      option: option
    });
    EuroStatFn.colorSeries(config);
  },
  setTooltip: function setTooltip(_ref5) {
    var config = _ref5.config,
        tooltip = _ref5.tooltip;
    config.tooltip = _Chart["default"].fTooltip(tooltip);
  },
  crCategoryTooltip: function crCategoryTooltip() {
    return _Chart["default"].fTooltip(_Tooltip["default"].categorySimple);
  },
  convertToUTC: function convertToUTC(str) {
    var _period = (str && str[4] || '').toUpperCase();

    if (_period === 'M') {
      var arrDate = str.split('M'),
          _month = parseInt(arrDate[1], 10) - 1,
          _day = _month === 1 ? 28 : 30;

      return Date.UTC(arrDate[0], _month, _day);
    }

    if (_period === 'Q') {
      var _arrDate = str.split('Q'),
          _month2 = parseInt(_arrDate[1], 10) * 3 - 1;

      return Date.UTC(_arrDate[0], _month2, 30);
    }

    if (_period === 'S') {
      var _arrS = str.split('S');

      return _arrS[1] === '1' ? Date.UTC(_arrS[0], 5, 30) : Date.UTC(_arrS[0], 11, 31);
    }

    return parseInt(str, 10) > 1970 ? Date.UTC(str, 11, 31) : Date.UTC(1970, 11, 31);
  },
  setLineExtrems: function setLineExtrems(_ref6) {
    var config = _ref6.config,
        max = _ref6.max,
        min = _ref6.min,
        isNotZoomToMinMax = _ref6.isNotZoomToMinMax;
    var plotLines = config.yAxis.plotLines;
    setPlotLinesMinMax({
      plotLines: plotLines,
      min: min,
      max: max
    });

    if (!isNotZoomToMinMax) {
      config.yAxis.min = _Chart["default"].calcMinY({
        maxPoint: max,
        minPoint: min
      });
    }
  },
  crItemCaption: function crItemCaption(_ref7) {
    var title = _ref7.title;
    return joinBy(": ", "EU", title);
  },
  crDataSource: function crDataSource(_ref8) {
    var dfTable = _ref8.dfTable,
        dataSource = _ref8.dataSource;
    return dfTable ? dataSource + " (" + dfTable + ")" : dataSource || "Eurostat";
  },
  crLinkConf: function crLinkConf(json, _ref9) {
    var dfTable = _ref9.dfTable;

    var href = json.href,
        _href = href && href.replace ? href.replace('http', 'https') : href;

    return {
      linkFn: 'ES',
      item: {
        dataset: dfTable,
        href: _href
      }
    };
  },
  createZhConfig: function createZhConfig(json, option) {
    var key = option.key,
        itemCaption = option.itemCaption,
        url = option.url,
        dataSource = EuroStatFn.crDataSource(option),
        itemConf = url ? (0, _extends2["default"])({
      _itemKey: key
    }, crItemConf(option), {
      dataSource: dataSource
    }) : void 0;
    return (0, _extends2["default"])({
      id: key,
      key: key,
      itemCaption: itemCaption,
      itemConf: itemConf,
      dataSource: dataSource
    }, EuroStatFn.crLinkConf(json, option));
  },
  createDatasetInfo: function createDatasetInfo(_ref10) {
    var label = _ref10.label,
        updated = _ref10.updated,
        extension = _ref10.extension;
    return {
      name: label,
      description: _crDescr(extension),
      toDate: updated,
      fromDate: '1996-01-30'
    };
  },
  findMinY: findMinY,
  crTimeIndexAndValue: function crTimeIndexAndValue(json) {
    var _json$dimension = json.dimension,
        dimension = _json$dimension === void 0 ? {} : _json$dimension,
        _json$value = json.value,
        value = _json$value === void 0 ? [] : _json$value,
        _dimension$time = dimension.time,
        time = _dimension$time === void 0 ? {} : _dimension$time,
        _time$category = time.category,
        category = _time$category === void 0 ? {} : _time$category,
        _category$index = category.index,
        timeIndex = _category$index === void 0 ? 0 : _category$index;
    return {
      timeIndex: timeIndex,
      value: value
    };
  }
};
var _default = EuroStatFn;
exports["default"] = _default;
//# sourceMappingURL=EuroStatFn.js.map