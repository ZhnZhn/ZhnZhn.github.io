import Tooltip from './Tooltip';

const WithIndicator = {

  fBaseIndicatorConfig(){
    const config = this.fBaseAreaConfig();

    config.chart.height = 160;
    config.chart.spacingTop = 8;
    config.chart.spacingBottom = 10;
    config.chart.zoomType = undefined;

    config.yAxis.opposite = true;
    config.yAxis.plotLines = [];

    config.yAxis.startOnTick = true;
    config.yAxis.endOnTick = true;
    config.yAxis.tickPixelInterval = 60;

    return config;
  },

  fIndicatorVolumeConfig(chartId, dataColumn, data){
    const config = this.fBaseIndicatorConfig();
    config.title = this.fTitleMetric('Volume Chart:');
    config.legend = this.legendVolume;

    config.chart.height = 160;
    config.yAxis.endOnTick = false;
    config.yAxis.tickPixelInterval = 40;

    config.series[0].zhSeriaId = chartId + '_VolumeArea';
    config.series[0].zhValueText = "Volume";
    config.series[0].data = data;
    config.series[0].name = "Spline";

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
      tooltip : {
        pointFormatter : Tooltip.fnVolumePointFormatter,
        headerFormat : ''
      }
    });

    return config;
  },

  fIndicatorATHConfig(chartId, data){
    const config = this.fBaseIndicatorConfig();
    config.title = this.fTitleMetric('ATH Chart');

    config.series[0].zhSeriaId = chartId + "_ATH";
    config.series[0].zhValueText = "ATH";
    config.series[0].name = "ATH";
    config.series[0].visible = true;
    config.series[0].type = "column";
    config.series[0].borderWidth = 0;
    config.series[0].pointPlacement = 'on';
    config.series[0].minPointLength = 4;
    config.series[0].groupPadding = 0.1;
    config.series[0].data = data;

    config.series[0].tooltip = {
      pointFormatter : Tooltip.fnATHPointFormatter,
      headerFormat : ''
    }

    return config;
  },

  fIndicatorHighLowConfig(chartId, data){
    const config = this.fBaseIndicatorConfig();
    config.title = this.fTitleMetric('HighLow Chart');

    config.series[0].zhSeriaId = chartId + '_HL';
    config.series[0].zhValueText = "HL";
    config.series[0].name = "HL";
    config.series[0].visible = true;
    config.series[0].type = "arearange";
    config.series[0].color = '#2D7474';
    config.series[0].data = data;

    config.series[0].tooltip = {
      pointFormatter : Tooltip.fnHighLowPointFormatter,
      headerFormat : ''
    }

    return config;
  }


};

export default WithIndicator
