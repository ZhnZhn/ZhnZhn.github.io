import ChartConfig from '../../charts/ChartConfig'
import Builder from '../../charts/ConfigBuilder'
import Tooltip from '../../charts/Tooltip'

import AdapterFn from '../AdapterFn'
import { compareByValue } from '../compareByFn';
import { legendItem } from '../legendFn'

import fnDescr from './fnDescr'
import fnHm from './fnHm'
import fnLegend from './fnLegend'

import C from './conf'

const _assign = Object.assign;

const _crInfo = (json, option) => ({
  frequency: "Annual",
  description: fnDescr.toDescr(json, option),
});

const fnAdapter = {
   roundBy: AdapterFn.roundBy,

  crChartId: option => {
    const { value, rg=2, measure="A" } = option;
    return value + '_' + rg + '_' + measure;
  },

  crMarker: color => {
    return {
      fillColor: color,
      lineColor: color,
      lineWidth: 1,
      radius: 4,
      symbol: 'circle'
    };
  },

  crZhConfig(option) {
    const { dataSource } = option
        , _id = this.crChartId(option);
    return {
      id: _id,
      key: _id,
      legend: [],
      dataSource: dataSource
    };
  },

  addSeriaTo({
    config, hm,
    name, i, color,
    seriaOption, isShow=false
  }) {
    const { legend } = config.zhConfig
        , _color = color || ChartConfig.getColor(i)
        , _seriaColor = {
             color: _color,
             marker: this.crMarker(_color)
          }
        , _seriaOption = (seriaOption !== null)
               ? isShow
                  ? { ...C.SPLINE, ..._seriaColor }
                  : { ...C.SPLINE_NOT_VISIBLE, ..._seriaColor }
               : null;

    ChartConfig.setSerieData(
      config, hm[name], i, name, _seriaOption
    )
    legend.push(
       legendItem(i, _color, name, isShow)
    )
  },

  addSeriesFromHmTo({ config, hm, fromIndex }) {
    let i=fromIndex;

    fnHm.toSeriaNames(hm, compareByValue)
      .forEach(item => {
         const name = item.name
             , _isShow = i<C.MAX_SHOW ? true : false ;
         this.addSeriaTo({ config, hm, name, i, isShow: _isShow })
         i++
      })
  },

  addSeriasTo(config, json, option) {
    const { one, measure } = option
        , { dataset=[] } = json
        , { hm, categories } = (one !== C.ALL)
              ? fnHm.toHmCategories({
                   dataset,
                   pnValue: measure
                })
              : fnHm.toHmCategories({
                   dataset,
                   pnValue: measure,
                   pnCountry: 'rtTitle'
                });

    if (hm[C.WORLD] && one !== C.ALL) {
      this.addSeriaTo({
         config, hm,
         i: 0, name: C.WORLD, color: C.WORLD_COLOR,
         seriaOption: null, isShow: true
      })
      this.addSeriesFromHmTo({ config, hm, fromIndex: 1 });
    } else {
      this.addSeriesFromHmTo({ config, hm, fromIndex: 0 });
    }

    const legend = config.zhConfig.legend;
    config.zhConfig.legend = (one !== C.ALL)
       ? fnLegend.toWorldLegend(legend, hm)
       : fnLegend.toAllLegend(legend, hm, measure)

    _assign(config.xAxis, { categories })
  },

  crBaseConfig(json, option) {
    const { title, subtitle } = option;
    return Builder()
      .areaConfig()
      .add('chart', C.CHART)
      .addCaption(title, subtitle)
      .add('xAxis', C.X_AXIS)
      .add('yAxis', C.Y_AXIS)
      .addTooltip(Tooltip.categorySimple)
      .add('info', _crInfo(json, option))
      .add('zhConfig', this.crZhConfig(option))
      .toConfig();
  },

  toConfig(json, option){
    const config = this.crBaseConfig(json, option);
    this.addSeriasTo(config, json, option)

    return config;
  }

};

export default fnAdapter
