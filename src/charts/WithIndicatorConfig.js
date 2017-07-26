import Tooltip from './Tooltip'
import ChartFn from './ChartFn'
import Chart from './Chart'

import COLOR from '../constants/Color'

const C = {
  MFI: "#90ed7d",

  MOM: '#f7a35c',
  CLOSE_OPEN: 'rgba(144, 237, 125, 0.75)',

  HIGH_LOW: '#2D7474'
}

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

const _addColumnSeria = (config, option) => {
  const { series } = config
      , _seria = Object.assign({
             type: "column",
             visible: true,
             tooltip: Chart.fTooltip(Tooltip.fnBasePointFormatter)
         }, option);
  if (!series[0].data) {
    Object.assign(config.series[0], _seria)
  } else {
    series.push(_seria)
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
      name: "MFI",
      type: "spline",
      color: C.MFI,
      point: Chart.fEventsMouseOver(ChartFn.handlerMouserOverPoint)
    })
    return config;
  },

  fIndicatorVolumeConfig(chartId, dataColumn, data){
    const config = this.fBaseIndicatorConfig();
    Object.assign(config, {
      title: Chart.fTitleIndicator('Volume:'),
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
    config.title = Chart.fTitleIndicator('ATH');

    _addColumnSeria(config, {
       zhSeriaId: chartId + "_ATH",
       name: "ATH",
       borderWidth: 0,
       pointPlacement: 'on',
       minPointLength: 4,
       groupPadding: 0.1,
       data: data,
       tooltip: Chart.fTooltip(Tooltip.fnATHPointFormatter)
    })

    return config;
  },

  fnMomAthConfig(dataMom, dataAth, dataSum, id){
    const config = this.fBaseIndicatorConfig();
    Object.assign(config, {
      title: Chart.fTitleIndicator(''),
      legend: _legendVolume,
      plotOptions: {
        column : {
          grouping: false,
          shadow: false,
          borderWidth: 0,
          pointPlacement: 'on',
          pointPadding: 0,
          groupPadding: 0,
          turboThreshold: 20000,
          tooltip: Chart.fTooltip(Tooltip.fnBasePointFormatter)
        }
      }
    })
    _addColumnSeria(config, {
       zhSeriaId: id + "_MOM",
       zhValueText: "MOM(1)",
       name: "MOM(1)",
       color: C.MOM,
       pointPadding: 0.3,
       data: dataMom
    })
    _addColumnSeria(config, {
       zhSeriaId: id + "_ATH",
       name: "ATH",
       data: dataAth
    })
    _addColumnSeria(config, {
       zhSeriaId: id + "_CLOSE_OPEN",
       name: "Close-Open",
       color: C.CLOSE_OPEN,
       visible: false,
       data: dataSum
    })

    Object.assign(config.yAxis, {
       startOnTick: false,
       endOnTick: false,
       tickPixelInterval: 20
    })
    return config;
  },

  fIndicatorHighLowConfig(chartId, data){
    const config = this.fBaseIndicatorConfig();
    config.title = Chart.fTitleIndicator('HighLow')

    Object.assign(config.series[0], {
      zhSeriaId: chartId + '_HL',
      name: "HL",
      visible: true,
      type: "arearange",
      color: C.HIGH_LOW,
      data: data,
      tooltip: Chart.fTooltip(Tooltip.fnHighLowPointFormatter)
    })

    return config;
  }

};

export default WithIndicatorConfig
