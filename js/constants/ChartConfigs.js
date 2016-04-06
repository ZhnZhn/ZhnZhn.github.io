"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ChartConfigs = {};

ChartConfigs.theme = {
  chart: {
    width: 600,
    height: 300,
    plotBackgroundColor: "rgba(77,77,77,1)",
    backgroundColor: "rgba(77,77,77,1)",
    reflow: false
  },
  plotOptions: {
    area: {
      fillColor: {
        //color: {
        linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
        stops: [
        //[0, "#003399"],
        //[1, "#3366AA"]
        [0, "rgba(69, 114, 167, 1)"], [1, "rgba(2, 0, 0, 0)"]]
        //}
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
    borderWidth: 2,
    borderRadius: 10,
    headerFormat: '<span style="font-size: 12px">{point.key}</span><br/>',
    pointFormat: '<span style="color:rgba(69, 114, 167, 1);font-weight:bold;">USD:</span><b>{point.y}</b><br/>'
  },
  xAxis: {
    lineColor: "rgba(194,149,23,1)",
    lineWidth: 3,
    tickColor: "rgba(194,149,23,1)",
    tickWidth: 3,
    tickLenght: 5,
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
    type: 'datetime'
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
        style: {
          color: 'green'
        }
      }
    }, {
      value: 0.00,
      color: 'red',
      dashStyle: 'solid',
      width: 1,
      zIndex: 4,
      label: {
        text: 'min',
        verticalAlign: 'top',
        y: 12,
        style: {
          color: 'red'
        }
      }
    }]
  },
  series: [{
    type: 'area'
  }]
};

//data: seria
exports.default = ChartConfigs;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\constants\ChartConfigs.js.map