'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
    spacingBottom: 20,
    plotBackgroundColor: "rgba(77,77,77,1)",
    backgroundColor: "rgba(77,77,77,1)",
    reflow: false
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
    }
  },
  tooltip: {
    backgroundColor: 'rgba(0,0,0, 0.5)',
    borderWidth: 2,
    borderRadius: 10,
    headerFormat: '<span style="font-weight: bold; font-size: 12px; color:rgba(194,149,23,1);">{point.key}</span><br/>',
    pointFormat: '<span style="color:rgba(69, 114, 167, 1);font-weight:bold;">USD: </span>' + '<span style="font-weight: bold; color:rgba(194,149,23,1);">{point.y}</span><br/>'
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
  title: {
    text: ''
  },
  legend: {
    enabled: false
  },
  xAxis: {
    type: 'datetime',
    labels: {}
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
    type: 'area'
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
    y: 28,
    formatter: function formatter() {
      return this.point.exValue;
    }
  }
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
    y: 28,
    formatter: function formatter() {
      return this.point.splitRatio;
    }
  }
};

exports.default = ChartConfigs;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\constants\ChartConfigs.js.map