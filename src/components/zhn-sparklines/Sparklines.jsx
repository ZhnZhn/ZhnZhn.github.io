import { memo, Children, cloneElement } from 'react';
//import PropTypes from 'prop-types';
import SparklinesLine from './SparklinesLine';

import SparklinesSpots from './SparklinesSpots';
import SparklinesSpot from './SparklinesSpot';
import SparklinesBars from './SparklinesBars';

import SparklinesReferenceLine from './SparklinesReferenceLine';

import SparklinesMinLabel from './SparklinesMinLabel';
import SparklinesMaxLabel from './SparklinesMaxLabel';

import dataToPoints from './dataProcessing/dataToPoints';

//fork https://github.com/borisyankov/react-sparklines

const _isArr = Array.isArray;

const DF = {
  WIDTH: 240,
  HEIGHT: 60,
  RATIO: 'none',
  MARGIN: 2
};

const Sparklines = memo(({
  data,
  limit,
  style,
  preserveAspectRatio=DF.RATIO,
  width=DF.WIDTH,
  height=DF.HEIGHT,
  svgWidth,
  svgHeight,
  margin=DF.MARGIN,
  min,
  max,
  children
}) => {

  if (!_isArr(data) || data.length === 0) {
    return null;
  }

  const points = dataToPoints({ data, limit, width, height, margin, max, min })
  , svgOpts = {
     style, preserveAspectRatio,
     viewBox: `0 0 ${width} ${height}`,
     width: svgWidth > 0 ? svgWidth : void 0,
     height: svgHeight > 0 ? svgHeight : void 0
  };

  return (
    <svg {...svgOpts} >
      {Children.map(children, child =>
          cloneElement(child, { data, points, width, height, margin })
      )}
    </svg>
  );
});

/*
static propTypes = {
  data: PropTypes.array,
  limit: PropTypes.number,
  style: PropTypes.object,
  preserveAspectRatio: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  svgWidth: PropTypes.number,
  svgHeight: PropTypes.number,
  margin: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number
}
*/

export {
  Sparklines, SparklinesLine,
  SparklinesSpots, SparklinesSpot, SparklinesBars,
  SparklinesReferenceLine,
  SparklinesMinLabel, SparklinesMaxLabel
}
