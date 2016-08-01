import Tooltip from './Tooltip';
import ChartFn from './ChartFn';
import Chart from './Chart';

import COLOR from '../constants/Color';

const _legendVolume = {
   enabled : true,
   align: 'left',
   verticalAlign: 'top',
   x: 124,
   y: -8,
   floating: true,

   symbolHeight: 12,
   symbolWidth: 12,
   symbolRadius: 6,

   itemStyle : {
     color : COLOR.CHART_TITLE,
     fontSize : '16px'
   },
   itemHoverStyle : {
     color : COLOR.LEGEND_ITEM_HOVER
   },
   itemHiddenStyle : {
     color : COLOR.LEGEND_ITEM_HIDDEN
   }
}

const WithIndicatorConfig = {

  fBaseIndicatorConfig(){
    const config = Chart.fBaseConfig()
       , { chart, yAxis } = config;

    config.navigation = {
       buttonOptions : {
          y : 20
       },
       menuStyle : {
         position : 'relative',
         top : '-24px',
         left : '28px'
       }
    }

    chart.height = 160;
    chart.spacingTop = 8;
    chart.spacingBottom = 10;

    yAxis.startOnTick = true;
    yAxis.endOnTick = true;
    yAxis.tickPixelInterval = 60;

    return config;
  },

  fIndicatorMfiConfig(id, parentId, title, data){
    const config = this.fBaseIndicatorConfig();
    config.title = Chart.fTitleIndicator(title);

    const chart = config.chart;
    chart.xDeltaCrossLabel = 4;
    chart.yDeltaCrossLabel = -10;

    const seria = config.series[0];

    seria.zhSeriaId = parentId + '_' + id;
    seria.zhValueText = id;
    seria.data = data;
    seria.name = "Spline";
    seria.type = "spline";
    seria.color = "green";
    seria.point = Chart.fEventsMouseOver(ChartFn.handlerMouserOverPoint);

    return config;
  },

  fIndicatorVolumeConfig(chartId, dataColumn, data){
    const config = this.fBaseIndicatorConfig();
    config.title = Chart.fTitleIndicator('Volume Chart:');
    config.legend = _legendVolume;

    const chart = config.chart;
    chart.xDeltaCrossLabel = 4;
    chart.yDeltaCrossLabel = -10;

    config.yAxis.endOnTick = false;
    config.yAxis.tickPixelInterval = 40;

    const seria = config.series[0];
    seria.zhSeriaId = chartId + '_VolumeArea';
    seria.zhValueText = "Volume";
    seria.data = data;
    seria.name = "Spline";
    seria.point = Chart.fEventsMouseOver(ChartFn.handlerMouserOverPoint);

    config.series.push({
      zhSeriaId : chartId + '_VolumeColumn',
      zhValueText : "Volume",
      turboThreshold : 20000,
      type : "column",
      name : "Column",
      data : dataColumn,

      visible : false,
      borderWidth : 0,
      pointPlacement : 'on',
      groupPadding : 0.1,
      states : {
        hover : {
          enabled : true,
          brightness: 0.07
        }
      },
      tooltip : Chart.fTooltip(Tooltip.fnVolumePointFormatter)
    });

    return config;
  },

  fIndicatorATHConfig(chartId, data){
    const config = this.fBaseIndicatorConfig();
    config.title = Chart.fTitleIndicator('ATH Chart');

    const seria = config.series[0];
    seria.zhSeriaId = chartId + "_ATH";
    seria.zhValueText = "ATH";
    seria.name = "ATH";
    seria.visible = true;
    seria.type = "column";
    seria.borderWidth = 0;
    seria.pointPlacement = 'on';
    seria.minPointLength = 4;
    seria.groupPadding = 0.1;
    seria.data = data;

    seria.tooltip = Chart.fTooltip(Tooltip.fnATHPointFormatter);

    return config;
  },

  fIndicatorHighLowConfig(chartId, data){
    const config = this.fBaseIndicatorConfig();
    config.title = Chart.fTitleIndicator('HighLow Chart');

    const seria = config.series[0];
    seria.zhSeriaId = chartId + '_HL';
    seria.zhValueText = "HL";
    seria.name = "HL";
    seria.visible = true;
    seria.type = "arearange";
    seria.color = '#2D7474';
    seria.data = data;

    seria.tooltip = Chart.fTooltip(Tooltip.fnHighLowPointFormatter);

    return config;
  }


};

export default WithIndicatorConfig
