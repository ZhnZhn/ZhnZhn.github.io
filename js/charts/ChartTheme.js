"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _highcharts = _interopRequireDefault(require("highcharts"));

var _handleMouseOver = _interopRequireDefault(require("./handleMouseOver"));

var _Color = _interopRequireDefault(require("../constants/Color"));

var _conf = _interopRequireDefault(require("./conf"));

var ChartTheme = {
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
      color: _conf["default"].CREDITS_COLOR,
      fill: _conf["default"].CREDITS_COLOR,
      textDecoration: 'underline'
    }
  },
  chart: {
    alignTicks: false,
    height: _conf["default"].HEIGHT,
    spacingTop: _conf["default"].THEME_SPACING_TOP,
    spacingBottom: _conf["default"].SPACING_BOTTOM,
    marginRight: _conf["default"].MARGIN_RIGHT,
    plotBackgroundColor: 'transparent',
    backgroundColor: 'transparent',
    reflow: false,
    panning: true,
    panKey: 'shift',
    events: {
      load: function load() {
        this.zhTooltip = new _highcharts["default"].Tooltip(this, this.options.tooltip);

        this.credits.element.onclick = function () {
          window.open(_conf["default"].CREDITS_URL, '_blank');
        };
      }
    }
  },
  title: {
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  },
  colors: ['#7cb5ec', '#8abb5d', //'#90ed7d'
  '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'],
  labels: {
    items: []
  },
  exporting: {
    fallbackToExportServer: false,
    chartOptions: {
      chart: {
        plotBackgroundColor: _Color["default"].PLOT_PRINT,
        backgroundColor: _Color["default"].CHART_PRINT
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
          fillColor: _Color["default"].AREA_FILL_PRINT
        },
        arearange: {
          fillColor: _Color["default"].AREA_FILL_PRINT
        }
      },
      xAxis: {
        lineWidth: 2,
        lineColor: _Color["default"].LINE_PRINT,
        gridLineColor: _Color["default"].GRID_LINE_PRINT
      },
      yAxis: {
        lineWidth: 2,
        lineColor: _Color["default"].LINE_PRINT,
        gridLineColor: _Color["default"].GRID_LINE_PRINT
      },
      labels: {
        items: [{
          html: 'Web app ERC https://zhnzhn.github.io',
          style: {
            left: '0px',
            top: '-70px',
            color: _Color["default"].LABEL_LINK,
            'font-size': '9px'
          }
        }]
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
            stroke: _Color["default"].HOVER
          },
          select: {
            'stroke-width': 3,
            stroke: _Color["default"].HOVER
          }
        }
      }
    },
    menuItemStyle: {
      'font-size': '16px',
      'font-weight': 'bold',
      color: _Color["default"].ITEM,
      'line-height': '1.6',
      cursor: 'pointer'
    },
    menuItemHoverStyle: {
      color: _Color["default"].HOVER,
      background: _Color["default"].BG_ITEM_HOVER
    },
    menuStyle: {
      position: 'relative',
      top: '8px',
      border: '2px solid',
      'border-color': _Color["default"].BG_TITLE,
      'border-radius': '5px',
      'box-shadow': 'rgba(0, 0, 0, 0.2) 0px 0px 0px 5px',
      background: _Color["default"].CHART
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
          mouseOver: _handleMouseOver["default"]
        }
      }
    },
    spline: {
      point: {
        events: {
          mouseOver: _handleMouseOver["default"]
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
          //lineWidthPlus: 1,
          halo: {
            opacity: 0.35,
            //opacity : 0.05,
            size: 16 //size : 2

          }
        }
      },
      stickyTracking: false,
      events: {
        click: function click(event) {
          var tooltip = this.chart.zhTooltip;
          tooltip.options.enabled = true;
          tooltip.hide(false);
          tooltip.refresh(event.point, event);
          tooltip.options.enabled = false;
        }
      }
    },
    pie: {
      colors: _conf["default"].fMonoPieColors()
    }
  },
  tooltip: {
    useHTML: true,
    enabled: false,
    //enabled : true,
    hideDelay: 100,
    followPointer: false,
    shared: false,
    backgroundColor: _Color["default"].TOOLTIP,
    borderWidth: 2,
    borderRadius: 10,
    headerFormat: '<span style="font-weight:bold;font-size: 12px; color:rgba(194,149,23,1);">{point.key}</span><br/>',
    pointFormat: '<span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Value: </span>' + '<span style="font-weight: bold; color:rgba(194,149,23,1);">{point.y}</span><br/>'
  },
  xAxis: {
    lineColor: _Color["default"].X_LINE,
    lineWidth: 3,
    tickColor: _Color["default"].X_TICK,
    tickWidth: 3,
    tickLenght: 5,
    gridLineColor: _Color["default"].X_GRID_LINE,
    gridLineDashStyle: "Dot",
    //gridLineDashStyle: "ShortDashDotDot",
    gridLineWidth: 1,
    labels: {
      style: {
        color: _Color["default"].X_LABEL,
        fontWeight: "bold",
        fontSize: "15px"
      }
    }
  },
  yAxis: {
    lineColor: _Color["default"].Y_LINE,
    lineWidth: 3,
    tickColor: _Color["default"].Y_TICK,
    tickWidth: 3,
    tickLenght: 5,
    gridLineColor: _Color["default"].Y_GRID_LINE,
    gridLineDashStyle: "Dot",
    labels: {
      style: {
        color: _Color["default"].Y_LABEL,
        fontWeight: "bold",
        fontSize: "14px"
      }
    }
  }
};
var _default = ChartTheme;
exports["default"] = _default;
//# sourceMappingURL=ChartTheme.js.map