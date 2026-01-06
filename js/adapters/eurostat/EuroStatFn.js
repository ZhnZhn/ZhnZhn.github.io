"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.toPointArr = exports.setInfoTo = exports.isNotGeoOrReporter = exports.crZhConfig = exports.crLinkConf = exports.crDatasetInfo = exports.crDataSource = exports.crData = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _seriaFn = require("../../math/seriaFn");
var _JsonStatFn = require("../JsonStatFn");
var _compareByFn = require("../compareByFn");
var _crFn = require("../crFn");
var _convertToUTC = _interopRequireDefault(require("./convertToUTC"));
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
const _crStatusOfPoint = status => status && status !== ':' && status.length === 1 ? status : void 0;
const _crDataPoint = (v, time, status) => [(0, _convertToUTC.default)(time), v, _crStatusOfPoint(status)];
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
    data = (0, _seriaFn.filterTrimZero)(data);
  }
  return [data, (0, _seriaFn.findMinY)(data), (0, _seriaFn.findMaxY)(data)];
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