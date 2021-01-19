//import PropTypes from 'prop-types';

import calcDirection from './dataProcessing/calcDirection';
import STYLE from './style';

const _crWidth = (points, strokeWidth) => points
&& points.length > 1
  ? Math.ceil(Math.max(0, points[1].x - points[0].x - strokeWidth))
  : 0;

const SparklinesBars = ({
  points=[],
  height,
  style=STYLE.BARS,
  barWidth,
  pointIndex=-1,
  barStrokeColors=STYLE.COLORS
}) => {
  const { strokeWidth=0 } = style
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
    points: PropTypes.arrayOf(PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    })),
    height: PropTypes.number,
    style: PropTypes.object,
    barWidth: PropTypes.number,
    pointIndex: PropTypes.number
    barStrokeColors: PropTypes.arrayOf(PropTypes.object)
};
*/

export default SparklinesBars
