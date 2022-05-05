"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _Chart = _interopRequireDefault(require("../../charts/Chart"));

var _ChartFn = _interopRequireDefault(require("../../charts/ChartFn"));

var _Tooltip = _interopRequireDefault(require("../../charts/Tooltip"));

var _AdapterFn = require("../AdapterFn");

var _compareByFn = require("../compareByFn");

var _crFn = require("../crFn");

const {
  calcMinY,
  setPlotLinesMinMax
} = _ChartFn.default;
const COLOR_EU = "#0088ff",
      COLOR_EA = "#ff5800",
      COLOR_NOT_EU_MEMBER = '#8085e9';
const C = {
  EU_CODES: ["EU", "EU28", "EU27_2020", "G20", "Group of Twenty"],
  EA_CODES: ["EA", "EA11", "EA12", "EA13", "EA15", "EA16", "EA17", "EA18", "EA19"],
  EU_MEMBER: ["Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czechia", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden"]
};
const _getKeys = Object.keys;

const _crDescr = extension => {
  const _ext = extension || {},
        {
    datasetId,
    subTitle
  } = _ext,
        _id = "Dataset: " + datasetId,
        _sub = subTitle ? "Metric: " + subTitle : '',
        _d = _ext.description || '';

  return (_d + " " + _id + " " + _sub).trim();
};

const _crDatasetInfo = _ref => {
  let {
    label,
    updated,
    extension
  } = _ref;
  return {
    name: label,
    description: _crDescr(extension),
    toDate: updated,
    fromDate: '1996-01-30'
  };
};

const _colorSeriaIn = (config, codes, color) => {
  const data = config.series[0].data;
  data.forEach(p => {
    if (codes.indexOf(p.c) !== -1 && !p.color) {
      p.color = color;
    }
  });
};

const _colorSeriaNotIn = (config, codes, color) => {
  const data = config.series[0].data;
  data.forEach(p => {
    if (codes.indexOf(p.c) === -1 && !p.color) {
      p.color = color;
    }
  });
};

const _isLineSeria = type => type && (type === 'AREA' || type === 'SPLINE');

const _filterZeroCategories = (data, categories) => {
  const _data = [],
        _arrC = [];
  data.forEach(p => {
    if (p.y !== 0) {
      _data.push(p);
    } else {
      _arrC.push(p.c);
    }
  });

  if (_arrC.length !== 0) {
    categories = categories.filter(c => _arrC.indexOf(c) === -1);
  }

  return {
    data: _data,
    categories
  };
};

const _isYearOrMapFrequencyKey = (key, mapFrequency) => !mapFrequency || mapFrequency === "Y" || key.indexOf(mapFrequency) !== -1;

const _crPoint = (x, y, status) => status && status !== ':' && status.length === 1 ? [x, y, status] : [x, y];

const _setZoomMinMaxTo = (config, isNotZoomToMinMax, min) => {
  if (isNotZoomToMinMax) {
    config.yAxis.zhNotZoomToMinMax = true;
  } else {
    config.yAxis.min = min;
  }
};

const _setHeightIfBarTo = (config, seriaType, categories) => {
  if (seriaType === 'BAR_SET' || seriaType === 'BAR_WITH_LABELS') {
    const {
      height
    } = config.chart,
          _height = 100 + 17 * categories.length;

    config.chart.height = _height < height ? _height : height;
  }
};

const _getTableId = _ref2 => {
  let {
    dfId,
    dfTable
  } = _ref2;
  return dfId || dfTable;
};

const EuroStatFn = {
  joinBy: _AdapterFn.joinBy,
  findMinY: _AdapterFn.findMinY,

  crData(json, _temp) {
    let {
      mapFrequency,
      isFilterZero
    } = _temp === void 0 ? {} : _temp;
    const {
      timeIndex,
      value,
      status
    } = EuroStatFn.crTimeIndexAndValue(json);
    let data = [];

    _getKeys(timeIndex).forEach(key => {
      if (_isYearOrMapFrequencyKey(key, mapFrequency)) {
        const _valueIndex = timeIndex[key],
              y = value[_valueIndex];

        if (y != null) {
          data.push(_crPoint(EuroStatFn.convertToUTC(key), y, status[_valueIndex]));
        }
      }
    });

    data.sort(_compareByFn.compareByDate);

    if (isFilterZero) {
      data = (0, _AdapterFn.filterTrimZero)(data);
    }

    return {
      data,
      max: (0, _AdapterFn.findMaxY)(data),
      min: (0, _AdapterFn.findMinY)(data)
    };
  },

  toPointArr(json) {
    const {
      timeIndex,
      value,
      status
    } = EuroStatFn.crTimeIndexAndValue(json),
          data = [];

    _getKeys(timeIndex).map(key => {
      const _valueIndex = timeIndex[key],
            y = value[_valueIndex];

      if (y != null) {
        data.push(_crPoint(key.replace('M', '-'), y, status[_valueIndex]));
      }
    });

    return data;
  },

  setDataAndInfo(_ref3) {
    let {
      config,
      data,
      json,
      option
    } = _ref3;
    const {
      title,
      subtitle,
      seriaType
    } = option;

    _Chart.default.setDefaultTitle(config, title, subtitle);

    config.zhConfig = EuroStatFn.crZhConfig(option);
    config.info = _crDatasetInfo(json);

    if (_isLineSeria(seriaType)) {
      config.valueMoving = (0, _AdapterFn.valueMoving)(data);
    }

    config.series[0].data = data;
  },

  setInfo(_ref4) {
    let {
      config,
      json,
      option
    } = _ref4;
    config.info = _crDatasetInfo(json);
  },

  setCategories(_ref5) {
    let {
      config,
      categories,
      min,
      tooltip = _Tooltip.default.category,
      option
    } = _ref5;
    const {
      time,
      isNotZoomToMinMax,
      seriaType
    } = option;
    config.xAxis.categories = categories;

    _setZoomMinMaxTo(config, isNotZoomToMinMax, min);

    config.series[0].name = time;
    config.tooltip = _Chart.default.fTooltip(tooltip);
    config.zhConfig.itemCaption = EuroStatFn.crItemCaption(option);
    config.zhConfig.itemTime = time;

    _setHeightIfBarTo(config, seriaType, categories);
  },

  colorSeries(config) {
    _colorSeriaIn(config, C.EU_CODES, COLOR_EU);

    _colorSeriaIn(config, C.EA_CODES, COLOR_EA);

    _colorSeriaNotIn(config, C.EU_MEMBER, COLOR_NOT_EU_MEMBER);
  },

  addToCategoryConfig(config, _ref6) {
    let {
      json,
      option,
      data,
      categories,
      min
    } = _ref6;

    if (option.isFilterZero) {
      const _r = _filterZeroCategories(data, categories);

      data = _r.data;
      categories = _r.categories;
    }

    EuroStatFn.setDataAndInfo({
      config,
      data,
      json,
      option
    });
    EuroStatFn.setCategories({
      config,
      categories,
      min,
      option
    });
    EuroStatFn.colorSeries(config);
  },

  setTooltip(_ref7) {
    let {
      config,
      tooltip
    } = _ref7;
    config.tooltip = _Chart.default.fTooltip(tooltip);
  },

  crCategoryTooltip: () => {
    return _Chart.default.fTooltip(_Tooltip.default.categorySimple);
  },

  convertToUTC(str) {
    const _period = (str && str[4] || '').toUpperCase();

    if (_period === 'M') {
      const arrDate = str.split('M'),
            _month = parseInt(arrDate[1], 10) - 1,
            _day = _month === 1 ? 28 : 30;

      return Date.UTC(arrDate[0], _month, _day);
    }

    if (_period === 'Q') {
      const arrDate = str.split('Q'),
            _month = parseInt(arrDate[1], 10) * 3 - 1;

      return Date.UTC(arrDate[0], _month, 30);
    }

    if (_period === 'S') {
      const _arrS = str.split('S');

      return _arrS[1] === '1' ? Date.UTC(_arrS[0], 5, 30) : Date.UTC(_arrS[0], 11, 31);
    }

    return parseInt(str, 10) > 1970 ? Date.UTC(str, 11, 31) : Date.UTC(1970, 11, 31);
  },

  setLineExtrems(_ref8) {
    let {
      config,
      max,
      min,
      isNotZoomToMinMax
    } = _ref8;
    const plotLines = config.yAxis.plotLines;
    setPlotLinesMinMax({
      plotLines,
      min,
      max
    });

    if (!isNotZoomToMinMax) {
      config.yAxis.min = calcMinY(min, max);
    }
  },

  crItemCaption: _ref9 => {
    let {
      title = 'EU'
    } = _ref9;
    return title;
  },
  crDataSource: dfProps => {
    const _ds = dfProps.dataSource,
          _prefix = _ds && _ds.indexOf('Eurostat') !== -1 ? _ds : 'Eurostat';

    return _prefix + " (" + (_getTableId(dfProps) || '') + ")";
  },
  crLinkConf: dfProps => ({
    linkFn: 'ES',
    item: {
      dataset: _getTableId(dfProps)
    }
  }),

  crZhConfig(option) {
    const {
      key,
      itemCaption,
      url
    } = option,
          dataSource = EuroStatFn.crDataSource(option),
          itemConf = url ? {
      _itemKey: key,
      ...(0, _crFn.crItemConf)(option),
      dataSource
    } : void 0;
    return {
      id: key,
      key,
      itemCaption,
      itemConf,
      dataSource,
      ...EuroStatFn.crLinkConf(option)
    };
  },

  crTimeIndexAndValue: json => {
    const {
      dimension,
      value = [],
      status = {}
    } = json,
          {
      time
    } = dimension || {},
          {
      category
    } = time || {},
          {
      index: timeIndex = 0
    } = category || {};
    return {
      timeIndex,
      value,
      status
    };
  }
};
var _default = EuroStatFn;
exports.default = _default;
//# sourceMappingURL=EuroStatFn.js.map