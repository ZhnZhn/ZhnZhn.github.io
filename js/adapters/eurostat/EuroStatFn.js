"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.toPointArr = exports.setInfo = exports.setDataAndInfo = exports.isNotGeoOrReporter = exports.getColorBlack = exports.crZhConfig = exports.crLinkConf = exports.crDatasetInfo = exports.crDataSource = exports.crData = exports.crCategoryTooltip = exports.addToCategoryConfig = void 0;
var _AdapterFn = require("../AdapterFn");
exports.getColorBlack = _AdapterFn.getColorBlack;
exports.findMinY = _AdapterFn.findMinY;
var _Chart = require("../../charts/Chart");
var _configBuilderFn = require("../../charts/configBuilderFn");
var _Tooltip = require("../../charts/Tooltip");
var _JsonStatFn = require("../JsonStatFn");
var _compareByFn = require("../compareByFn");
var _crFn = require("../crFn");
var _convertToUTC = _interopRequireDefault(require("./convertToUTC"));
const COLOR_EU = "#001489",
  COLOR_EA = "#ffdd00",
  COLOR_NOT_EU_MEMBER = '#8085e9',
  EU_CODES = ["EU", "EU28", "EU27_2020", "G20", "Group of Twenty"],
  EA_CODES = ["EA", "EA11", "EA12", "EA13", "EA15", "EA16", "EA17", "EA18", "EA19", "EA20", "EUROZONE"],
  EU_MEMBER = ["Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czechia", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden"];
const _assign = Object.assign,
  _isStr = str => typeof str === 'string',
  _isArr = Array.isArray;
const _crDescr = (updated, extension) => {
  const _updated = _isStr(updated) ? `Updated: ${updated.replace('T', ' ')}` : '',
    _ext = extension || {},
    {
      id,
      subTitle
    } = _ext,
    _id = `Dataset: ${(id || '').toLowerCase()}`,
    _sub = subTitle ? `Metric: ${subTitle}` : '',
    _d = _ext.description || '';
  return `<p>${_updated}</p><p>${_id}</p><p>${_d} ${_sub}</p>`;
};
const OBS_PERIOD_OVERALL_ = 'OBS_PERIOD_OVERALL_',
  OLDEST_DATE = `${OBS_PERIOD_OVERALL_}OLDEST`,
  LATEST_DATE = `${OBS_PERIOD_OVERALL_}LATEST`;
const _getObsOverallPeriods = extension => {
  const {
    annotation
  } = extension || {};
  let _fromDate = '',
    _toDate = '',
    _annotationType,
    i;
  if (_isArr(annotation)) {
    for (i = 0; i < annotation.length; i++) {
      _annotationType = (annotation[i] || {}).type;
      if (_annotationType === OLDEST_DATE) {
        _fromDate = annotation[i].title;
      }
      if (_annotationType === LATEST_DATE) {
        _toDate = annotation[i].title;
      }
    }
  }
  return [_fromDate, _toDate];
};
const crDatasetInfo = _ref => {
  let {
    label,
    updated,
    extension
  } = _ref;
  const [fromDate, toDate] = _getObsOverallPeriods(extension);
  return {
    name: label,
    description: _crDescr(updated, extension),
    fromDate,
    toDate
  };
};
exports.crDatasetInfo = crDatasetInfo;
const _fIsCode = codes => p => codes.indexOf(p.c) !== -1;
const _isEUCode = _fIsCode(EU_CODES);
const _isEACode = _fIsCode(EA_CODES);
const _isNotEUMember = p => EU_MEMBER.indexOf(p.c) === -1;
const _colorSeriaIn = (config, isPredicate, color) => {
  const data = config.series[0].data;
  data.forEach(p => {
    if (!p.color && isPredicate(p)) {
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
  return [_data, _arrC.length !== 0 ? categories.filter(c => _arrC.indexOf(c) === -1) : categories];
};
const _crStatusOfPoint = status => status && status !== ':' && status.length === 1 ? status : void 0;
const _crDataPoint = (v, time, status) => [(0, _convertToUTC.default)(time), v, _crStatusOfPoint(status)];
const _setZoomMinMaxTo = (config, isNotZoomToMinMax, min) => {
  const yAxis = config.yAxis;
  if (isNotZoomToMinMax) {
    yAxis.zhNotZoomToMinMax = true;
  } else {
    yAxis.min = min;
  }
};
const _getTableId = _ref2 => {
  let {
    dfId,
    dfTable
  } = _ref2;
  return dfId || dfTable;
};
const isNotGeoOrReporter = token => token !== "geo" && token !== "reporter";
exports.isNotGeoOrReporter = isNotGeoOrReporter;
const crData = function (json, _temp) {
  let {
    isFilterZero
  } = _temp === void 0 ? {} : _temp;
  let data = (0, _JsonStatFn.crData)(_crDataPoint, json).sort(_compareByFn.compareByDate);
  if (isFilterZero) {
    data = (0, _AdapterFn.filterTrimZero)(data);
  }
  return [data, (0, _AdapterFn.findMinY)(data), (0, _AdapterFn.findMaxY)(data)];
};
exports.crData = crData;
const _crPointArr = (value, time, status) => [time.replace('M', '-'), value, _crStatusOfPoint(status)];
const toPointArr = json => (0, _JsonStatFn.crData)(_crPointArr, json);
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
    time
  } = option;
  config.xAxis.categories = categories;
  _setZoomMinMaxTo(config, option.isNotZoomToMinMax, min);
  config.series[0].name = time;
  _assign(config.zhConfig, {
    itemCaption: _crItemCaption(option),
    itemTime: time
  });
  (0, _configBuilderFn.setBarConfigHeightIf)(config);
};
const _colorSeries = config => {
  _colorSeriaIn(config, _isEUCode, COLOR_EU);
  _colorSeriaIn(config, _isEACode, COLOR_EA);
  _colorSeriaIn(config, _isNotEUMember, COLOR_NOT_EU_MEMBER);
};
const addToCategoryConfig = (config, _ref7) => {
  let {
    json,
    option,
    data,
    categories,
    min
  } = _ref7;
  const [_data, _categories] = option.isFilterZero ? _filterZeroCategories(data, categories) : [data, categories];
  setDataAndInfo({
    data: _data,
    config,
    json,
    option
  });
  _setCategories({
    categories: _categories,
    config,
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
  return `${_prefix} (${_getTableId(dfProps) || ''})`;
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