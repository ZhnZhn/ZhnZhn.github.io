import React from 'react';
import calcDirection from './dataProcessing/calcDirection';

class SparklinesSpot extends React.Component {

    render() {

        const {
                points, width, height,
                size, style, spotColors,
                pointIndex
              } = this.props
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
}

SparklinesSpot.propTypes = {
    size: React.PropTypes.number,
    style: React.PropTypes.object,
    spotColors: React.PropTypes.object,
    pointIndex: React.PropTypes.number
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
