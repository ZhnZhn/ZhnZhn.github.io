import Highcharts from 'highcharts'

import COLOR from '../constants/Color';
import C from './conf';

const ChartTheme = {
  credits: {
    enabled : true,
    position : {
        align: 'right',
        x: -25,
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
    plotBackgroundColor: 'transparent',
    backgroundColor: 'transparent',
    //plotBackgroundColor: COLOR.PLOT,
    //backgroundColor : COLOR.CHART,
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
        //fill : COLOR.BG_TITLE,
        fill : 'transparent',
        states : {
          hover : {
            //fill : COLOR.BG_TITLE,
            'stroke-width' : 2,
            stroke : COLOR.HOVER
          },
          select : {
            //fill : COLOR.BG_TITLE,
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
            //opacity : 0.05,
            size : 16
            //size : 2
          }
        }
      },

      stickyTracking : false,
      events : {
        click : function(event) {
          const tooltip = this.chart.zhTooltip;

          tooltip.options.enabled = true

          tooltip.hide(false);
          tooltip.refresh(event.point, event);
          tooltip.options.enabled = false
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
    gridLineDashStyle: "Dot",
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
      gridLineDashStyle: "Dot",
      labels: {
        style: {
          color : COLOR.Y_LABEL,
          fontWeight: "bold",
          fontSize: "14px"
        }
      }
  }
};

export default ChartTheme
