import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsTreemap from 'highcharts/modules/treemap';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsOfflineExporting from 'highcharts/modules/offline-exporting';

//import HighchartsMore from 'highcharts/lib/highcharts-more';
//import HighchartsTreemap from 'highcharts/lib/modules/treemap';
//import HighchartsExporting from 'highcharts/lib/modules/exporting';
//import HighchartsOfflineExporting from 'highcharts/lib/modules/offline-exporting';

import merge from 'lodash.merge';

import COLOR from '../constants/Color';
import Chart from './Chart';
import ChartFn from './ChartFn';
import Tooltip from './Tooltip';
import C from './conf';

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

    /*
       Drop-in fix for arearange destroy exception:
       "isSVG of undefined": 5.0.14: issues/7021
    */
    Highcharts.wrap(
      Highcharts.seriesTypes.arearange.prototype.pointClass.prototype,
      'setState',
      function(proceed) {
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));
        if (this.series.stateMarkerGraphic) {
          this.series.lowerStateMarkerGraphic = undefined;
        }
      }
    );

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
  },

  seriaOption(color, option) {
    return Object.assign({
      type: 'line', visible: false, color,
      marker: {
        radius: 3,
        symbol: "circle"
      }
    }, option)
  },

  setSerieData(config, data, index, name, options) {
    config.series[index] = Object.assign({
      type: 'area',
      name: name,
      data: data,
      lineWidth: 1
    }, options)

    config.series[index].point = Chart.fEventsMouseOver(
      ChartFn.handlerMouserOverPoint
    )
  },

  _zhSeriaId(id){
    return { zhSeriaId: id };
  },

  setStockSerias(config, dClose, dHigh, dLow, dOpen, id){
    this.setSerieData(config, dClose, 0, 'Close',
      this._zhSeriaId(id)
    )
    this.setSerieData(config, dHigh, 1, 'High',
      this.seriaOption(COLOR.S_HIGH, this._zhSeriaId(id+'H'))
    )
    this.setSerieData(config, dLow, 2, 'Low',
      this.seriaOption(COLOR.S_LOW, this._zhSeriaId(id+'L'))
    )
    this.setSerieData(config, dOpen, 3, 'Open',
      this.seriaOption(COLOR.S_OPEN, this._zhSeriaId(id+'O'))
    )
  },

  setMinMax(config, minValue, maxValue) {
    const plotLines = config.yAxis.plotLines;
    plotLines[0].value = maxValue;
    plotLines[0].label.text = `${ChartConfig.fnNumberFormat(maxValue)}`;
    plotLines[1].value = minValue;
    plotLines[1].label.text = `${ChartConfig.fnNumberFormat(minValue)}`;

    Object.assign(config.yAxis, {
      min: Chart.calcMinY({ minPoint: minValue, maxPoint: maxValue}),
      maxPadding: 0.15,
      minPadding: 0.15,
      endOnTick: false,
      startOnTick: false
    })
  },

  getColor(seriaIndex) {
    const colors = ChartConfig.theme.colors;
    return colors[seriaIndex % colors.length];
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
      height: C.HEIGHT,
      spacingTop: C.THEME_SPACING_TOP,
      spacingBottom: C.SPACING_BOTTOM,
      marginRight: C.MARGIN_RIGHT,
      plotBackgroundColor: COLOR.PLOT,
      backgroundColor : COLOR.CHART,
      reflow: false,

      panning: true,
      panKey: 'shift',

      events : {
        load : function(){
          this.zhTooltip = new Highcharts.Tooltip(this, this.options.tooltip);
        }
      }
    },
    colors: [
             '#7cb5ec',
             '#8abb5d', //'#90ed7d'
             '#f7a35c',
             '#8085e9', '#f15c80', '#e4d354',
             '#2b908f', '#f45b5b', '#91e8e1'
    ],
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
      column: {
        borderWidth: 0,
        //pointWidth: 4,
        groupPadding: 0.1,
        pointPlacement: 'between'
      },
      series : {
        marker: {
          radius: 3,
          symbol: "circle",
          states: {
            hover: {
              lineColor: 'transparent',
              lineWidth: 0,
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
            //const tooltip = this.chart.zhTooltip

            this.chart.zhTooltip.options.enabled = true
            /*
            this.chart.update({
              tooltip: { enabled: true }
            })
            */
            this.chart.zhTooltip.hide(false);
            this.chart.zhTooltip.refresh(event.point, event);
            this.chart.zhTooltip.options.enabled = false
          }
        }
      },
      pie : {
        //colors : Chart.fMonoPieColors()
        colors: C.fMonoPieColors()
      }
    },
    tooltip: {
      useHTML : true,
      enabled : false,
      //enabled : true,
      hideDelay : 100,
      followPointer : false,
      shared : false,

      backgroundColor: COLOR.TOOLTIP,
      borderWidth: 2,
      borderRadius: 10,

      headerFormat: '<span style="font-weight:bold;font-size: 12px; color:rgba(194,149,23,1);">{point.key}</span><br/>',
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
      , decimal = ( arrSplit[1] )
          ? arrSplit[1].length
          : 0;

  return Highcharts.numberFormat(value, decimal, '.', ' ');
}

ChartConfig.fBaseAreaConfig = function(option) {
  const config = Object.assign( Chart.fBaseConfig(), {
    chart: {
      zoomType: 'xy',
      resetZoomButton: Chart.fResetZoomButton({ position: {x: -10} }),
      xDeltaCrossLabel: 4,
      yDeltaCrossLabel: 20
    },
    zhDetailCharts: [],
    zhToggleSeria: ChartFn.toggleSeria
  }, option);

  config.xAxis = Object.assign( Chart.fXAxisOpposite(config.xAxis), {
    events: {
      afterSetExtremes : ChartFn.zoomIndicatorCharts
    }
  })
  config.yAxis = Object.assign(config.yAxis, {
    lineWidth: 0,
    tickLength: 0,
    offset: 4,
    labels: {
      x: 8,
      y: 5
    },
    events: {
      afterSetExtremes: ChartFn.afterSetExtremesYAxis
    }
  })


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
      lineColor: color,
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
      color: color,
      style : {
        fill: color,
        stroke: color,
        color: color,
        fontSize: '12px',
        //fontSize: '11px',
        //fontWeight: 'bold',
        fontWeight: 'normal',
        textShadow: 'none',
        textOutline: '0px transparent'
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
      lineWidth: 1,
      tooltip: Chart.fTooltip(Tooltip.fnBasePointFormatter)
  }, option);
}

export default ChartConfig
