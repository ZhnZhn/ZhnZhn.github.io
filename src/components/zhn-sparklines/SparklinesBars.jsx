import React from 'react';
//import PropTypes from 'prop-types';

import calcDirection from './dataProcessing/calcDirection';

const _crWidth = (points, strokeWidth) => points && points.length >= 2
  ? Math.ceil(Math.max(0, points[1].x - points[0].x - strokeWidth))
  : 0;

const SparklinesBars = (props) => {
  const { points=[], height, style={}, barWidth, pointIndex=-1, barStrokeColors } = props
  , { strokeWidth=0 } = style
  , _width = barWidth || _crWidth(points);

  return (
      <g>
          {points.map((p, i) => {
              const { x, y } = p
              , _style = (i === pointIndex)
                   ? { ...style,
                       ...{ fill: barStrokeColors[calcDirection(points, pointIndex)]}
                     }
                   : style;
              return (
                <rect
                   key={i}
                   x={Math.ceil(x - strokeWidth * i)}
                   y={Math.ceil(y)}
                   width={Math.ceil(_width)}
                   height={Math.ceil(Math.max(0, height - y))}
                   style={_style}
                />
              );
            }
          )}
      </g>
  );
}

/*
SparklinesBars.propTypes = {
    points: PropTypes.arrayOf(PropTypes.object),
    height: PropTypes.number,
    style: PropTypes.object,
    barWidth: PropTypes.number
};
*/
SparklinesBars.defaultProps = {
    style: { fill: 'slategray' },
    barStrokeColors: {
        '-1': 'red',
        '0': 'black',
        '1': 'green'
    }
};

export default SparklinesBars
