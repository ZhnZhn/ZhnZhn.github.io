import Highcharts from 'highcharts';

import handleMouseOver from './handleMouseOver';

import {
  COLOR_CHART,
  COLOR_TOOLTIP,
  COLOR_ITEM,
  COLOR_BG_TITLE,
  COLOR_BG_ITEM_HOVER,
  COLOR_TITLE_SHOW,
  COLOR_HOVER,
  COLOR_CHART_PRINT,
  COLOR_PLOT_PRINT,
  COLOR_AREA_FILL_PRINT,
  COLOR_LINE_PRINT,
  COLOR_GRID_LINE_PRINT,
  COLOR_X_LINE,
  COLOR_X_TICK,
  COLOR_X_GRID_LINE,
  COLOR_X_LABEL,
  COLOR_Y_LABEL,
  COLOR_Y_LINE,
  COLOR_Y_TICK,
  COLOR_Y_GRID_LINE
} from '../constants/Color';

import {
  HEIGHT,
  THEME_SPACING_TOP,
  SPACING_BOTTOM,
  MARGIN_RIGHT,
  CREDITS_URL,
  CREDITS_COLOR,
  fMonoPieColors
} from './conf';

const CHART_SERIES_COLORS = [
  '#7cb5ec',
  '#8abb5d', //'#90ed7d'
  '#f7a35c',
  '#8085e9', '#f15c80', '#e4d354',
  '#2b908f', '#f45b5b', '#91e8e1'
];

export const getSeriaColorByIndex = (
  seriaIndex
) => CHART_SERIES_COLORS[seriaIndex % CHART_SERIES_COLORS.length]

const _crAxisLabelStyle = (
  color,
  fontSize
) => ({
  style: {
    color,
    fontSize,
    fontWeight: "bold"
  }
});

