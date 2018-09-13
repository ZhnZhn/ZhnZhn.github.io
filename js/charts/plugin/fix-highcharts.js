'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var HighchartsFix = function HighchartsFix(Highcharts) {
  /*
     Drop-in fix for arearange destroy exception:
     "isSVG of undefined": 5.0.14: issues/7021
  */
  Highcharts.wrap(Highcharts.seriesTypes.arearange.prototype.pointClass.prototype, 'setState', function (proceed) {
    proceed.apply(this, Array.prototype.slice.call(arguments, 1));
    if (this.series.stateMarkerGraphic) {
      this.series.lowerStateMarkerGraphic = undefined;
    }
  });

  /*
    Fast regression fix to Array
   "plotLine labels does not render
    in browser that support Array.prototype.flat
    ": 5.0.14: issues/8477
    fixed from 6.1
  */
  if (Array && Array.prototype.flat) {
    Array.prototype.flat = undefined;
  }
};

exports.default = HighchartsFix;
//# sourceMappingURL=fix-highcharts.js.map