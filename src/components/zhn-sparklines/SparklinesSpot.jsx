import React from 'react';
import PropTypes from 'prop-types';
import calcDirection from './dataProcessing/calcDirection';

const SparklinesSpot = (props) => {
  const {
          points, size, style, spotColors,
          pointIndex
        } = props
      , pointSpot = (
          <circle
             cx={points[pointIndex].x}
             cy={points[pointIndex].y}
             r={size}
             style={style || { fill: spotColors[calcDirection(points, pointIndex)] }}
          />
        );

    return (
        <g>
          {pointSpot}
        </g>
    )
}

SparklinesSpot.propTypes = {
    size: PropTypes.number,
    style: PropTypes.object,
    spotColors: PropTypes.object,
    pointIndex: PropTypes.number
};
SparklinesSpot.defaultProps = {
    size: 2,
    spotColors: {
        '-1': 'red',
        '0': 'black',
        '1': 'green'
    }
}

export default SparklinesSpot
