import ChartConfig from '../../charts/ChartConfig';
import Chart from '../../charts/Chart';
import Tooltip from '../../charts/Tooltip';

//import QuandlFn2 from '../quandl/QuandlFn2';
import AdapterFn from '../AdapterFn';

const DF_SLICE_TITLE = 'EU';

const COLOR = {
  EU: "#0088ff",
  EA: "#ff5800",
  NOT_EU_MEMBER: '#8085e9',
};
const C = {
  EU_CODES: ["EU", "EU27", "EU28"],
  EA_CODES: ["EA", "EA18", "EA19"],
  EU_MEMBER: [
    "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus",
    "Czech Republic", "Denmark", "Estonia", "Finland", "France",
    "Germany", "Greece", "Hungary", "Ireland", "Italy",
    "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands",
    "Poland", "Portugal", "Romania", "Slovakia", "Slovenia",
    "Spain", "Sweden", "United Kingdom"
  ]
};

const _crDescr = (extension) => {
  const _ext = extension || {}
    , { datasetId, subTitle } = _ext
    , _id = datasetId ? `DatasetId: ${datasetId}.` : ''
    , _sub = subTitle ? `Metric: ${subTitle}.` : ''
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


const _isDataDes = (d) => d.length>0 && d[0][0]>d[d.length-1][0];

const _isLineSeria = type => type && (type === 'AREA' || type === 'SPLINE');

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
      data: _isDataDes(data)
         ? data.reverse()
         : data,
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
      config.valueMoving = AdapterFn.valueMoving(data)
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
    const { time } = option;
    config.xAxis.categories = categories
    config.yAxis.min = min
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

    if ( max>Number.NEGATIVE_INFINITY ){
      plotLines[0].value = max;
      plotLines[0].label.text = ChartConfig.fnNumberFormat(max);
    }
    if ( min<Number.POSITIVE_INFINITY ){
      plotLines[1].value = min;
      plotLines[1].label.text = ChartConfig.fnNumberFormat(min);
    }

    if (!isNotZoomToMinMax){
      config.yAxis.min = Chart.calcMinY({ maxPoint: max, minPoint: min });
    }

  },

  crItemCaption: ({ subtitle, dfSliceTitle }) => {
    const _pre = dfSliceTitle || DF_SLICE_TITLE;
    return `${_pre}: ${subtitle || ''}`;
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
      isWithoutIndicator: true,
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
    const { label, updated, extension } = json
        , _descr = _crDescr(extension);
    return {
      name: label,
      description: _descr,
      newest_available_date: updated,
      oldest_available_date: '1996-01-30',
    }
  },

  findMinY(data){
    return AdapterFn.findMinY(data);
    //return QuandlFn2.findMinY(data);
  }
}

export default EuroStatFn
