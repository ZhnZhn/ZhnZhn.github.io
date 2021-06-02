"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _Chart = _interopRequireDefault(require("../../charts/Chart"));

var _ChartFn = _interopRequireDefault(require("../../charts/ChartFn"));

var _Tooltip = _interopRequireDefault(require("../../charts/Tooltip"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var calcMinY = _ChartFn["default"].calcMinY,
    setPlotLinesMinMax = _ChartFn["default"].setPlotLinesMinMax;
var compareByDate = _AdapterFn["default"].compareByDate,
    valueMoving = _AdapterFn["default"].valueMoving,
    findMinY = _AdapterFn["default"].findMinY,
    findMaxY = _AdapterFn["default"].findMaxY,
    filterTrimZero = _AdapterFn["default"].filterTrimZero,
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
      _id = "Dataset: " + datasetId,
      _sub = subTitle ? "Metric: " + subTitle : '',
      _d = _ext.description || '';

  return (_d + " " + _id + " " + _sub).trim();
};

var _crDatasetInfo = function _crDatasetInfo(_ref) {
  var label = _ref.label,
      updated = _ref.updated,
      extension = _ref.extension;
  return {
    name: label,
    description: _crDescr(extension),
    toDate: updated,
    fromDate: '1996-01-30'
  };
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

var _crPoint = function _crPoint(x, y, status) {
  return status && status !== ':' && status.length === 1 ? [x, y, status] : [x, y];
};

var _setZoomMinMaxTo = function _setZoomMinMaxTo(config, isNotZoomToMinMax, min) {
  if (isNotZoomToMinMax) {
    config.yAxis.zhNotZoomToMinMax = true;
  } else {
    config.yAxis.min = min;
  }
};

var _setHeightIfBarTo = function _setHeightIfBarTo(config, seriaType, categories) {
  if (seriaType === 'BAR_SET' || seriaType === 'BAR_WITH_LABELS') {
    var height = config.chart.height,
        _height = 100 + 17 * categories.length;

    config.chart.height = _height < height ? _height : height;
  }
};

var EuroStatFn = {
  joinBy: joinBy,
  findMinY: findMinY,
  crData: function crData(json, _temp) {
    var _ref2 = _temp === void 0 ? {} : _temp,
        mapFrequency = _ref2.mapFrequency,
        isFilterZero = _ref2.isFilterZero;

    var _EuroStatFn$crTimeInd = EuroStatFn.crTimeIndexAndValue(json),
        timeIndex = _EuroStatFn$crTimeInd.timeIndex,
        value = _EuroStatFn$crTimeInd.value,
        status = _EuroStatFn$crTimeInd.status;

    var data = [];
    Object.keys(timeIndex).forEach(function (key) {
      if (_isYearOrMapFrequencyKey(key, mapFrequency)) {
        var _valueIndex = timeIndex[key],
            y = value[_valueIndex];

        if (y != null) {
          data.push(_crPoint(EuroStatFn.convertToUTC(key), y, status[_valueIndex]));
        }
      }
    });
    data.sort(compareByDate);

    if (isFilterZero) {
      data = filterTrimZero(data);
    }

    return {
      data: data,
      max: findMaxY(data),
      min: findMinY(data)
    };
  },
  toPointArr: function toPointArr(json) {
    var _EuroStatFn$crTimeInd2 = EuroStatFn.crTimeIndexAndValue(json),
        timeIndex = _EuroStatFn$crTimeInd2.timeIndex,
        value = _EuroStatFn$crTimeInd2.value,
        status = _EuroStatFn$crTimeInd2.status,
        data = [];

    Object.keys(timeIndex).map(function (key) {
      var _valueIndex = timeIndex[key],
          y = value[_valueIndex];

      if (y != null) {
        data.push(_crPoint(key.replace('M', '-'), y, status[_valueIndex]));
      }
    });
    return data;
  },
  setDataAndInfo: function setDataAndInfo(_ref3) {
    var config = _ref3.config,
        data = _ref3.data,
        json = _ref3.json,
        option = _ref3.option;
    var title = option.title,
        subtitle = option.subtitle,
        seriaType = option.seriaType;

    _Chart["default"].setDefaultTitle(config, title, subtitle);

    config.zhConfig = EuroStatFn.crZhConfig(option);
    config.info = _crDatasetInfo(json);

    if (_isLineSeria(seriaType)) {
      config.valueMoving = valueMoving(data);
    }

    config.series[0].data = data;
  },
  setInfo: function setInfo(_ref4) {
    var config = _ref4.config,
        json = _ref4.json,
        option = _ref4.option;
    config.info = _crDatasetInfo(json);
  },
  setCategories: function setCategories(_ref5) {
    var config = _ref5.config,
        categories = _ref5.categories,
        min = _ref5.min,
        _ref5$tooltip = _ref5.tooltip,
        tooltip = _ref5$tooltip === void 0 ? _Tooltip["default"].category : _ref5$tooltip,
        option = _ref5.option;
    var time = option.time,
        isNotZoomToMinMax = option.isNotZoomToMinMax,
        seriaType = option.seriaType;
    config.xAxis.categories = categories;

    _setZoomMinMaxTo(config, isNotZoomToMinMax, min);

    config.series[0].name = time;
    config.tooltip = _Chart["default"].fTooltip(tooltip);
    config.zhConfig.itemCaption = EuroStatFn.crItemCaption(option);
    config.zhConfig.itemTime = time;

    _setHeightIfBarTo(config, seriaType, categories);
  },
  colorSeries: function colorSeries(config) {
    _colorSeriaIn(config, C.EU_CODES, COLOR.EU);

    _colorSeriaIn(config, C.EA_CODES, COLOR.EA);

    _colorSeriaNotIn(config, C.EU_MEMBER, COLOR.NOT_EU_MEMBER);
  },
  addToCategoryConfig: function addToCategoryConfig(config, _ref6) {
    var json = _ref6.json,
        option = _ref6.option,
        data = _ref6.data,
        categories = _ref6.categories,
        min = _ref6.min;

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
  setTooltip: function setTooltip(_ref7) {
    var config = _ref7.config,
        tooltip = _ref7.tooltip;
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
  setLineExtrems: function setLineExtrems(_ref8) {
    var config = _ref8.config,
        max = _ref8.max,
        min = _ref8.min,
        isNotZoomToMinMax = _ref8.isNotZoomToMinMax;
    var plotLines = config.yAxis.plotLines;
    setPlotLinesMinMax({
      plotLines: plotLines,
      min: min,
      max: max
    });

    if (!isNotZoomToMinMax) {
      config.yAxis.min = calcMinY(min, max);
    }
  },
  crItemCaption: function crItemCaption(_ref9) {
    var title = _ref9.title;
    return joinBy(": ", "EU", title);
  },
  crDataSource: function crDataSource(_ref10) {
    var dfTable = _ref10.dfTable,
        dataSource = _ref10.dataSource;
    return dfTable ? dataSource + " (" + dfTable + ")" : dataSource || "Eurostat";
  },
  crLinkConf: function crLinkConf(_ref11) {
    var dfTable = _ref11.dfTable;
    return {
      linkFn: 'ES',
      item: {
        dataset: dfTable
      }
    };
  },
  crZhConfig: function crZhConfig(option) {
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
    }, EuroStatFn.crLinkConf(option));
  },
  crTimeIndexAndValue: function crTimeIndexAndValue(json) {
    var _json$dimension = json.dimension,
        dimension = _json$dimension === void 0 ? {} : _json$dimension,
        _json$value = json.value,
        value = _json$value === void 0 ? [] : _json$value,
        _json$status = json.status,
        status = _json$status === void 0 ? {} : _json$status,
        _dimension$time = dimension.time,
        time = _dimension$time === void 0 ? {} : _dimension$time,
        _time$category = time.category,
        category = _time$category === void 0 ? {} : _time$category,
        _category$index = category.index,
        timeIndex = _category$index === void 0 ? 0 : _category$index;
    return {
      timeIndex: timeIndex,
      value: value,
      status: status
    };
  }
};
var _default = EuroStatFn;
exports["default"] = _default;
//# sourceMappingURL=EuroStatFn.js.map