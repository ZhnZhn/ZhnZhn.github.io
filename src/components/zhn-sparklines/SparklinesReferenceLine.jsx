//import PropTypes from 'prop-types'
import { hm as dataProcessing } from './dataProcessing/index';

const DF_STYLE = {
  stroke: 'red',
  strokeOpacity: .75,
  strokeDasharray: '2, 2'
};

const SparklinesReferenceLine = ({
  points,
  margin,
  type="mean",
  style=DF_STYLE,
  value
}) => {
  const ypoints = points.map(p => p.y)
  , y = (type === 'custom')
      ? value
      : dataProcessing[type](ypoints);

  return (
    <line
      x1={points[0].x} y1={y + margin}
      x2={points[points.length - 1].x} y2={y + margin}
      style={style}
    />
  );
}

/*
SparklinesReferenceLine.propTypes = {
  type: PropTypes.oneOf(['max', 'min', 'mean', 'avg', 'median', 'custom']),
  value: PropTypes.number,
  style: PropTypes.object
};
*/

export default SparklinesReferenceLine
