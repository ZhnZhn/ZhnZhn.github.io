export { findMinY } from '../AdapterFn';

import Chart from '../../charts/Chart';
import {
  calcMinY,
  setPlotLinesMinMax
} from '../../charts/ChartFn';
import Tooltip from '../../charts/Tooltip';

import {
  valueMoving,
  findMinY,
  findMaxY,
  filterTrimZero,
} from '../AdapterFn';
import { compareByDate } from '../compareByFn';
import { crItemConf } from '../crFn';

const COLOR_EU = "#0088ff"
, COLOR_EA = "#ff5800"
, COLOR_NOT_EU_MEMBER = '#8085e9';

const C = {
  EU_CODES: ["EU", "EU28", "EU27_2020", "G20", "Group of Twenty" ],
  EA_CODES: ["EA", "EA11", "EA12", "EA13", "EA15", "EA16", "EA17", "EA18", "EA19"],
  EU_MEMBER: [
    "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus",
    "Czechia", "Denmark", "Estonia", "Finland", "France",
    "Germany", "Greece", "Hungary", "Ireland", "Italy",
    "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands",
    "Poland", "Portugal", "Romania", "Slovakia", "Slovenia",
    "Spain", "Sweden"
  ]
};

const _getKeys = Object.keys;

const _crDescr = (extension) => {
  const _ext = extension || {}
    , { datasetId, subTitle } = _ext
    , _id = `Dataset: ${datasetId}`
    , _sub = subTitle ? `Metric: ${subTitle}` : ''
    , _d = _ext.description || '';
   return (`${_d} ${_id} ${_sub}`).trim();
};

const _crDatasetInfo = ({
  label,
  updated,
  extension
}) => ({
  name: label,
  description: _crDescr(extension),
  toDate: updated,
  fromDate: '1996-01-30'
});

const _colorSeriaIn = (
  config,
  codes,
  color
) => {
  const data = config.series[0].data;
  data.forEach(p => {
     if (codes.indexOf(p.c) !== -1 && !p.color) {
       p.color = color
     }
  })
};

const _colorSeriaNotIn = (
  config,
  codes,
  color
) => {
  const data = config.series[0].data;
  data.forEach(p => {
     if (codes.indexOf(p.c) === -1 && !p.color) {
       p.color = color
     }
  })
};

const _isLineSeria = type => type
  && (type === 'AREA' || type === 'SPLINE');

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
  || key.indexOf(mapFrequency) !== -1;

const _crPoint = (x, y, status) => status
  && status !== ':' && status.length === 1
   ? [ x, y, status ]
   : [ x, y ];

const _setZoomMinMaxTo = (
  config,
  isNotZoomToMinMax,
  min
) => {
  if (isNotZoomToMinMax) {
    config.yAxis.zhNotZoomToMinMax = true
  } else {
    config.yAxis.min = min
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

const _getTableId = ({ dfId, dfTable }) =>
  dfId || dfTable;

const _crTimeIndexAndValue = (json) => {
  const { dimension, value=[], status={} } = json
  , { time } = dimension || {}
  , { category } = time || {}
  , { index:timeIndex=0 } = category || {};
  return { timeIndex, value, status };
}

const _convertToUTC = (str) => {
  const _period = (str && str[4] || '').toUpperCase();
  if (_period === 'M') {
    const arrDate = str.split('M')
    , _month = parseInt(arrDate[1], 10)-1
    , _day = (_month === 1) ? 28 : 30;
    return Date.UTC(arrDate[0], _month, _day);
  }
  if (_period === 'Q'){
    const arrDate = str.split('Q')
    , _month = (parseInt(arrDate[1], 10)*3) - 1;
    return Date.UTC(arrDate[0], _month, 30);
  }
  if (_period === 'S') {
    const _arrS = str.split('S');
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
  const {
    timeIndex,
    value,
    status
  } = _crTimeIndexAndValue(json)
  let data = [];
  _getKeys(timeIndex).forEach(key => {
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
  return {
    data,
    max: findMaxY(data),
    min: findMinY(data)
  };
}

export const toPointArr = (
  json
) => {
  const {
    timeIndex,
    value,
    status
  } = _crTimeIndexAndValue(json)
  , data = [];
  _getKeys(timeIndex).map((key) => {
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

const _crZhConfig = (option) => {
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
  const { title, subtitle, seriaType } = option;
  Chart.setDefaultTitle(config, title, subtitle);

  config.zhConfig = _crZhConfig(option);
  config.info = _crDatasetInfo(json);

  if (_isLineSeria(seriaType)){
    config.valueMoving = valueMoving(data)
  }

  config.series[0].data = data;
}

export const setInfo = ({
  config,
  json,
  option
}) => {
  config.info = _crDatasetInfo(json);
}

const _crItemCaption = ({ title='EU' }) => title

const _setCategories = ({
  config,
  categories,
  min,
  tooltip=Tooltip.category,
  option
}) => {
   const { time, isNotZoomToMinMax, seriaType } = option;
   config.xAxis.categories = categories
   _setZoomMinMaxTo(config, isNotZoomToMinMax, min)

   config.series[0].name = time
   config.tooltip = Chart.fTooltip(tooltip)

   config.zhConfig.itemCaption = _crItemCaption(option)
   config.zhConfig.itemTime = time

   _setHeightIfBarTo(config, seriaType, categories)
}

const _colorSeries = (config) => {
  _colorSeriaIn(config, C.EU_CODES, COLOR_EU)
  _colorSeriaIn(config, C.EA_CODES, COLOR_EA)
  _colorSeriaNotIn(config, C.EU_MEMBER, COLOR_NOT_EU_MEMBER)
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

export const crCategoryTooltip = () => Chart
  .fTooltip(Tooltip.categorySimple)

export const setLineExtrems = ({
  config,
  max,
  min,
  isNotZoomToMinMax
}) => {
  const plotLines = config.yAxis.plotLines;
  setPlotLinesMinMax({ plotLines, min, max })

  if (!isNotZoomToMinMax){
    config.yAxis.min = calcMinY(min, max);
  }
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
