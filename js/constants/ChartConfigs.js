'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.markerSplitRatio = exports.tooltipSplitRatio = exports.tooltipExDivident = exports.markerExDividentUp = exports.markerExDivident = undefined;

var _highcharts = require('highcharts');

var _highcharts2 = _interopRequireDefault(_highcharts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChartConfigs = {};

ChartConfigs.theme = {
  credits: {
    position: {
      align: 'left',
      x: 150,
      verticalAlign: 'top',
      y: 15
    }
  },
  chart: {
    width: 600,
    height: 300,
    spacingTop: 20,
    spacingBottom: 24,
    plotBackgroundColor: "rgba(77,77,77,1)",
    backgroundColor: "rgba(77,77,77,1)",
    reflow: false,

    events: {
      load: function load() {
        this.myTooltip = new _highcharts2.default.Tooltip(this, this.options.tooltip);
      }
    }
  },
  plotOptions: {
    area: {
      fillColor: {
        linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
        stops: [[0, "rgba(69, 114, 167, 1)"], [1, "rgba(2, 0, 0, 0)"]]
      },
      marker: {
        states: {
          hover: {
            enabled: true,
            radiusPlus: 2
          }
        }
      }
    },
    series: {
      stickyTracking: false,
      events: {
        click: function click(event) {
          this.chart.myTooltip.refresh(event.point, event);
        }
      }
    }
  },
  tooltip: {
    useHTML: true,
    enabled: false,
    hideDelay: 100,
    followPointer: false,
    shared: false,

    backgroundColor: 'rgba(0,0,0, 0.5)',
    borderWidth: 2,
    borderRadius: 10,

    headerFormat: '<span style="font-weight: bold; font-size: 12px; color:rgba(194,149,23,1);">{point.key}</span><br/>',
    pointFormat: '<span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Value: </span>' + '<span style="font-weight: bold; color:rgba(194,149,23,1);">{point.y}</span><br/>'
  },
  xAxis: {
    lineColor: "rgba(194,149,23,1)",
    lineWidth: 3,
    tickColor: "rgba(194,149,23,1)",
    tickWidth: 3,
    tickLenght: 5,
    gridLineColor: "rgba(194,149,23,1)",
    gridLineDashStyle: "ShortDashDotDot",
    gridLineWidth: 1,
    labels: {
      style: {
        color: "rgba(194,149,23,1)",
        fontWeight: "rgba(194,149,23,1)"
      }
    }
  },
  yAxis: {
    lineColor: "rgba(194,149,23,1)",
    lineWidth: 3,
    tickColor: "rgba(194,149,23,1)",
    tickWidth: 3,
    tickLenght: 5,
    gridLineColor: "rgba(194,149,23,1)",
    gridLineDashStyle: "ShortDashDotDot",
    labels: {
      style: {
        color: "rgba(194,149,23,1)",
        fontWeight: "rgba(194,149,23,1)"
      }
    }
  }
};

ChartConfigs.baseAreaConfig = {
  chart: {},
  title: {
    text: ''
  },
  legend: {
    enabled: false
  },
  xAxis: {
    type: 'datetime',
    labels: {},
    crosshair: {
      color: 'yellow',
      width: 1
    }
  },
  yAxis: {
    title: {
      text: ''
    },
    plotLines: [{
      value: 0.00,
      color: 'green',
      dashStyle: 'solid',
      width: 1,
      zIndex: 4,
      label: {
        text: 'max',
        verticalAlign: 'top',
        //y: 15,
        style: {
          color: 'green',
          fontWeight: 'bold',
          fontSize: 'medium'
        }
      }
    }, {
      value: 0.00,
      color: '#ED5813',
      dashStyle: 'solid',
      width: 1,
      zIndex: 4,
      label: {
        text: 'min',
        verticalAlign: 'top',
        y: 15,
        style: {
          color: '#ED5813',
          fontWeight: 'bold',
          fontSize: 'medium'
        }
      }
    }]
  },
  series: [{
    type: 'area',
    tooltip: {
      pointFormatter: function pointFormatter(obj) {
        var point = this,
            id = this.series.chart.userOptions.chart.zhId,
            date = _highcharts2.default.dateFormat('%A, %b %d, %Y', point.x);
        setTimeout(function () {
          document.getElementById(id).addEventListener('click', function () {
            point.series.chart.myTooltip.hide();
          });
        }, 1);
        return '<span style="font-weight: bold; font-size: 12px; color:rgba(194,149,23,1);">' + date + '</span>' + '<span id="' + id + '" style="display: inline-block; margin-left: 10px; color: #ED5813; cursor: pointer;">[x]</span></br>' + '<span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Value: </span>' + '<span style="font-weight: bold; color:rgba(194,149,23,1);">' + point.y + '</span><br/>';
      },
      headerFormat: ''
    }
  }]
};

var markerExDivident = exports.markerExDivident = {
  y: 0,
  exValue: 0.5,
  marker: {
    symbol: 'circle',
    fillColor: 'rgba(0, 128, 0, 0.9)',
    radius: 6,
    states: {
      hover: {
        enable: true,
        fillColor: '#4D4D4D',
        lineColor: 'green',
        lineWidth: 2,
        radius: 6
      }
    }
  },
  dataLabels: {
    enabled: true,
    inside: true,
    style: {
      color: 'green',
      fontSize: '11px',
      fontWeight: 'bold',
      textShadow: 'none'
    },
    crop: false,
    overflow: 'none',
    y: 32,
    formatter: function formatter() {
      return this.point.exValue;
    }
  }
};

var markerExDividentUp = exports.markerExDividentUp = {
  y: 0,
  exValue: 0.5,
  marker: {
    symbol: 'circle',
    fillColor: 'rgba(0, 128, 0, 0.9)',
    radius: 6,
    states: {
      hover: {
        enable: true,
        fillColor: '#4D4D4D',
        lineColor: 'green',
        lineWidth: 2,
        radius: 6
      }
    }
  },
  dataLabels: {
    enabled: true,
    inside: true,
    style: {
      color: 'green',
      fontSize: '11px',
      fontWeight: 'bold',
      textShadow: 'none'
    },
    crop: false,
    overflow: 'none',
    y: 0,
    formatter: function formatter() {
      return this.point.exValue;
    }
  }
};

var tooltipExDivident = exports.tooltipExDivident = {
  pointFormatter: function pointFormatter(obj) {
    var point = this,
        id = this.series.chart.userOptions.chart.zhId,
        date = _highcharts2.default.dateFormat('%A, %b %d, %Y', point.x);
    setTimeout(function () {
      document.getElementById(id).addEventListener('click', function () {
        point.series.chart.myTooltip.hide();
      });
    }, 1);
    return '<span style="font-weight: bold; font-size: 12px; color:rgba(194,149,23,1);">' + date + '</span>' + '<span id="' + id + '" style="display: inline-block; margin-left: 10px; color: #ED5813; cursor: pointer;">[x]</span></br>' + '<span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Ex-Dividend: </span>' + '<span style="font-weight: bold; color: green;">' + point.exValue + '</span><br/>' + '<span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Stock Price: </span>' + '<span style="font-weight: bold; color:rgba(194,149,23,1);">' + point.price + '</span>';
  },
  headerFormat: ''
};

var tooltipSplitRatio = exports.tooltipSplitRatio = {
  pointFormatter: function pointFormatter(obj) {
    var point = this,
        id = this.series.chart.userOptions.chart.zhId,
        date = _highcharts2.default.dateFormat('%A, %b %d, %Y', point.x);
    setTimeout(function () {
      document.getElementById(id).addEventListener('click', function () {
        point.series.chart.myTooltip.hide();
      });
    }, 1);
    return '<span style="font-weight: bold; font-size: 12px; color:rgba(194,149,23,1);">' + date + '</span>' + '<span id="' + id + '" style="display: inline-block; margin-left: 10px; color: #ED5813; cursor: pointer;">[x]</span></br>' + '<span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Split Ratio: </span>' + '<span style="font-weight: bold; color: #ED5813;">' + point.splitRatio + '</span><br/>' + '<span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Stock Price: </span>' + '<span style="font-weight: bold; color:rgba(194,149,23,1);">' + point.price + '</span>';
  },
  headerFormat: ''
};

var markerSplitRatio = exports.markerSplitRatio = {
  y: 0,
  marker: {
    symbol: 'circle',
    fillColor: '#ED5813',
    radius: 6,
    states: {
      hover: {
        enable: true,
        fillColor: '#4D4D4D',
        lineColor: '#ED5813',
        lineWidth: 2,
        radius: 6
      }
    }
  },
  dataLabels: {
    enabled: true,
    inside: true,
    style: {
      color: '#ED5813',
      fontSize: '11px',
      fontWeight: 'bold',
      textShadow: 'none'
    },
    crop: false,
    overflow: 'none',
    y: 32,
    formatter: function formatter() {
      return this.point.splitRatio;
    }
  }
};

exports.default = ChartConfigs;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\constants\ChartConfigs.js.map