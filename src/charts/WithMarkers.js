import COLOR from '../constants/Color';

const _crMarker = (
  color=COLOR.EX_DIVIDEND,
  dataLabelsY=32
) => ({
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
      fontWeight: 'normal',
      textShadow: 'none',
      textOutline: '0px transparent'
    },
    crop: false,
    overflow: 'none',
    y: dataLabelsY,
    formatter : function(){
      return this.point.exValue;
    }
  }
});

const WithMarkers = {
  crMarkerExDividend: _crMarker,
  crMarkerSplitRatio: () => {
    const point = _crMarker(COLOR.SPLIT_RATIO);
    point.dataLabels.formatter = function() {
      return this.point.splitRatio
    };
    return point;
  }
};

export default WithMarkers
