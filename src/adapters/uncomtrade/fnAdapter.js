import ChartConfig from '../../charts/ChartConfig'
import Chart from '../../charts/Chart'
import Tooltip from '../../charts/Tooltip'

import AdapterFn from '../AdapterFn'

import fnDescr from './fnDescr'
import fnHm from './fnHm'
import fnLegend from './fnLegend'

import C from './conf'

const fnAdapter = {

  crChartId: (option) => {
    const { value, rg=2, measure="A" } = option;
    return value + '_' + rg + '_' + measure;
  },

  crSeriaOption: id => {
    return { zhSeriaId: id };
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

  addSeriaTo({
    config, hm,
    name, i, color,
    seriaOption, isShow=false
  }) {
    const { key, legend } = config.zhConfig
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
      config, hm[name], i, name, _seriaOption,
      this.crSeriaOption(key + '_' + name)
    )
    legend.push(
       AdapterFn.legendItem(i, _color, name, isShow)
    )
  },

  addSeriesFromHmTo({ config, hm, fromIndex }) {
    let i=fromIndex;

    fnHm.toSeriaNames(hm)
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

    Object.assign(config.xAxis, { categories }, C.X_AXIS)
    Object.assign(config.yAxis, C.Y_AXIS)

  },

  crBaseConfig(json, option) {
    const {
            dataSource,
            title, subtitle,
            nativeHref
          } = option;
    return Object.assign(ChartConfig.fBaseAreaConfig(), {
        title: Chart.fTitle({
          text: title,
          y: Chart.STACKED_TITLE_Y
        }),
        subtitle: Chart.fSubtitle({
          text: subtitle,
          y: Chart.STACKED_SUBTITLE_Y
        }),
        tooltip: Chart.fTooltip(Tooltip.fnBasePointFormatterC),
        info: {
          description: fnDescr.toDescr(json),
          frequency: "Annual"
        },
        zhConfig: {
          //id: value,
          id: this.crChartId(option),
          key: this.crChartId(option),
          isWithLegend: true,
          legend: [],
          dataSource: dataSource,
          linkFn: "UN_COMTRADE",
          item: nativeHref
       }
     });
  },

  toConfig(json, option){
    const config = this.crBaseConfig(json, option);
    Object.assign(config.chart, C.CHART)
    this.addSeriasTo(config, json, option)

    return config;
  }

};

export default fnAdapter
