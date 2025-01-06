export {
  getColorBlack,
  findMinY
} from '../AdapterFn';

import {
  fTooltip,
  setDefaultTitle
} from '../../charts/Chart';
import {
  setBarConfigHeightIf
} from '../../charts/configBuilderFn';
import {
  tooltipCategorySimple
} from '../../charts/Tooltip';

import {
  findMinY,
  findMaxY,
  filterTrimZero,
} from '../AdapterFn';

import { crData as crJsonStatData } from '../JsonStatFn';
import { compareByDate } from '../compareByFn';
import { crItemConf } from '../crFn';

import convertToUTC from './convertToUTC';

const EU_COLOR = "#001489"
, EA_COLOR = "#cca300"
, NOT_EU_MEMBER_COLOR = '#8085e9'
, EU_MEMBER = [
    "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus",
    "Czechia", "Denmark", "Estonia", "Finland", "France",
    "Germany", "Greece", "Hungary", "Ireland", "Italy",
    "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands",
    "Poland", "Portugal", "Romania", "Slovakia", "Slovenia",
    "Spain", "Sweden"
  ];

const _assign = Object.assign
, _isStr = str => typeof str === 'string'
, _isArr = Array.isArray;

const _crDescr = (
  updated,
  extension
) => {
  const _updated = _isStr(updated)
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

const _getObsOverallPeriods = (
  extension
) => {
  const { annotation } = extension || {}
  let _fromDate=''
  , _toDate=''
  , _annotationType
  , i;
  if (_isArr(annotation)) {
    for(i = 0; i<annotation.length; i++) {
      _annotationType = (annotation[i] || {}).type
      if (_annotationType === OLDEST_DATE) {
        _fromDate = annotation[i].title
      }
      if (_annotationType === LATEST_DATE) {
        _toDate = annotation[i].title
      }
    }
  }
  return [
    _fromDate,
    _toDate
  ];
}

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

const _fIsCode = (
  token
) => str => str.toLowerCase().indexOf(token) !== -1
, _isEUCode = _fIsCode("union")
, _isEACode = _fIsCode("euro area")
, _isNotEUMember = str => EU_MEMBER.indexOf(str) === -1;

const _filterZeroCategories = (
  data,
  categories
) => {
  const _data = []
  , _arrC = [];
  data.forEach(p => {
    if (p.y !== 0) {
      _data.push(p)
    } else {
      _arrC.push(p.c)
    }
  })
  return [
    _data,
    _arrC.length !== 0
       ? categories.filter(c => _arrC.indexOf(c) === -1)
       : categories
  ];
};

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

const _setZoomMinMaxTo = (
  config,
  isNotZoomToMinMax,
  min
) => {
  const yAxis = config.yAxis;
  if (isNotZoomToMinMax) {
    yAxis.zhNotZoomToMinMax = true
  } else {
    yAxis.min = min
  }
}

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

export const setDataAndInfo = ({
  config,
  data,
  json,
  option
}) => {

  setDefaultTitle(config,
    option.title,
    option.subtitle
  )

  config.series[0].data = data
  config.zhConfig = crZhConfig(option)
  setInfoTo(config, json)
}

const _setCategories = ({
  config,
  categories,
  min,
  option
}) => {
   const {
     time
   } = option;
   config.xAxis.categories = categories
   _setZoomMinMaxTo(config, option.isNotZoomToMinMax, min)

   config.series[0].name = time

   _assign(config.zhConfig, {
     itemCaption: option.title || "EU",
     itemTime: time
   })
   setBarConfigHeightIf(config)
}

const _colorSeries = (config) => {
  config.series[0].data.forEach(p => {
    const _caption = p.c || ""
    , color = _isEUCode(_caption)
      ? EU_COLOR
      : _isEACode(_caption)
      ? EA_COLOR
      : _isNotEUMember(_caption)
      ? NOT_EU_MEMBER_COLOR
      : void 0;
    if (color) {
      p.color = color
    }
  })
}

export const addToCategoryConfig = (
  config,
  { json, option, data, categories, min }
) => {
    const [
      _data,
      _categories
    ] = option.isFilterZero
      ? _filterZeroCategories(data, categories)
      : [data, categories];

    setDataAndInfo({ data: _data, config, json, option })
    _setCategories({ categories: _categories, config, min, option })
    _colorSeries(config)
}

export const crCategoryTooltip = () => fTooltip(tooltipCategorySimple)

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
