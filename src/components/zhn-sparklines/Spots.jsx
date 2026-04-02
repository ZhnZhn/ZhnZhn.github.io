import COLORS  from './Colors';

if (!Math.sign) {
  Math.sign = (x) => x > 0 ? 1 : -1;
}

const _calcEndSpotDirection = (
  points
) => points.length < 2
  ? 0
  : Math.sign(points[points.length - 2].y - points[points.length - 1].y);


const Spots = ({
  points,
  size=2,
  style,
  spotColors=COLORS
}) => {
  const startSpot = (
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
                  style={style || { fill: spotColors[_calcEndSpotDirection(points)] }}
               />
        );

    return (
        <g>
            {style && startSpot}
            {endSpot}
        </g>
    );
}

/*
Spots.propTypes = {
    size: PropTypes.number,
    style: PropTypes.object,
    spotColors: PropTypes.object
};
*/

export default Spots
