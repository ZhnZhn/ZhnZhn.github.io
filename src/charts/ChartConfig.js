import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/lib/highcharts-more';
import HighchartsTreemap from 'highcharts/lib/modules/treemap';
import HighchartsExporting from 'highcharts/lib/modules/exporting';
import HighchartsOfflineExporting from 'highcharts/lib/modules/offline-exporting';

import merge from 'lodash.merge';

import COLOR from '../constants/Color';
import Chart from './Chart';
import ChartFn from './ChartFn';
import Tooltip from './Tooltip';

import WithIndicator from './WithIndicatorConfig';
import WithPie from './WithPieConfig';
import WithStackedArea from './WithStackedAreaConfig';
import WithStackedColumn from './WithStackedColumnConfig';
import WithTreeMap from './WithTreeMapConfig';

import ComponentActions from '../flux/actions/ComponentActions';
import { ModalDialog } from '../constants/Type';

const ChartConfig = {
  ...WithIndicator,
  ...WithPie,
  ...WithStackedArea,
  ...WithStackedColumn,
  ...WithTreeMap,

  init(){
    HighchartsMore(Highcharts);
    HighchartsTreemap(Highcharts);
    HighchartsExporting(Highcharts);
    HighchartsOfflineExporting(Highcharts);
    Highcharts.setOptions(ChartConfig.theme);

    Highcharts.wrap(Highcharts.Chart.prototype, 'showCredits', function (next, credits) {
       next.call(this, credits);
       if (credits.enabled) {
         this.credits.element.onclick = function(){
           var link = document.createElement('a');
           link.rel = "noopener noreferrer";
           link.target = credits.targer;
           link.href = credits.href;
           link.click();
         }
       }
    });

    Highcharts.wrap(Highcharts.Chart.prototype, 'exportChartLocal', function (fn, ...args) {
       if (args.length === 0) {
         ComponentActions.showModalDialog(ModalDialog.CUSTOMIZE_EXPORT, { fn: fn, chart: this });
       } else {
         fn.apply(this, args);
       }
    });

  }
};

ChartConfig.theme = {
    credits: {
      enabled : true,
      position : {
          align: 'right',
          x: -10,
          verticalAlign: 'bottom',
          y: -5
      },
      style : {
        fontSize: '11px',
        //color: '#0b8fff',
        //fill: '#0b8fff',
        textDecoration: 'underline'
      },
      target : '_blank',
      href : 'http://www.highcharts.com'
    },
    chart : {
      alignTicks: false,
      //width: 600,
      height: Chart.HEIGHT,
      spacingTop: Chart.THEME_SPACING_TOP,
      spacingBottom: Chart.SPACING_BOTTOM,
      plotBackgroundColor: COLOR.PLOT,
      backgroundColor : COLOR.CHART,
      reflow: false,

      events : {
        load : function(){
          this.zhTooltip = new Highcharts.Tooltip(this, this.options.tooltip);
        }
      }
    },
    colors: ['#7cb5ec', '#90ed7d', '#f7a35c', '#8085e9',
             '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'],
    labels : {
      items : []
    },
    exporting : {
      fallbackToExportServer : false,
      chartOptions : {
        chart : {
          plotBackgroundColor: COLOR.PLOT_PRINT,
          backgroundColor : COLOR.CHART_PRINT
        },
        title : {
          x: 0,
          y: 5
        },
        subtitle : {
          x: 0,
          y: 22
        },
        plotOptions: {
          area: {
            fillColor: COLOR.AREA_FILL_PRINT
          },
          arearange: {
            fillColor: COLOR.AREA_FILL_PRINT
          }
        },
        xAxis : {
          lineWidth: 2,
          lineColor: COLOR.LINE_PRINT,
          gridLineColor: COLOR.GRID_LINE_PRINT
        },
        yAxis : {
          lineWidth: 2,
          lineColor: COLOR.LINE_PRINT,
          gridLineColor: COLOR.GRID_LINE_PRINT
        },
        labels : {
          items : [
            {
              html : 'ERC https://zhnzhn.github.io',
              style : {
                left : '0px',
                top : '-70px',
                color: COLOR.LABEL_LINK,
                'font-size': '9px'
              }
            }
          ]
        }
      }
    },
    navigation : {
      buttonOptions : {
        align : 'left',
        x: -10,
        y: -20,
        theme : {
          fill : COLOR.BG_TITLE,
          states : {
            hover : {
              fill : COLOR.BG_TITLE,
              'stroke-width' : 2,
              stroke : COLOR.HOVER
            },
            select : {
              fill : COLOR.BG_TITLE,
              'stroke-width' : 3,
              stroke : COLOR.HOVER
            }
          }
        }
      },
      menuItemStyle : {
        'font-size' : '16px',
        'font-weight' : 'bold',
         color : COLOR.ITEM,
         'line-height' : '1.6',
         cursor : 'pointer'
      },
      menuItemHoverStyle : {
        color : COLOR.HOVER,
        background : COLOR.BG_ITEM_HOVER
      },
      menuStyle : {
        position : 'relative',
        top : '8px',
        border : '2px solid',
        'border-color' : COLOR.BG_TITLE,
        'border-radius' : '5px',
        'box-shadow': 'rgba(0, 0, 0, 0.2) 0px 0px 0px 5px',
        background : COLOR.CHART
      }
    },
    plotOptions: {
      area: {
        fillColor: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
               [0, COLOR.PLOT_G1],
               [1, COLOR.PLOT_G2]
            ]
        }
      },
      series : {
        marker: {
          states: {
            hover : {
              fillColor: COLOR.MARKER_HOVER,
              lineColor: COLOR.MARKER_HOVER,
              lineWidth: 1,
              lineWidthPlus: 0,
              enabled: true,
              radius: 2,
              radiusPlus: 0
            }
          }
        },
        states : {
          hover : {
            halo : {
              opacity : 0.35,
              size : 16
            }
          }
        },
        stickyTracking : false,
        events : {
          click : function(event) {
            this.chart.zhTooltip.refresh(event.point, event);
          }
        }
      },
      pie : {
        colors : Chart.fMonoPieColors()
      }
    },
    tooltip: {
      useHTML : true,
      enabled : false,
      hideDelay : 100,
      followPointer : false,
      shared : false,

      backgroundColor: COLOR.TOOLTIP,
      borderWidth: 2,
      borderRadius: 10,

      headerFormat: '<span style="font-weight: bold; font-size: 12px; color:rgba(194,149,23,1);">{point.key}</span><br/>',
      pointFormat: '<span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Value: </span>'+
                   '<span style="font-weight: bold; color:rgba(194,149,23,1);">{point.y}</span><br/>'
    },
    xAxis: {
      lineColor: COLOR.X_LINE,
      lineWidth: 3,
      tickColor: COLOR.X_TICK,
      tickWidth: 3,
      tickLenght: 5,
      gridLineColor: COLOR.X_GRID_LINE,
      gridLineDashStyle: "Solid",
      //gridLineDashStyle: "ShortDashDotDot",
      gridLineWidth: 1,
      labels:{
        style: {
          color: COLOR.X_LABEL,
          fontWeight: "bold",
          fontSize: "15px"
        }
      }
    },
    yAxis: {
        lineColor: COLOR.Y_LINE,
        lineWidth: 3,
        tickColor: COLOR.Y_TICK,
        tickWidth: 3,
        tickLenght: 5,
        gridLineColor: COLOR.Y_GRID_LINE,
        gridLineDashStyle: "Solid",
        //gridLineDashStyle: "ShortDashDotDot",
        labels: {
          style: {
            color : COLOR.Y_LABEL,
            fontWeight: "bold",
            fontSize: "14px"
          }
        }
    }
};


