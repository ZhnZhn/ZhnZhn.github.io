import Chart from '../../charts/Chart';
import ChartFn from '../../charts/ChartFn';
import Tooltip from '../../charts/Tooltip';

import AdapterFn from '../AdapterFn';

const { setPlotLinesMinMax } = ChartFn;

const {
  valueMoving, findMinY,
  appendWithColon
} = AdapterFn;

const DF_SLICE_TITLE = 'EU';

const COLOR = {
  EU: "#0088ff",
  EA: "#ff5800",
  NOT_EU_MEMBER: '#8085e9',
};
const C = {
  EU_CODES: ["EU", "EU15", "EU25", "EU27", "EU28", "EU27_2019", "G20", "Group of Twenty" ],
  EA_CODES: ["EA", "EA11", "EA12", "EA13", "EA15", "EA16", "EA17", "EA18", "EA19"],
  EU_MEMBER: [
    "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus",
    "Czechia", "Denmark", "Estonia", "Finland", "France",
    "Germany", "Greece", "Hungary", "Ireland", "Italy",
    "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands",
    "Poland", "Portugal", "Romania", "Slovakia", "Slovenia",
    "Spain", "Sweden", "United Kingdom"
  ]
};

const _crDescr = (extension) => {
  const _ext = extension || {}
    , { datasetId, subTitle } = _ext
    , _id = appendWithColon('DatasetId', datasetId)
    , _sub = appendWithColon('Metric', subTitle)
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

const _isDataDes = d => d.length>0
  && d[0][0]>d[d.length-1][0];

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

const EuroStatFn = {

  createData(timeIndex, value){
    const data = [];
    let max = Number.NEGATIVE_INFINITY
      , min = Number.POSITIVE_INFINITY;

    Object.keys(timeIndex).map((key) => {
       const pointValue = value[timeIndex[key]];
       if ( !(pointValue == null) ){
         data.push([
            this.convertToUTC(key),
            pointValue
          ]);

          if (pointValue>=max) { max = pointValue; }
          if (pointValue<=min) { min = pointValue; }
       }
    })

    return {
      data: _isDataDes(data) ? data.reverse() : data,
      max, min
    };
  },

  toPointArr(timeIndex, value){
    const data = [];
    Object.keys(timeIndex).map((key) => {
       const pointValue = value[timeIndex[key]];
       if ( !(pointValue == null) ){
         data.push([
            key.replace('M', '-'),
            pointValue
          ]);
       }
    })

    return data;
  },

  setDataAndInfo({ config, data, json, option }){
    const { title, subtitle, seriaType } = option;
    Chart.setDefaultTitle(config, title, subtitle);

    config.zhConfig = this.createZhConfig(json, option);
    config.info = this.createDatasetInfo(json);

    if (_isLineSeria(seriaType)){
      config.valueMoving = valueMoving(data)
    }

    config.series[0].zhSeriaId = option.key;
    config.series[0].data = data;
  },

  setInfo({ config, json, option }){
    config.info = this.createDatasetInfo(json);
  },

  setCategories({
    config, categories, min,
    tooltip=Tooltip.category,
    option
  }){
    const { time, isNotZoomToMinMax } = option;
    config.xAxis.categories = categories
    if (isNotZoomToMinMax) {
      config.yAxis.zhNotZoomToMinMax = true
    } else {
      config.yAxis.min = min
    }
    config.series[0].name = time
    config.tooltip = Chart.fTooltip(tooltip)

    config.zhConfig.itemCaption = EuroStatFn.crItemCaption(option)
    config.zhConfig.itemTime = time
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

  convertToUTC(str){
    if (str.indexOf('M') !== -1) {
      const arrDate = str.split('M')
          , _month = parseInt(arrDate[1], 10)-1
          , _day = (_month === 1) ? 28 : 30;
      return Date.UTC(arrDate[0], _month, _day);
    }
    if (str.indexOf('Q') !== -1){
      const arrDate = str.split('Q')
          , _month = (parseInt(arrDate[1], 10)*3) - 1;
      return Date.UTC(arrDate[0], _month, 30);
    }
    if (str.indexOf('S' !== -1)) {
      const _arrS = str.split('S');
      return _arrS[1] === '1'
        ? Date.UTC(_arrS[0], 5, 30)
        : Date.UTC(_arrS[0], 11, 31);
    }
    return Date.UTC(str, 11, 31);
  },

  setLineExtrems({ config, max, min, isNotZoomToMinMax }){
    const plotLines = config.yAxis.plotLines;
    setPlotLinesMinMax({ plotLines, min, max })

    if (!isNotZoomToMinMax){
      config.yAxis.min = Chart.calcMinY({
        maxPoint: max,
        minPoint: min
      });
    }
  },

  crItemCaption: ({ subtitle, dfSliceTitle }) => {
    return appendWithColon(
      dfSliceTitle || DF_SLICE_TITLE,
      subtitle
    );
  },

  createZhConfig(json, option){
    const { href } = json
        , _href = href && href.replace
            ? href.replace('http', 'https')
            : href
        , {
            key, itemCaption,
            dataSource,
            dfTable
          } = option
        , _dataSource = dfTable
             ? `${dataSource} (${dfTable})`
             : dataSource;
    return {
      id: key,
      key: key,
      itemCaption: itemCaption,
      //isWithoutIndicator: true,
      isWithoutAdd: true,
      dataSource: _dataSource,
      linkFn: 'ES',
      item: {
        dataset: dfTable,
        href: _href
      }
    }
  },

  createDatasetInfo(json){
    const {
      label,
      updated,
      extension
    } = json;
    return {
      name: label,
      description: _crDescr(extension),
      newest_available_date: updated,
      oldest_available_date: '1996-01-30',
    }
  },

  findMinY: findMinY,

  crTimeIndexAndValue: (json) => {
    const { dimension={}, value=[] } = json
        , { time={} } = dimension
        , { category={} } = time
        , { index:timeIndex=0 } = category;
    return { timeIndex, value };
  }
}

export default EuroStatFn
