import Tooltip from './Tooltip'
import ChartFn from './ChartFn'
import Chart from './Chart'

import COLOR from '../constants/Color'

const _configCrossLabel = (chart, option) => {
  Object.assign(chart, {
    xDeltaCrossLabel: 4,
    yDeltaCrossLabel: -10
  }, option)
}

const _legendVolume = {
   enabled: true,
   align: 'left',
   verticalAlign: 'top',
   x: 124,
   y: -8,
   floating: true,

   symbolHeight: 12,
   symbolWidth: 12,
   symbolRadius: 6,

   itemStyle: {
     color: COLOR.CHART_TITLE,
     fontSize: '16px'
   },
   itemHoverStyle: {
     color: COLOR.LEGEND_ITEM_HOVER
   },
   itemHiddenStyle: {
     color: COLOR.LEGEND_ITEM_HIDDEN
   }
}

const WithIndicatorConfig = {

  fBaseIndicatorConfig(){
    const config = Chart.fBaseConfig()
       , { chart, yAxis } = config;

    config.navigation = {
       buttonOptions: {
          y: 20
       },
       menuStyle: {
         position: 'relative',
         top: '-24px',
         left: '28px'
       }
    }
    Object.assign(chart, {
      height: 160,
      spacingTop: 8,
      spacingBottom: 10
    })
    Object.assign(yAxis, {
      startOnTick: true,
      endOnTick: true,
      tickPixelInterval: 60
    })
    return config;
  },

  fIndicatorMfiConfig(id, parentId, title, data){
    const config = this.fBaseIndicatorConfig();
    config.title = Chart.fTitleIndicator(title)
    _configCrossLabel(config.chart)
    Object.assign(config.series[0], {
      zhSeriaId: parentId + '_' + id,
      zhValueText: id,
      data: data,
      name: "Spline",
      type: "spline",
      color: "#90ed7d",
      point: Chart.fEventsMouseOver(ChartFn.handlerMouserOverPoint)
    })
    return config;
  },

  fIndicatorVolumeConfig(chartId, dataColumn, data){
    const config = this.fBaseIndicatorConfig();
    Object.assign(config, {
      title: Chart.fTitleIndicator('Volume Chart:'),
      legend: _legendVolume
    })
    _configCrossLabel(config.chart)
    Object.assign(config.yAxis, {
      endOnTick: false,
      tickPixelInterval: 40
    })
    Object.assign(config.series[0], {
      zhSeriaId: chartId + '_VolumeArea',
      zhValueText: "Volume",
      data: data,
      name: "Spline",
      point: Chart.fEventsMouseOver(ChartFn.handlerMouserOverPoint)
    })
    config.series.push({
      zhSeriaId: chartId + '_VolumeColumn',
      zhValueText: "Volume",
      turboThreshold: 20000,
      type: "column",
      name: "Column",
      data: dataColumn,

      visible: false,
      borderWidth: 0,
      pointPlacement: 'on',
      groupPadding: 0.1,
      states: {
        hover: {
          enabled: true,
          brightness: 0.07
        }
      },
      tooltip: Chart.fTooltip(Tooltip.fnVolumePointFormatter)
    });

    return config;
  },

  fIndicatorATHConfig(chartId, data){
    const config = this.fBaseIndicatorConfig();
    config.title = Chart.fTitleIndicator('ATH Chart');

    Object.assign(config.series[0], {
      zhSeriaId: chartId + "_ATH",
      zhValueText: "ATH",
      name: "ATH",
      visible: true,
      type: "column",
      borderWidth: 0,
      pointPlacement: 'on',
      minPointLength: 4,
      groupPadding: 0.1,
      data: data,
      tooltip: Chart.fTooltip(Tooltip.fnATHPointFormatter)
    })

    return config;
  },

  fIndicatorHighLowConfig(chartId, data){
    const config = this.fBaseIndicatorConfig();
    config.title = Chart.fTitleIndicator('HighLow Chart')

    Object.assign(config.series[0], {
      zhSeriaId: chartId + '_HL',
      zhValueText: "HL",
      name: "HL",
      visible: true,
      type: "arearange",
      color: '#2D7474',
      data: data,
      tooltip: Chart.fTooltip(Tooltip.fnHighLowPointFormatter)
    })

    return config;
  }

};

export default WithIndicatorConfig
