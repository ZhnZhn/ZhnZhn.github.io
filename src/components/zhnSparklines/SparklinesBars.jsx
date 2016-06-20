import React from 'react';
import calcDirection from './dataProcessing/calcDirection';

class SparklinesBars extends React.Component {
    render() {

        const { points, height, style, barWidth, pointIndex=-1, barStrokeColors } = this.props
            , strokeWidth = 1 * ((style && style.strokeWidth) || 0)
            , width = barWidth || (points && points.length >= 2 ? Math.ceil(Math.max(0, points[1].x - points[0].x - strokeWidth)) : 0);

        return (
            <g>
                {points.map((p, i) => {
                    const _style = ( i === pointIndex)
                             ? Object.assign({}, style, { fill: barStrokeColors[calcDirection(points, pointIndex)]} )
                             : style;
                    return (
                      <rect
                         key={i}
                         x={Math.ceil(p.x - strokeWidth * i)}
                         y={Math.ceil(p.y)}
                         width={Math.ceil(width)}
                         height={Math.ceil(Math.max(0, height - p.y))}
                         style={_style}
                      />
                    );
                  }
                )}
            </g>
        )
    }
}

SparklinesBars.propTypes = {
    points: React.PropTypes.arrayOf(React.PropTypes.object),
    height: React.PropTypes.number,
    style: React.PropTypes.object,
    barWidth: React.PropTypes.number
};
SparklinesBars.defaultProps = {
    style: { fill: 'slategray' },
    barStrokeColors: {
        '-1': 'red',
        '0': 'black',
        '1': 'green'
    }
};

export default SparklinesBars
