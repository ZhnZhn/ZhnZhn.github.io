"use strict";

exports.__esModule = true;
exports.toPointArr = exports.setInfo = exports.setDataAndInfo = exports.crZhConfig = exports.crLinkConf = exports.crDatasetInfo = exports.crDataSource = exports.crData = exports.crCategoryTooltip = exports.addToCategoryConfig = void 0;

var _AdapterFn = require("../AdapterFn");

exports.findMinY = _AdapterFn.findMinY;

var _Chart = require("../../charts/Chart");

var _Tooltip = require("../../charts/Tooltip");

var _compareByFn = require("../compareByFn");

var _crFn = require("../crFn");

const COLOR_EU = "#0088ff",
      COLOR_EA = "#ff5800",
      COLOR_NOT_EU_MEMBER = '#8085e9';
const C = {
  EU_CODES: ["EU", "EU28", "EU27_2020", "G20", "Group of Twenty"],
  EA_CODES: ["EA", "EA11", "EA12", "EA13", "EA15", "EA16", "EA17", "EA18", "EA19"],
  EU_MEMBER: ["Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czechia", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden"]
};
const _getObjectKeys = Object.keys,
      _assign = Object.assign;

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

const crDatasetInfo = _ref => {
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

exports.crDatasetInfo = crDatasetInfo;

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

const _crTimeIndexAndValue = json => {
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
};

const _convertToUTC = str => {
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
};

const crData = function (json, _temp) {
  let {
    mapFrequency,
    isFilterZero
  } = _temp === void 0 ? {} : _temp;

  const {
    timeIndex,
    value,
    status
  } = _crTimeIndexAndValue(json);

  let data = [];

  _getObjectKeys(timeIndex).forEach(key => {
    if (_isYearOrMapFrequencyKey(key, mapFrequency)) {
      const _valueIndex = timeIndex[key],
            y = value[_valueIndex];

      if (y != null) {
        data.push(_crPoint(_convertToUTC(key), y, status[_valueIndex]));
      }
    }
  });

  data.sort(_compareByFn.compareByDate);

  if (isFilterZero) {
    data = (0, _AdapterFn.filterTrimZero)(data);
  }

  return [data, (0, _AdapterFn.findMinY)(data), (0, _AdapterFn.findMaxY)(data)];
};

exports.crData = crData;

const toPointArr = json => {
  const {
    timeIndex,
    value,
    status
  } = _crTimeIndexAndValue(json),
        data = [];

  _getObjectKeys(timeIndex).map(key => {
    const _valueIndex = timeIndex[key],
          y = value[_valueIndex];

    if (y != null) {
      data.push(_crPoint(key.replace('M', '-'), y, status[_valueIndex]));
    }
  });

  return data;
};

exports.toPointArr = toPointArr;

const crZhConfig = option => {
  const {
    key,
    itemCaption,
    url
  } = option,
        dataSource = crDataSource(option),
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
    ...crLinkConf(option)
  };
};

exports.crZhConfig = crZhConfig;

const setDataAndInfo = _ref3 => {
  let {
    config,
    data,
    json,
    option
  } = _ref3;
  const {
    title,
    subtitle
  } = option;
  (0, _Chart.setDefaultTitle)(config, title, subtitle);
  config.zhConfig = crZhConfig(option);
  config.info = crDatasetInfo(json);
  config.series[0].data = data;
};

exports.setDataAndInfo = setDataAndInfo;

const setInfo = _ref4 => {
  let {
    config,
    json,
    option
  } = _ref4;
  config.info = crDatasetInfo(json);
};

exports.setInfo = setInfo;

const _crItemCaption = _ref5 => {
  let {
    title = 'EU'
  } = _ref5;
  return title;
};

const _setCategories = _ref6 => {
  let {
    config,
    categories,
    min,
    option
  } = _ref6;
  const {
    time,
    isNotZoomToMinMax,
    seriaType
  } = option;
  config.xAxis.categories = categories;

  _setZoomMinMaxTo(config, isNotZoomToMinMax, min);

  config.series[0].name = time;

  _assign(config.zhConfig, {
    itemCaption: _crItemCaption(option),
    itemTime: time
  });

  _setHeightIfBarTo(config, seriaType, categories);
};

const _colorSeries = config => {
  _colorSeriaIn(config, C.EU_CODES, COLOR_EU);

  _colorSeriaIn(config, C.EA_CODES, COLOR_EA);

  _colorSeriaNotIn(config, C.EU_MEMBER, COLOR_NOT_EU_MEMBER);
};

const addToCategoryConfig = (config, _ref7) => {
  let {
    json,
    option,
    data,
    categories,
    min
  } = _ref7;

  if (option.isFilterZero) {
    const _r = _filterZeroCategories(data, categories);

    data = _r.data;
    categories = _r.categories;
  }

  setDataAndInfo({
    config,
    data,
    json,
    option
  });

  _setCategories({
    config,
    categories,
    min,
    option
  });

  _colorSeries(config);
};

exports.addToCategoryConfig = addToCategoryConfig;

const crCategoryTooltip = () => (0, _Chart.fTooltip)(_Tooltip.tooltipCategorySimple);

exports.crCategoryTooltip = crCategoryTooltip;

const crDataSource = dfProps => {
  const _ds = dfProps.dataSource,
        _prefix = _ds && _ds.indexOf('Eurostat') !== -1 ? _ds : 'Eurostat';

  return _prefix + " (" + (_getTableId(dfProps) || '') + ")";
};

exports.crDataSource = crDataSource;

const crLinkConf = dfProps => ({
  linkFn: 'ES',
  item: {
    dataset: _getTableId(dfProps)
  }
});

exports.crLinkConf = crLinkConf;
//# sourceMappingURL=EuroStatFn.js.map