import Highcharts from 'highcharts';

import handleMouseOver from './handleMouseOver';

import {
  COLOR_TOOLTIP,
  COLOR_BG_TITLE,  
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

import {
  CL_TP_HEADER,
  CL_TP_TITLE,
  CL_TP_VALUE
} from './CL';

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
      enabled: false
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
          enabled: false,
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

    headerFormat: `<span class="${CL_TP_HEADER}">{point.key}</span><br/>'`,
    pointFormat: `<span class="${CL_TP_TITLE}">Value: </span>`+
                 `<span class="${CL_TP_VALUE}">{point.y}</span><br/>`
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
      labels: _crAxisLabelStyle(COLOR_Y_LABEL, "15px")
  }
};
