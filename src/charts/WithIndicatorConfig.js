import Tooltip from './Tooltip'
import Chart from './Chart'
import seriaFn from '../math/seriaFn'

import handleMouseOver from './handleMouseOver'

import COLOR from '../constants/Color'

const { median, mean } = seriaFn;

const C = {
  MFI: "#90ed7d",

  MOM: '#f7a35c',
  CLOSE_OPEN: 'rgba(144, 237, 125, 0.75)',

  HIGH_LOW: '#2D7474',

  MEDIAN: 'darkcyan',
  MEAN: '#f7a35c',

  DF_LEGEND_VOLUME_X: 84
}

const _assign = Object.assign;

const _assignCrossLabel = (chart, option) => {
  _assign(chart, {
    xDeltaCrossLabel: 4,
    yDeltaCrossLabel: -10
  }, option)
}

const _crLegendVolume = (titleOrX=C.DF_LEGEND_VOLUME_X) => {
  const _x = typeof titleOrX === 'number'
     ? titleOrX
     : titleOrX.length*10 + 8;
  return {
   enabled: true,
   align: 'left',
   verticalAlign: 'top',
   x: _x,
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
}

const _addColumnSeria = (config, option) => {
  const { series } = config
  , _seria = _assign({
       type: "column",
       visible: true,
       tooltip: Chart.fTooltip(Tooltip.fnBasePointFormatter)
     }, option);
  if (!series[0].data) {
    _assign(config.series[0], _seria)
  } else {
    series.push(_seria)
  }
}

const _crLineSeria = (id, name, color, data) => ({
  zhSeriaId: id + '_' + name,
  zhValueText: name,
  type: "line",
  color: color,
  lineWidth: 2,
  data: data,
  name: name,
  visible: false,
  marker: {
    enabled: false
  }
});

const WithIndicatorConfig = {

  crIndicatorConfig(){
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
    _assign(chart, {
      height: 160,
      spacingTop: 8,
      spacingBottom: 10
    })
    _assign(yAxis, {
      startOnTick: true,
      endOnTick: true,
      tickPixelInterval: 60,
      offset: 4,
      lineWidth: 0,
      tickLength: 0,
      labels: {
        x: 8,
        y: 5
      }
    })
    return config;
  },

  crMfiConfig(id, parentId, title, data){
    const config = WithIndicatorConfig.crIndicatorConfig();
    config.title = Chart.fTitleIndicator(title)
    _assignCrossLabel(config.chart)
    _assign(config.series[0], {
      zhSeriaId: parentId + '_' + id,
      zhValueText: id,
      data: data,
      name: "MFI",
      type: "spline",
      color: C.MFI,
      point: Chart.fEventsMouseOver(
         handleMouseOver
       )
    })
    return config;
  },

  crMiniVolumeConfig({
      btTitle='Volume',
      title,
      id='id', dColumn=[], dVolume,
      tooltipColumn
    }){
    const _title = title || btTitle
    , config = WithIndicatorConfig.crIndicatorConfig()
    , { series } = config
    , _hasColumn = dColumn.length !== 0;
    _assign(config, {
      title: Chart.fTitleIndicator(_title),
      legend: _crLegendVolume(_title)
    })
    _assignCrossLabel(config.chart)
    _assign(config.yAxis, {
      endOnTick: false,
      tickPixelInterval: 40,
    })
    _assign(series[0], {
      zhSeriaId: id + '_VolumeArea',
      zhValueText: "Volume",
      data: dVolume,
      visible: !_hasColumn,
      name: "Spline",
      point: Chart.fEventsMouseOver(
        handleMouseOver
      )
    })
    if (_hasColumn) {
      series.push({
        zhSeriaId: id + '_VolumeColumn',
        zhValueText: "Volume",
        turboThreshold: 20000,
        type: "column",
        name: "Column",
        data: dColumn,
        borderWidth: 0,
        pointPlacement: 'on',
        groupPadding: 0.1,
        states: {
          hover: {
            enabled: true,
            brightness: 0.07
          }
        },
        tooltip: tooltipColumn || Chart.fTooltip(Tooltip.volume)
      });
      series.push(_crLineSeria(
        id, 'Median', C.MEDIAN, median(dVolume)
      ))
      series.push(_crLineSeria(
        id, 'Mean', C.MEAN, mean(dVolume)
      ))
    }

    return {
      btTitle, config
    };
  },

  crMiniATHConfig({ btTitle="ATH", id, data }){
    const config = WithIndicatorConfig.crIndicatorConfig();
    config.title = Chart.fTitleIndicator('ATH');

    _addColumnSeria(config, {
       zhSeriaId: id + "_ATH",
       name: "ATH",
       borderWidth: 0,
       pointPlacement: 'on',
       minPointLength: 4,
       groupPadding: 0.1,
       data: data,
       tooltip: Chart.fTooltip(Tooltip.ath)
    })

    return { btTitle, config };
  },

  crMomAthConfig(id, { dataMom, dataAth, dataSum }){
    const config = WithIndicatorConfig.crIndicatorConfig();
    _assign(config, {
      title: Chart.fTitleIndicator(''),
      legend: _crLegendVolume(),
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

    _assign(config.yAxis, {
       startOnTick: false,
       endOnTick: false,
       tickPixelInterval: 20
    })
    return config;
  },

  crMiniHLConfig({ btTitle="Daily HighLow", id='id', data }){
    const config = WithIndicatorConfig.crIndicatorConfig();
    config.title = Chart.fTitleIndicator('HighLow')

    _assign(config.series[0], {
      zhSeriaId: id + '_HL',
      name: "HL",
      visible: true,
      type: "arearange",
      color: C.HIGH_LOW,
      data: data,
      tooltip: Chart.fTooltip(Tooltip.hl)
    })

    return { btTitle, config };
  }
};

export default WithIndicatorConfig
