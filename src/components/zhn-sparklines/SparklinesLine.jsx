//import PropTypes from 'prop-types';

const SparklinesLine = ({
  points=[],
  height,
  margin,
  color,
  style={}
}) => {
  const linePoints = points
     .map((p) => [p.x, p.y])
     .reduce((a, b) => a.concat(b))
  , closePolyPoints = [
      points[points.length - 1].x, height - margin,
      margin, height - margin,
      margin, points[0].y
    ]
  , fillPoints = linePoints.concat(closePolyPoints)
  , lineStyle = {
      stroke: color || style.stroke || 'slategray',
      strokeWidth: style.strokeWidth || '1',
      strokeLinejoin: style.strokeLinejoin || 'round',
      strokeLinecap: style.strokeLinecap || 'round',
      fill: 'none'
    }
  , fillStyle = {
      stroke: style.stroke || 'none',
      strokeWidth: '0',
      fillOpacity: style.fillOpacity || '.1',
      fill: style.fill || color || 'slategray'
    };

  return (
    <g>
        <polyline points={fillPoints.join(' ')} style={fillStyle} />
        <polyline points={linePoints.join(' ')} style={lineStyle} />
    </g>
  );
}

/*
SparklinesLine.propTypes = {
  points: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  })),
  height: PropTypes.number,
  margin: PropTypes.number,
  color: PropTypes.string,
  style: PropTypes.object
};
*/

export default SparklinesLine