export const ChartTheme = {
  credits: {
    enabled: true,
    position: {
        align: 'right',
        x: -25,
        verticalAlign: 'bottom',
        y: -5
    },
    style: {
      fontSize: '11px',
      color: CREDITS_COLOR,
      fill: CREDITS_COLOR,
      textDecoration: 'underline'
    }
  },
  chart : {
    alignTicks: false,
    height: HEIGHT,
    spacingTop: THEME_SPACING_TOP,
    spacingBottom: SPACING_BOTTOM,
    marginRight: MARGIN_RIGHT,
    plotBackgroundColor: 'transparent',
    backgroundColor: 'transparent',
    reflow: false,
    panning: true,
    panKey: 'shift',
    zoomType: 'x',
    style: {
      fontFamily: "Roboto, Arial, Lato, sans-serif",
      fontSize: "15px"
    },
    resetZoomButton: {
      position: {
         align: 'right',
         verticalAlign: 'top',
         x: -10,
         y: 0
      },
      theme: {
        fill: COLOR_BG_TITLE,
        stroke: COLOR_BG_TITLE,
        r: 4,
        style: {
          color: COLOR_TITLE_SHOW
        },
        states: {
          hover: {
            fill: COLOR_BG_TITLE,
            stroke: COLOR_HOVER,
            'stroke-width': 2,
            style: {
              color: COLOR_HOVER
            }
          }
        }
      },
      relativeTo: 'chart'
    },

    events: {
      load: function(){
        this.zhTooltip = new Highcharts.Tooltip(this, this.options.tooltip);
        this.credits.element.onclick = function() {
           window.open(CREDITS_URL, '_blank');
        }
      }
    }
  },
  title: {
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  },
  colors: CHART_SERIES_COLORS,
  labels: {
    items: []
  },
  exporting: {
    fallbackToExportServer: false,
    chartOptions: {
      chart: {
        plotBackgroundColor: COLOR_PLOT_PRINT,
        backgroundColor: COLOR_CHART_PRINT
      },
      title: {
        x: 0,
        y: 5
      },
      subtitle: {
        x: 0,
        y: 22
      },
      plotOptions: {
        area: {
          fillColor: COLOR_AREA_FILL_PRINT
        }
      },
      xAxis: {
        lineWidth: 2,
        lineColor: COLOR_LINE_PRINT,
        gridLineColor: COLOR_GRID_LINE_PRINT
      },
      yAxis: {
        lineWidth: 2,
        lineColor: COLOR_LINE_PRINT,
        gridLineColor: COLOR_GRID_LINE_PRINT
      }
    }
  },
  navigation: {
    buttonOptions: {
      align: 'left',
      x: -10,
      y: -20,
      theme: {
        fill: 'transparent',
        states: {
          hover: {
            'stroke-width': 2,
            stroke: COLOR_HOVER
          }
        }
      }
    },
    menuItemStyle: {
      'font-size': '16px',
      'font-weight': 'bold',
       color: COLOR_ITEM,
       'line-height': '1.6',
       cursor: 'pointer'
    },
    menuItemHoverStyle: {
      color: COLOR_HOVER,
      background: COLOR_BG_ITEM_HOVER
    },
    menuStyle: {
      position: 'relative',
      top: '8px',
      border: '2px solid',
      'border-color': COLOR_BG_TITLE,
      'border-radius': '5px',
      'box-shadow': 'rgba(0, 0, 0, 0.2) 0px 0px 0px 5px',
      background: COLOR_CHART
    }
  },
  plotOptions: {
    area: {
      /*
      fillColor: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
             [0, COLOR.PLOT_G1],
             [1, COLOR.PLOT_G2]
          ]
      },
      */
      point: {
        events: {
          mouseOver: handleMouseOver
        }
      }
    },
    spline: {
      point: {
        events: {
          mouseOver: handleMouseOver
        }
      }
    },
    column: {
      borderWidth: 0,
      //pointWidth: 4,
      groupPadding: 0.1,
      pointPlacement: 0
    },
    series: {
      turboThreshold: 0,
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

      states: {
        hover: {
          halo: {
            opacity: 0.35,
            size: 16
          }
        },
        inactive: {
          enabled: false
        }
      },

      stickyTracking: false,
      events: {
        click: function(event) {
          const tooltip = this.chart.zhTooltip;

          tooltip.options.enabled = true

          tooltip.hide(false);
          tooltip.refresh(event.point, event);
          tooltip.options.enabled = false
        }
      }
    },
    pie : {
      colors: fMonoPieColors()
    }
  },
  tooltip: {
    useHTML: true,
    enabled: false,
    //enabled: true,
    hideDelay: 100,
    followPointer: false,
    shared: false,

    backgroundColor: COLOR_TOOLTIP,
    borderWidth: 2,
    borderRadius: 10,

    headerFormat: '<span style="font-weight:bold;font-size: 12px; color:rgba(194,149,23,1);">{point.key}</span><br/>',
    pointFormat: '<span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Value: </span>'+
                 '<span style="font-weight: bold; color:rgba(194,149,23,1);">{point.y}</span><br/>'
  },
  xAxis: {
    lineColor: COLOR_X_LINE,
    lineWidth: 3,
    tickColor: COLOR_X_TICK,
    //tickWidth: 3,
    //tickLenght: 5,
    tickWidth: 0,
    gridLineColor: COLOR_X_GRID_LINE,
    gridLineDashStyle: "Dot",
    //gridLineDashStyle: "ShortDashDotDot",
    gridLineWidth: 1,
    labels: _crAxisLabelStyle(COLOR_X_LABEL, "15px")
  },
  yAxis: {
      lineColor: COLOR_Y_LINE,
      lineWidth: 3,
      tickColor: COLOR_Y_TICK,
      //tickWidth: 3,
      //tickLenght: 5,
      tickWidth: 0,
      gridLineColor: COLOR_Y_GRID_LINE,
      gridLineDashStyle: "Dot",
      labels: _crAxisLabelStyle(COLOR_Y_LABEL, "14px")
  }
};
