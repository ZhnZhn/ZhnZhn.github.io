
const HighchartsFix = (Highcharts) => {
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
}

export default HighchartsFix
