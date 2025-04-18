import {
  isArr,
  isStr
} from '../../utils/isTypeFn';

import {
  findMinY,
  findMaxY,
  filterTrimZero,
} from '../AdapterFn';

import { crData as crJsonStatData } from '../JsonStatFn';
import { compareByDate } from '../compareByFn';
import { crItemConf } from '../crFn';

import convertToUTC from './convertToUTC';

const _crDescr = (
  updated,
  extension
) => {
  const _updated = isStr(updated)
     ? `Updated: ${updated.replace('T', ' ')}`
     : ''
  , _ext = extension || {}
  , { id, subTitle } = _ext
  , _id = `Dataset: ${(id || '').toLowerCase()}`
  , _sub = subTitle
      ? `Metric: ${subTitle}`
      : ''
  , _d = _ext.description || '';
  return (`<p>${_updated}</p><p>${_id}</p><p>${_d} ${_sub}</p>`);
};

const OBS_PERIOD_OVERALL_ = 'OBS_PERIOD_OVERALL_'
, OLDEST_DATE = `${OBS_PERIOD_OVERALL_}OLDEST`
, LATEST_DATE = `${OBS_PERIOD_OVERALL_}LATEST`;

const _getAnnotationTitle = (
  annotationItem
) => (annotationItem || {}).title || "";

const _getObsOverallPeriods = (
  extension
) => {
  const { annotation } = extension || {}
  let _fromDate = ""
  , _toDate = ""
  , _annotationItem
  , _annotationType;

  if (isArr(annotation)) {
    for(_annotationItem of annotation) {
      _annotationType = (_annotationItem || {}).type
      if (_annotationType === OLDEST_DATE) {
        _fromDate = _getAnnotationTitle(_annotationItem)
      } else if (_annotationType === LATEST_DATE) {
        _toDate = _getAnnotationTitle(_annotationItem)
      }
    }
  }

  return [
    _fromDate,
    _toDate
  ];
};

export const crDatasetInfo = ({
  label,
  updated,
  extension
}) => {
  const [
    fromDate,
    toDate
  ] = _getObsOverallPeriods(extension);
  return {
    name: label,
    description: _crDescr(updated, extension),
    fromDate,
    toDate
  };
}

const _crStatusOfPoint = (
  status
) => status && status !== ':' && status.length === 1
  ? status
  : void 0

const _crDataPoint = (
  v,
  time,
  status
) => [
  convertToUTC(time),
  v,
  _crStatusOfPoint(status)
];

const _getTableId = ({
  dfId,
  dfTable
}) => dfId || dfTable;

export const isNotGeoOrReporter = (
  token
) => token !== "geo" && token !== "reporter"

export const crData = (
  json,
  { isFilterZero }={}
) => {
  let data = crJsonStatData(_crDataPoint, json)
    .sort(compareByDate)
  if (isFilterZero) {
    data = filterTrimZero(data)
  }
  return [
    data,
    findMinY(data),
    findMaxY(data)
  ];
}

const _crPointArr = (value, time, status) => [
  time.replace('M', '-'),
  value,
  _crStatusOfPoint(status)
];

export const toPointArr = (
  json
) => crJsonStatData(_crPointArr, json)

export const crZhConfig = (option) => {
  const {
    key,
    itemCaption,
    url
  } = option
  , dataSource = crDataSource(option)
  , itemConf = url
      ? {
          _itemKey: key,
          ...crItemConf(option),
          dataSource
        }
      : void 0;

  return {
    id: key,
    key,
    itemCaption,
    itemConf,
    dataSource,
    ...crLinkConf(option)
  };
}

export const setInfoTo = (
  config,
  json
) => {
  config.info = crDatasetInfo(json);
}

export const crDataSource = dfProps => {
  const _ds = dfProps.dataSource
  , _prefix = _ds && _ds.indexOf('Eurostat') !== -1
     ? _ds
     : 'Eurostat';
  return `${_prefix} (${_getTableId(dfProps) || ''})`;
}

export const crLinkConf = dfProps => ({
  linkFn: 'ES',
  item: {
    dataset: _getTableId(dfProps)
  }
})
