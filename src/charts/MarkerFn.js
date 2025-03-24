import {
  COLOR_PLOT,
  COLOR_EX_DIVIDEND
} from '../constants/Color';

const _crMarker = (
  color,
  formatterPointPropName
) => ({
  y: 0,
  exValue: 0.5,
  marker : {
    symbol: 'circle',
    fillColor: color,
    lineColor: color,
    radius: 6,
    states: {
      hover: {
        enable: true,
        fillColor: COLOR_PLOT,
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
    y: 32,
    formatter: function(){
      return this.point[formatterPointPropName];
    }
  }
});

export const crMarkerExDividend = () => _crMarker(
  COLOR_EX_DIVIDEND,
  'exValue'
)
