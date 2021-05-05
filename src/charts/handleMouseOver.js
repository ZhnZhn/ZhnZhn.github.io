import formatNumber from '../utils/formatNumber';
import dateFormat from './dateFormat';
import calcDeltaYAxis from './calcDeltaYAxis';

const { formatDate } = dateFormat;

const C = {
  DATE_PATTERN : '%d-%m-%Y',
  DATE_EMPTY: '01-01-1970',

  ATTR_LABEL : {
    zIndex : 100
  },
  CSS_LABEL : {
    //color: '#f1d600',
    color: 'black',
    fontWeight: 'bold',
    fontSize: '14px'
  },

  CL_DX: -4,
  CL_DY: -1,

  DX_CATEGORY: 40,
  DY_CATEGORY: 32,

  DX_DELTA_Y_AXIS: 10
};

const _crDelta = (chart, dX=0, dY=0) => {
  const { xDeltaCrossLabel=0, yDeltaCrossLabel=0 } = chart.options.chart;
  return {
    dX: xDeltaCrossLabel - dX,
    dY: yDeltaCrossLabel - dY
  };
};

const _crCrossParam = (point, chart) => {
  const _d = formatDate(C.DATE_PATTERN, point.x);
  return {
    y: point.y,
    date: _d !== C.DATE_EMPTY ? _d : '',
    ..._crDelta(chart)
  };
};

const _crCategoryCrossParam = (point, chart) => ({
  y: formatNumber(point.y),
  date: point.x,
  ..._crDelta(chart, C.DX_CATEGORY, C.DY_CATEGORY)
});

const _crYCrossLabelX = (chart, dX) => {
  return chart.yAxis[0].width + chart.plotLeft + dX + C.CL_DX;
};
const _crYCrossLabelY = (chart, plotY) => {
  return plotY + chart.plotTop + C.CL_DY;
};

const handleMouserOverPoint = function(event){
  const { isCategory, c, plotX, plotY, series } = this
  , chart = series.chart
  , { xCrossLabel, yCrossLabel } = chart
  , { y, date, dX, dY } = (!isCategory || c)
      ? _crCrossParam(this, chart)
      : _crCategoryCrossParam(this, chart)
  , deltaYAxis = calcDeltaYAxis(chart)
  , xLX = deltaYAxis
      ? plotX + deltaYAxis - C.DX_DELTA_Y_AXIS
      : plotX
  , xLY = _crYCrossLabelX(chart, dX)
  , yLY = _crYCrossLabelY(chart, plotY);

  if (xCrossLabel) {
    xCrossLabel.attr({ x: xLX, text: date });
    yCrossLabel.attr({ x: xLY, y: yLY, text: y });
  } else {
    chart.xCrossLabel = chart.renderer
      .text(date, xLX, chart.plotTop - dY)
      .attr(C.ATTR_LABEL)
      .css(C.CSS_LABEL)
      .add();
    chart.yCrossLabel = chart.renderer
      .text(y, xLY, yLY)
      .attr(C.ATTR_LABEL)
      .css(C.CSS_LABEL)
      .add();
  }
};

export default handleMouserOverPoint
