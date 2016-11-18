import ChartConfig from '../../charts/ChartConfig';
import Chart from '../../charts/Chart';

import QuandlFn2 from '../QuandlFn2';

import ChoroplethMapSlice from './ChoroplethMapSlice';

const SPAN_UNIT = '<span style="color:#1b75bb;font-weight:bold;">Unit: </span>';

const _rFrequency = {
  default : '',
  m : 'Monthly',
  q : 'Quarterly'
}

const _crDataSourceLink = function(json){
  const { href } = json
  return (href)
            ? `<a href=${href}>Eurostat Data Link</a>`
            : '';
}

const _crSubTitle = function(subTitle){
  return `<span style="color:black;font-weight:bold;">${subTitle}</span>`;
}

const EuroStatFn = {

  setDataAndInfo({ config, data, json, option }){
    const { title, subtitle } = option;
    Chart.setDefaultTitle(config, title, subtitle);

    config.zhConfig = this.createZhConfig(option);
    config.info = this.createDatasetInfo(json, option);

    config.valueMoving = QuandlFn2.createValueMovingFromSeria(data);
    config.series[0].zhSeriaId = option.key;
    config.series[0].data = data;
  },

  convertToUTC(str){
    if (str.indexOf('M') !== -1) {
      const arrDate = str.split('M')
          , _month = parseInt(arrDate[1], 10)-1
          , _day = (_month === 1) ? 28 : 30

      return Date.UTC(arrDate[0], _month, _day);
    } else if (str.indexOf('Q') !== -1){
      const arrDate = str.split('Q')
          , _month = (parseInt(arrDate[1], 10)*3) - 1

      return Date.UTC(arrDate[0], _month, 30);
    } else {
      return Date.UTC(str, 11, 31);
    }
  },

  setLineExtrems({ config, max, min }){
    const plotLines = config.yAxis.plotLines;

    if ( max>Number.NEGATIVE_INFINITY ){
      plotLines[0].value = max;
      plotLines[0].label.text = ChartConfig.fnNumberFormat(max);
    }
    if ( min<Number.POSITIVE_INFINITY){
      plotLines[1].value = min;
      plotLines[1].label.text = ChartConfig.fnNumberFormat(min);
    }

    config.yAxis.min = Chart.calcMinY({ maxPoint: max, minPoint: min });

  },

  createZhConfig(option){
    return {
      id : option.key,
      key : option.key,
      itemCaption : option.itemCaption,
      isWithoutIndicator : true,
      isWithoutAdd : true
    }
  },

  createDatasetInfo(json, option){
    const  { group='' } = option
        ,  arr = group.split('_')
        , _frequency = (_rFrequency[arr[arr.length-1]])
              ? _rFrequency[arr[arr.length-1]]
              : _rFrequency.default
        , { extension={} } = json
        , { description, subTitle } = extension;

    let _descr = '';
    if (subTitle){
      _descr = SPAN_UNIT + _crSubTitle(subTitle) + '<br/>';
    }
    if (description) {
      _descr = _descr + description + '<br/>';
    }
    _descr = _descr + _crDataSourceLink(json);

    return {
      name : json.label,
      description : _descr,
      newest_available_date : json.updated,
      oldest_available_date : '1996-01-30',
      frequency : _frequency
    }
  },

  findMinY(data){
    return QuandlFn2.findMinY(data);
  },

  ...ChoroplethMapSlice

}

export default EuroStatFn
