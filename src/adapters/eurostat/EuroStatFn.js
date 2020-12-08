import Chart from '../../charts/Chart';
import ChartFn from '../../charts/ChartFn';
import Tooltip from '../../charts/Tooltip';

import AdapterFn from '../AdapterFn';

const {
  calcMinY,
  setPlotLinesMinMax
} = ChartFn;

const {
  compareByDate,
  valueMoving,
  findMinY,
  joinBy,
  crItemConf
} = AdapterFn;

const COLOR = {
  EU: "#0088ff",
  EA: "#ff5800",
  NOT_EU_MEMBER: '#8085e9',
};
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

const _crDescr = (extension) => {
  const _ext = extension || {}
    , { datasetId, subTitle } = _ext
    , _id = `DatasetId: ${datasetId}`
    , _sub = subTitle ? `Metric: ${subTitle}` : ''
    , _d = _ext.description || '';
   return (`${_d} ${_id} ${_sub}`).trim();
};

const _colorSeriaIn = (config, codes, color) => {
  const data = config.series[0].data;
  data.forEach(p => {
     if (codes.indexOf(p.c) !== -1 && !p.color) {
       p.color = color
     }
  })
};
const _colorSeriaNotIn = (config, codes, color) => {
  const data = config.series[0].data;
  data.forEach(p => {
     if (codes.indexOf(p.c) === -1 && !p.color) {
       p.color = color
     }
  })
};


const _isLineSeria = type => type
  && (type === 'AREA' || type === 'SPLINE');

const _filterZeroCategories = (data, categories) => {
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

const _isYearOrMapFrequencyKey = (key, mapFrequency) => !mapFrequency
  || mapFrequency === "Y"
  || key.indexOf(mapFrequency) !== -1;

const _crPoint = (x, y, status) => status
  && status !== ':' && status.length === 1
   ? [ x, y, status ]
   : [ x, y ];

const _setZoomMinMaxTo = (config, isNotZoomToMinMax, min) => {
  if (isNotZoomToMinMax) {
    config.yAxis.zhNotZoomToMinMax = true
  } else {
    config.yAxis.min = min
  }
}
const _setHeightIfBarTo = (config, seriaType, categories) => {
  if (seriaType === 'BAR_SET' || seriaType === 'BAR_WITH_LABELS'){
    const { height } = config.chart
    , _height = 100 + 17*categories.length;
    config.chart.height = _height < height
       ? _height : height
  }
};

const EuroStatFn = {
   joinBy,
   findMinY,

  createData(json, mapFrequency){
    const { timeIndex, value, status } = EuroStatFn.crTimeIndexAndValue(json)
    , data = [];
    let max = Number.NEGATIVE_INFINITY
      , min = Number.POSITIVE_INFINITY;
    Object.keys(timeIndex).forEach(key => {
       if (_isYearOrMapFrequencyKey(key, mapFrequency)) {
         const _valueIndex = timeIndex[key]
         , y = value[_valueIndex];
         if (y != null){
           data.push(_crPoint(
             EuroStatFn.convertToUTC(key),
             y, status[_valueIndex]
           ));
           if (y>=max) { max = y; }
           if (y<=min) { min = y; }
         }
       }
    })
    return {
      data: data.sort(compareByDate),
      max, min
    };
  },

  toPointArr(json){
    const { timeIndex, value, status } = EuroStatFn.crTimeIndexAndValue(json)
    , data = [];
    Object.keys(timeIndex).map((key) => {
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
  },

  setDataAndInfo({ config, data, json, option }){
    const { title, subtitle, seriaType } = option;
    Chart.setDefaultTitle(config, title, subtitle);

    config.zhConfig = EuroStatFn.createZhConfig(json, option);
    config.info = EuroStatFn.createDatasetInfo(json);

    if (_isLineSeria(seriaType)){
      config.valueMoving = valueMoving(data)
    }

    config.series[0].data = data;
  },

  setInfo({ config, json, option }){
    config.info = EuroStatFn.createDatasetInfo(json);
  },

  setCategories({
    config, categories, min,
    tooltip=Tooltip.category,
    option
  }){
    const { time, isNotZoomToMinMax, seriaType } = option;
    config.xAxis.categories = categories
    _setZoomMinMaxTo(config, isNotZoomToMinMax, min)

    config.series[0].name = time
    config.tooltip = Chart.fTooltip(tooltip)

    config.zhConfig.itemCaption = EuroStatFn.crItemCaption(option)
    config.zhConfig.itemTime = time

    _setHeightIfBarTo(config, seriaType, categories)
  },

  colorSeries(config){
    _colorSeriaIn(config, C.EU_CODES, COLOR.EU)
    _colorSeriaIn(config, C.EA_CODES, COLOR.EA)
    _colorSeriaNotIn(config, C.EU_MEMBER, COLOR.NOT_EU_MEMBER)
  },

  addToCategoryConfig(config, { json, option, data, categories, min }){
    if (option.isFilterZero) {
      const _r = _filterZeroCategories(data, categories);
      data = _r.data
      categories = _r.categories
    }
    EuroStatFn.setDataAndInfo({ config, data, json, option })
    EuroStatFn.setCategories({ config, categories, min, option })
    EuroStatFn.colorSeries(config)
  },

  setTooltip({ config, tooltip }) {
    config.tooltip = Chart.fTooltip(tooltip)
  },

  crCategoryTooltip: () => {
    return Chart.fTooltip(Tooltip.categorySimple);
  },


  convertToUTC(str){
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
  },

  setLineExtrems({ config, max, min, isNotZoomToMinMax }){
    const plotLines = config.yAxis.plotLines;
    setPlotLinesMinMax({ plotLines, min, max })

    if (!isNotZoomToMinMax){
      config.yAxis.min = calcMinY(min, max);
    }
  },

  crItemCaption: ({ title }) => joinBy(": ", "EU", title),

  crDataSource: ({ dfTable, dataSource }) => dfTable
    ? `${dataSource} (${dfTable})`
    : dataSource || "Eurostat",

  crLinkConf: (json, { dfTable }) => {
    const { href } = json
    , _href = href && href.replace
        ? href.replace('http', 'https')
        : href;
    return {
      linkFn: 'ES',
      item: {
        dataset: dfTable,
        href: _href
      }
    };
  },

  createZhConfig(json, option){
    const {
      key, itemCaption,
      url
    } = option
    , dataSource = EuroStatFn.crDataSource(option)
    , itemConf = url
        ? {
            _itemKey: key,
            ...crItemConf(option),
            dataSource
          }
        : void 0;

    return {
      id: key, key, itemCaption,
      itemConf,
      dataSource,
      ...EuroStatFn.crLinkConf(json, option)
    };
  },

  createDatasetInfo({ label, updated, extension }){
    return {
      name: label,
      description: _crDescr(extension),
      toDate: updated,
      fromDate: '1996-01-30'
    };
  },

  crTimeIndexAndValue: (json) => {
    const { dimension={}, value=[], status={} } = json
        , { time={} } = dimension
        , { category={} } = time
        , { index:timeIndex=0 } = category;
    return { timeIndex, value, status };
  }
}

export default EuroStatFn
