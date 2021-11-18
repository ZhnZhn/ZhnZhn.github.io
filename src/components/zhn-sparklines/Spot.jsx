//import PropTypes from 'prop-types';

import calcDirection from './dataProcessing/calcDirection';
import COLORS from './Colors'

const Spot = ({
  points,
  size=2,
  style,
  spotColors=COLORS,
  pointIndex
}) => {
  const _point = points[pointIndex]
  , { x, y } = _point || {};

  if ( x == null || y == null ) {
    return null;
  }
  return (
    <g>
      <circle
         cx={x}
         cy={y}
         r={size}
         style={style || { fill: spotColors[calcDirection(points, pointIndex)] }}
      />
    </g>
  );
}


/*
Spot.propTypes = {
    size: PropTypes.number,
    style: PropTypes.object,
    spotColors: PropTypes.object,
    pointIndex: PropTypes.number
};
*/

export default Spot
