import React from 'react';
import { hm as dataProcessing } from './dataProcessing/index';

const SparklinesReferenceLine = (props) => {
  const { points, margin, type, style, value } = props
      , ypoints = points.map(p => p.y)
      , y = (type === 'custom')
            ? value
            : dataProcessing[type](ypoints);

  return (
      <line
          x1={points[0].x} y1={y + margin}
          x2={points[points.length - 1].x} y2={y + margin}
          style={style} />
  )
}

SparklinesReferenceLine.propTypes = {
    type: React.PropTypes.oneOf(['max', 'min', 'mean', 'avg', 'median', 'custom']),
    value: React.PropTypes.number,
    style: React.PropTypes.object
};

SparklinesReferenceLine.defaultProps = {
    type: 'mean',
    style: { stroke: 'red', strokeOpacity: .75, strokeDasharray: '2, 2' }
};

export default SparklinesReferenceLine
