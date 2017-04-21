import React, { Component, PropTypes } from 'react';
import SparklinesLine from './SparklinesLine';

import SparklinesSpots from './SparklinesSpots';
import SparklinesSpot from './SparklinesSpot';
import SparklinesBars from './SparklinesBars';

import SparklinesReferenceLine from './SparklinesReferenceLine';

import dataToPoints from './dataProcessing/dataToPoints';
import shallowCompare from 'react-addons-shallow-compare';

const DEFAULT_DATA = []
    , DEFAULT_WIDTH=240
    , DEFAULT_HEIGHT=60
    , DEFAULT_RATIO='none'
    , DEFAULT_MARGIN = 2;

class Sparklines extends Component {
     static propTypes = {
        data: PropTypes.array,
        limit: PropTypes.number,
        width: PropTypes.number,
        height: PropTypes.number,
        svgWidth: PropTypes.number,
        svgHeight: PropTypes.number,
        preserveAspectRatio: PropTypes.string,
        margin: PropTypes.number,
        style: PropTypes.object,
        min: PropTypes.number,
        max: PropTypes.number
     }

    shouldComponentUpdate(nextProps) {
        return shallowCompare(this, nextProps);
    }

    render() {
        const {
               data=DEFAULT_DATA, limit,
               width=DEFAULT_WIDTH, height=DEFAULT_HEIGHT,
               svgWidth, svgHeight,
               preserveAspectRatio=DEFAULT_RATIO,
               margin=DEFAULT_MARGIN, style, max, min
             } = this.props;

        if (data.length === 0) return null;

        const points = dataToPoints({ data, limit, width, height, margin, max, min })
            , svgOpts = { style: style, viewBox: `0 0 ${width} ${height}`, preserveAspectRatio: preserveAspectRatio };

        if (svgWidth > 0) svgOpts.width = svgWidth;
        if (svgHeight > 0) svgOpts.height = svgHeight;

        return (
            <svg {...svgOpts} >
                {React.Children.map(this.props.children, child =>
                    React.cloneElement(child, { points, width, height, margin })
                )}
            </svg>
        );
    }
}

export { Sparklines, SparklinesLine, SparklinesSpots, SparklinesSpot, SparklinesBars, SparklinesReferenceLine }
