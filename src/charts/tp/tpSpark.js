import { render } from 'react-dom';

import SparkFactory from '../../components/factories/SparkFactory';

import {
  crHeader,
  crRow,
  toNumberFormat,
  addHideHandler
} from './tpFn';

import { YEAR_COLOR } from './Colors';


const SPARKLINES_SUFFIX_ID = 'sparklines'
    , SPARKLINES_BAR_SUFFIX_ID = 'sparklines_bar'
    , WIDTH_CHAR = 10
    , WIDTH_VALUE = 54
    , WIDTH_TOTAL = 50
    , WIDTH_SPARK = 20 + 80 + 16;

const _fnCalcWidthSparkType4 = (
  value,
  total
) => {
  const _width1 = WIDTH_VALUE + value.length*WIDTH_CHAR
  , _width2 = WIDTH_TOTAL + total.length*WIDTH_CHAR
  , width = (_width1>_width2) ? _width1 : _width2
  , fullWidth = width + WIDTH_SPARK;
  return {
    fullWidth,
    width
  };
}

const _fnTooltipSparkType4 = ({
  fullWidth,
  width,
  year,
  value,
  total,
  percent,
  id
}) => {
  const _style = `style="float:left;padding-right:10px;width:${width}px;"`;
  return `<div class="tp__body">
  <div class="tp__body__part1" style="width:${fullWidth}px;" >
    <div ${_style}>
      ${crRow('Year', year, { color: YEAR_COLOR })}
      ${crRow('Value', value)}
    </div>
    <div id="${id}_${SPARKLINES_SUFFIX_ID}" class="tp__body__sparklines">
    </div>
  </div>
  <div class="tp__body__part1" style="width:${fullWidth}px;" >
    <div ${_style}>
      ${crRow('Total', total)}
      ${crRow('Percent', percent)}
    </div>
    <div id="${id}_${SPARKLINES_BAR_SUFFIX_ID}" class="tp__body__sparklines">
    </div>
  </div>`;
}

const _crSparkData = (point) => {
  const { sparkvalues, sparkpercent } = point;
  let  sparkLinesData = []
  , sparkBarsData = []
  , pointIndex;

  if (sparkvalues) {
    sparkLinesData = sparkvalues;
    sparkBarsData = sparkpercent;
    pointIndex = (sparkvalues.length !== 0)
       ? sparkvalues.length - 1
       : 0 ;
  } else {
    const seriesData = point.series.data;
    seriesData.forEach((item, itemIndex) => {
       sparkLinesData.push(item.y);
       sparkBarsData.push(item.percentage)
    })
    pointIndex = point.index
  }
  return {
    sparkLinesData,
    sparkBarsData,
    pointIndex
  };
};

const _onAfterRender = function(id, point){
  setTimeout( function(){
          addHideHandler(id, point)
          const {
                  sparkLinesData, sparkBarsData,
                  pointIndex
                } = _crSparkData(point)
             , sparklines = SparkFactory.createSparklines(sparkLinesData, pointIndex)
             , sparkbars = SparkFactory.createSparkbars(sparkBarsData, pointIndex);
         render( sparklines, document.getElementById(`${id}_${SPARKLINES_SUFFIX_ID}`))
         render( sparkbars, document.getElementById(`${id}_${SPARKLINES_BAR_SUFFIX_ID}`))
  }, 1);
}

const _crStackedArea = ({
  id,
  value,
  point
}) => {
  const {
    nameFull,
    category,
    percent='0.0',
    total=0
  } = point
  , _total = toNumberFormat(total)
  , { fullWidth, width } = _fnCalcWidthSparkType4(value, _total);

  return crHeader(nameFull, id) + _fnTooltipSparkType4({
    fullWidth, width, year: category, value, total: _total, percent, id
  });
}

const _crTreeMap = ({
  id,
  point
}) => {
  const {
    nameFull,
    year,
    value='0.0',
    percent='0.0',
    total=0
  } = point
  , _value = toNumberFormat(value)
  , _total = toNumberFormat(total)
  , { fullWidth, width } = _fnCalcWidthSparkType4(_value, _total);

  return crHeader(nameFull, id) + _fnTooltipSparkType4({
    fullWidth, width, year, value: _value, total: _total, percent, id
  })
}

export const sparkStackedArea = {
  fnTemplate: _crStackedArea,
  onAfterRender: _onAfterRender,
  isWithValue: true
}
export const sparkTreeMap = {
  fnTemplate: _crTreeMap,
  onAfterRender: _onAfterRender,
  isWithValue: true
}
