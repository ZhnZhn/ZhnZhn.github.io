export {
  findMinY
} from '../AdapterFn';

import {
  fTooltip,
  setDefaultTitle
} from '../../charts/Chart';
import {
  tooltipCategorySimple
} from '../../charts/Tooltip';

import {
  findMinY,
  findMaxY,
  filterTrimZero,
} from '../AdapterFn';
import { compareByDate } from '../compareByFn';
import { crItemConf } from '../crFn';

const COLOR_EU = "#0088ff"
, COLOR_EA = "#ff5800"
, COLOR_NOT_EU_MEMBER = '#8085e9'
, EU_CODES = ["EU", "EU28", "EU27_2020", "G20", "Group of Twenty" ]
, EA_CODES = ["EA", "EA11", "EA12", "EA13", "EA15", "EA16", "EA17", "EA18", "EA19"]
, EU_MEMBER = [
    "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus",
    "Czechia", "Denmark", "Estonia", "Finland", "France",
    "Germany", "Greece", "Hungary", "Ireland", "Italy",
    "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands",
    "Poland", "Portugal", "Romania", "Slovakia", "Slovenia",
    "Spain", "Sweden"
  ];

const _getObjectKeys = Object.keys
, _assign = Object.assign
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
  , _sub = subTitle ? `Metric: ${subTitle}` : ''
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

const _fIsCode = codes => p => codes.indexOf(p.c) !== -1
const _isEUCode = _fIsCode(EU_CODES)
const _isEACode = _fIsCode(EA_CODES)
const _isNotEUMember = p => EU_MEMBER.indexOf(p.c) === -1

const _colorSeriaIn = (
  config,
  isPredicate,
  color
) => {
  const data = config.series[0].data;
  data.forEach(p => {
     if (!p.color && isPredicate(p)) {
       p.color = color
     }
  })
};

const _filterZeroCategories = (
  data,
  categories
) => {
  const _data = [], _arrC = [];
  data.forEach(p => {
    if (p.y !== 0) { _data.push(p) }
    else { _arrC.push(p.c) }
  })
  if (_arrC.length !== 0) {
    categories = categories
       .filter(c => _arrC.indexOf(c) === -1)
  }
  return { data: _data, categories };
};


const _isYearOrMapFrequencyKey = (
  key,
  mapFrequency
) => !mapFrequency
  || mapFrequency === "Y"
  || mapFrequency === "M"
  || key.indexOf(mapFrequency) !== -1;


const _crPoint = (
  x,
  y,
  status
) => [
  x,
  y,
  status && status !== ':' && status.length === 1
    ? status
    : void 0
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
const _setHeightIfBarTo = (
  config,
  seriaType,
  categories
) => {
  if (seriaType === 'BAR_SET' || seriaType === 'BAR_WITH_LABELS'){
    const { height } = config.chart
    , _height = 100 + 17*categories.length;
    config.chart.height = _height < height
       ? _height : height
  }
};

const _getTableId = ({
  dfId,
  dfTable
}) => dfId || dfTable;

const _crTimeIndexAndValue = (json) => {
  const {
     dimension,
     value,
     status
   } = json
  , { time } = dimension || {}
  , { category } = time || {}
  , { index:timeIndex=0 } = category || {};
  return [
    timeIndex,
    value || [],
    status || {}
  ];
}

const _isNumber = n => typeof n === 'number'
  && n-n === 0;
const _convertToUTC = (str) => {
  const _period = (str && str[5]);
  if (_isNumber(parseInt(_period, 10))) {
    const arrDate = str.split('-')
    , _month = parseInt(arrDate[1], 10)-1
    , _day = (_month === 1) ? 28 : 30;
    return Date.UTC(arrDate[0], _month, _day);
  }
  if (_period === 'Q'){
    const arrDate = str.split('-Q')
    , _month = (parseInt(arrDate[1], 10)*3) - 1;
    return Date.UTC(arrDate[0], _month, 30);
  }
  if (_period === 'S') {
    const _arrS = str.split('-S');
    return _arrS[1] === '1'
      ? Date.UTC(_arrS[0], 5, 30)
      : Date.UTC(_arrS[0], 11, 31);
  }
  return parseInt(str, 10) > 1970
    ? Date.UTC(str, 11, 31)
    : Date.UTC(1970, 11, 31);
}

export const crData = (
  json,
  {mapFrequency, isFilterZero}={}
) => {
  const [
    timeIndex,
    value,
    status
  ] = _crTimeIndexAndValue(json)
  let data = [];
  _getObjectKeys(timeIndex).forEach(key => {
     if (_isYearOrMapFrequencyKey(key, mapFrequency)) {
       const _valueIndex = timeIndex[key]
       , y = value[_valueIndex];
       if (y != null){
         data.push(_crPoint(
           _convertToUTC(key),
           y, status[_valueIndex]
         ));
       }
     }
  })
  data.sort(compareByDate)
  if (isFilterZero) {
    data = filterTrimZero(data)
  }
  return [
    data,
    findMinY(data),
    findMaxY(data)
  ];
}

export const toPointArr = (
  json
) => {
  const [
    timeIndex,
    value,
    status
  ] = _crTimeIndexAndValue(json)
  , data = [];
  _getObjectKeys(timeIndex).map((key) => {
     const _valueIndex = timeIndex[key]
     , y = value[_valueIndex];
     if ( y != null ){
       data.push(_crPoint(
         key.replace('M', '-'),
         y, status[_valueIndex]
       ));
     }
  })
  return data;
}

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

export const setDataAndInfo = ({
  config,
  data,
  json,
  option
}) => {
  const { title, subtitle } = option;
  setDefaultTitle(config, title, subtitle);

  config.zhConfig = crZhConfig(option);
  config.info = crDatasetInfo(json);
  config.series[0].data = data;
}

export const setInfo = ({
  config,
  json,
  option
}) => {
  config.info = crDatasetInfo(json);
}

const _crItemCaption = ({ title='EU' }) => title

const _setCategories = ({
  config,
  categories,
  min,
  option
}) => {
   const {
     time,
     isNotZoomToMinMax,
     seriaType
   } = option;
   config.xAxis.categories = categories
   _setZoomMinMaxTo(config, isNotZoomToMinMax, min)

   config.series[0].name = time

   _assign(config.zhConfig, {
     itemCaption: _crItemCaption(option),
     itemTime: time
   })
   _setHeightIfBarTo(config, seriaType, categories)
}

const _colorSeries = (config) => {
  _colorSeriaIn(config, _isEUCode, COLOR_EU)
  _colorSeriaIn(config, _isEACode, COLOR_EA)
  _colorSeriaIn(config, _isNotEUMember, COLOR_NOT_EU_MEMBER)
}

export const addToCategoryConfig = (
  config,
  { json, option, data, categories, min }
) => {
    if (option.isFilterZero) {
      const _r = _filterZeroCategories(data, categories);
      data = _r.data
      categories = _r.categories
    }
    setDataAndInfo({ config, data, json, option })
    _setCategories({ config, categories, min, option })
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