ChartConfig.fnNumberFormat = function(value){
  const arrSplit = (value+'').split('.')
      , decimal =  ( arrSplit[1] ) ? arrSplit[1].length : 0;

  return Highcharts.numberFormat(value, decimal, '.', ' ');
}

ChartConfig.fBaseAreaConfig = function(){
  const config = Chart.fBaseConfig();
  config.zhDetailCharts = [];
  config.zhToggleSeria = ChartFn.toggleSeria;

  const chart = config.chart;
  chart.zoomType = 'xy';
  chart.resetZoomButton = Chart.fResetZoomButton({ position: { x : -10 } });
  chart.xDeltaCrossLabel = 4;
  chart.yDeltaCrossLabel = 20;

  config.xAxis = Chart.fXAxisOpposite(config.xAxis)
  config.xAxis.events = {
    afterSetExtremes : ChartFn.zoomIndicatorCharts
  }

  config.yAxis.plotLines = [
    Chart.fPlotLine(COLOR.HIGH, 'max'),
    Chart.fPlotLine(COLOR.LOW, 'min')
  ]

  config.series[0].point = Chart.fEventsMouseOver(ChartFn.handlerMouserOverPoint);

  return config;
};


ChartConfig.fMarkerExDividend = function(color=COLOR.EX_DIVIDEND){
  return {
    y: 0,
    exValue: 0.5,
    marker : {
      symbol: 'circle',
      fillColor : color,
      radius: 6,
      states: {
        hover: {
          enable: true,
          fillColor: COLOR.PLOT,
          lineColor: color,
          lineWidth: 2,
          radius: 6
        }
      }
    },
    dataLabels : {
      enabled: true,
      inside: true,
      style : {
        color: color,
        fontSize: '11px',
        fontWeight: 'bold',
        textShadow: 'none'
      },
      crop: false,
      overflow: 'none',
      y: 32,
      formatter : function(){
        return this.point.exValue;
      }
    }
  }
};

ChartConfig.fMarkerSplitRatio = function(){
  const point = ChartConfig.fMarkerExDividend(COLOR.SPLIT_RATIO);
  point.dataLabels.formatter = function() { return this.point.splitRatio};
  return point;
}

const _fScatterSeria = function(color, pointFormatter, data, zhSeriaId){
  return {
    type: 'scatter',
    color: color,
    tooltip : Chart.fTooltip(pointFormatter),
    data : data,
    zhSeriaId : zhSeriaId
  }
}
ChartConfig.fExDividendSeria = function(data, chartId){
  return _fScatterSeria(
    COLOR.EX_DIVIDEND, Tooltip.fnExDividendPointFormatter, data, chartId + '_ExDivident'
  );
}
ChartConfig.fSplitRatioSeria = function(data, chartId){
  return _fScatterSeria(
    COLOR.SPLIT_RATIO, Tooltip.fnSplitRatioPointFormatter, data, chartId + '_SplitRatio'
  );
}

ChartConfig.fSeries = function(option={}){
  return merge({
      type: 'spline',
      lineWidth : 1,
      tooltip : Chart.fTooltip(Tooltip.fnBasePointFormatter)
  }, option);
}

export default ChartConfig
