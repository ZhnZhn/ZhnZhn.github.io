//import PropTypes from 'prop-types';

import calcDirection from './dataProcessing/calcDirection';
import STYLE from './style'

const SparklinesSpot = ({
  points,
  size=2,
  style,
  spotColors=STYLE.COLORS,
  pointIndex
}) => (
  <g>
    <circle
       cx={points[pointIndex].x}
       cy={points[pointIndex].y}
       r={size}
       style={style || { fill: spotColors[calcDirection(points, pointIndex)] }}
    />
  </g>
);


/*
SparklinesSpot.propTypes = {
    size: PropTypes.number,
    style: PropTypes.object,
    spotColors: PropTypes.object,
    pointIndex: PropTypes.number
};
*/

export default SparklinesSpot
