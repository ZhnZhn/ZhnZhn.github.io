//import PropTypes from 'prop-types';
import {
  isArr,
  memo,
  safeMap,
  cloneUiElement
} from '../uiApi';

import Line from './Line';
import Bars from './Bars';
import Spots from './Spots';
import Spot from './Spot';
import ReferenceLine from './ReferenceLine';

import MinLabel from './MinLabel';
import MaxLabel from './MaxLabel';

import dataToPoints from './dataProcessing/dataToPoints';

const DF_WIDTH = 240
, DF_HEIGHT = 60
, DF_RATIO = 'none'
, DF_MARGIN = 2

const SparkView = memo(({
  data,
  limit,
  style,
  preserveAspectRatio=DF_RATIO,
  width=DF_WIDTH,
  height=DF_HEIGHT,
  svgWidth,
  svgHeight,
  margin=DF_MARGIN,
  min,
  max,
  children
}) => {

  if (!isArr(data) || data.length === 0) {
    return null;
  }

  const points = dataToPoints({
    data,
    limit,
    width,
    height,
    margin,
    max,
    min
  })
  , svgOpts = {
     style,
     preserveAspectRatio,
     viewBox: `0 0 ${width} ${height}`,
     width: svgWidth > 0 ? svgWidth : void 0,
     height: svgHeight > 0 ? svgHeight : void 0
  };

  return (
    <svg {...svgOpts}>
      {safeMap(children, (childElement, index) => cloneUiElement(
        childElement,
        { data, points, width, height, margin },
        childElement.key || index
      ))}
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

export default {
  SparkView,
  Line,
  Bars,
  Spots,
  Spot,
  ReferenceLine,
  MinLabel,
  MaxLabel
}
