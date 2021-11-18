//import PropTypes from 'prop-types';

import calcDirection from './dataProcessing/calcDirection';
import COLORS  from './Colors';

const S_BARS = {fill: 'slategray'};

const _ceil = Math.ceil
, _max = Math.max;

const _crWidth = (points, strokeWidth) =>
 points && points.length > 1
   ? _ceil(_max(0, points[1].x - points[0].x - parseInt(strokeWidth, 10)))
   : 0;

const Bars = ({
  points=[],
  height,
  style=S_BARS,
  barWidth,
  pointIndex=-1,
  barStrokeColors=COLORS
}) => {
  const { strokeWidth=0 } = style
  , _width = barWidth || _crWidth(points, strokeWidth);

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
                   x={_ceil(x - strokeWidth * i)}
                   y={_ceil(y)}
                   width={_ceil(_width)}
                   height={_ceil(_max(0, height - y))}
                   style={_style}
                />
              );
            }
          )}
      </g>
  );
}

/*
Bars.propTypes = {
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

export default Bars
