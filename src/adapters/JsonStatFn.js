import {
  isObj,
  isNumber,
  isStr,
  getObjectKeys
} from '../utils/isTypeFn';

import {
  toUTC,
  toYMD
} from './stat-json/fnUtil';

import {
  crCategoryPoint
} from './CategoryFn';

const _compareByPropNameY = (a, b) => b.y - a.y;

const _isDatasetVersion2 = (
  json
) => json.class === "dataset"
  && json.version === "2.0"
, _getDataset = json => {
  const _json = json || {}
  return _isDatasetVersion2(_json)
   ? _json
   : _json.dataset || {};
}
, _fGetDataset = (
  propName,
  dfValue
) => json => _getDataset(json)[propName] || dfValue;

export const _getDatasetDimension = _fGetDataset("dimension", {})
, _getDatasetValue = _fGetDataset("value", {})
, _getDatasetStatus = _fGetDataset("status", {})

export const getDatasetLabel = _fGetDataset("label")
export const getDatasetUpdated = _fGetDataset("updated")
export const getDatasetSource = _fGetDataset("source")

export const _getIdSizeTuple = json => {
  const _json = json || {}
  , dimension = _isDatasetVersion2(_json)
     ? _json
     : _getDatasetDimension(_json);
  return [
    dimension.id || [],
    dimension.size || []
  ];
};

export const _getDimensionCategory = (
  dimension,
  categoryPropName
) => categoryPropName
  ? (dimension[categoryPropName] || {}).category || {}
  : {};

const _getCategoryIndexLabel = (
  id,
  size,
  dimension
) => {
  const categoryIndex = size.findIndex(v => v !== 1 )
  , categoryPropName = categoryIndex !== -1
      ? id[categoryIndex]
      : '';
  return _getDimensionCategory(
    dimension,
    categoryPropName
  );
};

const _crCategoryLabel = (
  categoryLabel,
  hmLabels
) => {
  const _categoryNumber = hmLabels[categoryLabel];
  return _categoryNumber
    ? (++hmLabels[categoryLabel], `${categoryLabel} (${_categoryNumber+1})`)
    : (hmLabels[categoryLabel]=1, categoryLabel);
};

export const crData = (
  crPoint,
  json
) => {
  const dimension = _getDatasetDimension(json)
  , value = _getDatasetValue(json)
  , status = _getDatasetStatus(json)
  , [
    id,
    size
  ] = _getIdSizeTuple(json)
  , {
    index,
    label
  } = _getCategoryIndexLabel(id, size, dimension)
  , hmLabels = {};
  let _valueIndex;
  return isObj(index) && isObj(label) ? getObjectKeys(label)
    .reduce((data, labelKey) => {
       _valueIndex = index[labelKey];
       if (_valueIndex != null) {
         const y = value[_valueIndex]
         , categoryLabel = label[labelKey];
         if (isNumber(y) && isStr(categoryLabel)) {
           data.push(crPoint(
             y,
             _crCategoryLabel(categoryLabel, hmLabels),
             status[_valueIndex]
           ))
         }
       }
       return data;
    }, []) : [];
}

export const crCategoryData = (
  json
) => crData(crCategoryPoint, json)
  .sort(_compareByPropNameY)

export const fCrSplinePoint = (
  hasPerJanuary
) => (y, time) => {
  const _pIndex = time.length - 1
  , isP = time[_pIndex] === '*'
  , _time = isP
     ? time.slice(0, _pIndex)
     : time
  , x = toUTC(_time, hasPerJanuary)
  return isP
     ? [x, y, 'p']
     : [x, y];
}

const _crYearlyPoint = (
  y,
  time
) => [
  toYMD(time),
  y
];

export const crYearlyData = (
  json
) => crData(_crYearlyPoint, json)
  .reverse()
