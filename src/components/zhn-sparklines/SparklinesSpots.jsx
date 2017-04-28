import React from 'react';

if (!Math.sign) {
  Math.sign = function(x) { return x > 0 ? 1 : -1; }
}

const calcEndSpotDirection = function(points) {
  return points.length < 2
          ? 0
          : Math.sign(points[points.length - 2].y - points[points.length - 1].y);
}

const SparklinesSpots = (props) => {
  const { points, size, style, spotColors } = props
      , startSpot = (
               <circle
                  cx={points[0].x}
                  cy={points[0].y}
                  r={size}
                  style={style}
                />
        )
      , endSpot = (
               <circle
                  cx={points[points.length - 1].x}
                  cy={points[points.length - 1].y}
                  r={size}
                  style={style || { fill: spotColors[calcEndSpotDirection(points)] }}
               />
        );

    return (
        <g>
            {style && startSpot}
            {endSpot}
        </g>
    )
}

SparklinesSpots.propTypes = {
    size: React.PropTypes.number,
    style: React.PropTypes.object,
    spotColors: React.PropTypes.object
};
SparklinesSpots.defaultProps = {
    size: 2,
    spotColors: {
        '-1': 'red',
        '0': 'black',
        '1': 'green'
    }
}

export default SparklinesSpots
