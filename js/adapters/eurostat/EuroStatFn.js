"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.toPointArr = exports.setInfoTo = exports.setDataAndInfo = exports.isNotGeoOrReporter = exports.isEuGeoEntity = exports.isEuCaption = exports.getColorBlack = exports.crZhConfig = exports.crLinkConf = exports.crDatasetInfo = exports.crDataSource = exports.crData = exports.crCategoryTooltip = exports.addToCategoryConfig = void 0;
var _AdapterFn = require("../AdapterFn");
exports.getColorBlack = _AdapterFn.getColorBlack;
exports.findMinY = _AdapterFn.findMinY;
var _isTypeFn = require("../../utils/isTypeFn");
var _Chart = require("../../charts/Chart");
var _configBuilderFn = require("../../charts/configBuilderFn");
var _Tooltip = require("../../charts/Tooltip");
var _JsonStatFn = require("../JsonStatFn");
var _compareByFn = require("../compareByFn");
var _crFn = require("../crFn");
var _convertToUTC = _interopRequireDefault(require("./convertToUTC"));
const EU_COLOR = "#001489",
  EA_COLOR = "#cca300",
  NOT_EU_MEMBER_COLOR = '#8085e9',
  EU_MEMBER = ["Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czechia", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden"];
const _assign = Object.assign;
const _crDescr = (updated, extension) => {
  const _updated = (0, _isTypeFn.isStr)(updated) ? `Updated: ${updated.replace('T', ' ')}` : '',
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
const _getAnnotationTitle = annotationItem => (annotationItem || {}).title || "";
const _getObsOverallPeriods = extension => {
  const {
    annotation
  } = extension || {};
  let _fromDate = "",
    _toDate = "",
    _annotationItem,
    _annotationType;
  if ((0, _isTypeFn.isArr)(annotation)) {
    for (_annotationItem of annotation) {
      _annotationType = (_annotationItem || {}).type;
      if (_annotationType === OLDEST_DATE) {
        _fromDate = _getAnnotationTitle(_annotationItem);
      } else if (_annotationType === LATEST_DATE) {
        _toDate = _getAnnotationTitle(_annotationItem);
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
const _fIsCode = token => str => str.toLowerCase().indexOf(token) !== -1,
  _isEaCaption = _fIsCode("euro area"),
  _isEuMember = str => EU_MEMBER.indexOf(str) !== -1;
const isEuCaption = exports.isEuCaption = _fIsCode("union");
const isEuGeoEntity = str => _isEaCaption(str) || isEuCaption(str) || _isEuMember(str);
exports.isEuGeoEntity = isEuGeoEntity;
const _filterZeroCategories = (data, categories) => {
  const _data = [],
    _arrC = [];
  data.forEach(p => {
    if ((0, _isTypeFn.isObj)(p) && (0, _isTypeFn.isPositiveNumber)(p.y) && (0, _isTypeFn.isStr)(p.c)) {
      _data.push(p);
      _arrC.push(p.c);
    }
  });
  return [_data, _arrC];
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
const setInfoTo = (config, json) => {
  config.info = crDatasetInfo(json);
};
exports.setInfoTo = setInfoTo;
const setDataAndInfo = _ref3 => {
  let {
    config,
    data,
    json,
    option
  } = _ref3;
  (0, _Chart.setDefaultTitle)(config, option.title, option.subtitle);
  config.series[0].data = data;
  config.zhConfig = crZhConfig(option);
  setInfoTo(config, json);
};
exports.setDataAndInfo = setDataAndInfo;
const _setCategories = _ref4 => {
  let {
    config,
    categories,
    min,
    option
  } = _ref4;
  const {
    time
  } = option;
  config.xAxis.categories = categories;
  _setZoomMinMaxTo(config, option.isNotZoomToMinMax, min);
  config.series[0].name = time;
  _assign(config.zhConfig, {
    itemCaption: option.title || "EU",
    itemTime: time
  });
  (0, _configBuilderFn.setBarConfigHeightIf)(config);
};
const _colorCategories = data => {
  data.forEach(p => {
    const _caption = p.c || "",
      color = isEuCaption(_caption) ? EU_COLOR : _isEaCaption(_caption) ? EA_COLOR : _isEuMember(_caption) ? void 0 : NOT_EU_MEMBER_COLOR;
    if (color) {
      p.color = color;
    }
  });
};
const addToCategoryConfig = (config, _ref5) => {
  let {
    json,
    option,
    data,
    categories,
    min
  } = _ref5;
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
  _colorCategories(config.series[0].data);
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