import Highcharts from 'highcharts';

import mathFn from '../math/mathFn'

import ArrayUtil from '../utils/ArrayUtil';
import DateUtils from '../utils/DateUtils';
import safeGet from '../utils/safeGet';

import Chart from './Chart';
import ChartConfig from './ChartConfig';
import { Direction } from '../constants/Type';

import WithAreaChartFn from './WithAreaChartFn'

const _fnFindIndex = ArrayUtil.findIndexByProp('x')

const C = {
  C1_SECOND_Y_AXIS: '#f45b5b',
  C2_SECOND_Y_AXIS: '#f7a35c',
  SERIA_LABEL_CHARS : 12,
  SERIA_LABELS_IN_ROW : 3,
  SERIA_LABEL_X_DELTA : 145,
  SERIA_LABEL_Y_DELTA : 95,
  SERIA_LABEL_WIDTH : 125,
  SERIA_LABEL_HEIGHT : 20,
  DATE_PATTERN : '%d-%m-%Y',
  ATTR_LABEL : {
    zIndex : 100
  },
  CSS_LABEL : {
    color: 'yellow',
    fontSize: '15px'
  },

  CL_DY: 4,

  DX_CATEGORY: 40,
  DY_CATEGORY: 32
}

const _fnNoop = () => {};

const _initOptionsZhSeries = (chart) => {
  const options = chart.options
      , zhSeries = options.zhSeries;
  if (!zhSeries){
    options.zhSeries = {
      count: 0,
      titleEls: []
    }
  } else if (!zhSeries.titleEls){
    zhSeries.titleEls = []
  }
  return options;
}

const _crYAxisColor = (chart) => {
  switch(chart.yAxis.length){
    case 1: return C.C1_SECOND_Y_AXIS;
    case 2: return C.C2_SECOND_Y_AXIS;
    default: return C.C1_SECOND_Y_AXIS;
  }
}

const _addSeries = ({ chart, series, label, hasSecondYAxis }) => {
  let _color;
  if (hasSecondYAxis){
    _color = _crYAxisColor(chart)
    chart.addAxis( Chart.fSecondYAxis(label, _color) )
    series.yAxis = label
    series.color = _color
  }

  if (Array.isArray(series)){
    const _max = series.length - 1;
    series.forEach((seria, index) => {
      if (hasSecondYAxis) {
        seria.yAxis = label
      }
      if (index !== _max ) {
        chart.addSeries(seria, false, false)
      } else {
        chart.addSeries(seria, true, true)
      }
    })
  } else {
    chart.addSeries(series, true, true)
  }
  return _color;
}

const _renderSeriesLabel = ({chart, options, series, label='', color }) => {
  const seriesText = (label.length>C.SERIA_LABEL_CHARS)
            ? label.substring(0, C.SERIA_LABEL_CHARS)
            : label
      , seriesCount = options.zhSeries.count
      , row = Math.floor(seriesCount/C.SERIA_LABELS_IN_ROW)
      , x = C.SERIA_LABEL_X_DELTA
            + C.SERIA_LABEL_WIDTH*seriesCount
            - row*(C.SERIA_LABEL_WIDTH*C.SERIA_LABELS_IN_ROW)
      , y = C.SERIA_LABEL_Y_DELTA + C.SERIA_LABEL_HEIGHT*row;

  const textEl = chart.renderer.text(seriesText, x, y)
                  .css({
                    color: (color) ? color : options.colors[series._colorIndex],
                    'font-size': '16px'
                  })
                  .add();
  return textEl;
}

const _updateYAxisMin = ({ hasSecondYAxis, series, options={}, chart }) => {
  const minY = series.minY
      , min = safeGet(options, 'yAxis[0].min')
      , _yAxis = safeGet(chart, 'yAxis[0]')
      , update = safeGet(chart, 'yAxis[0].update', _fnNoop).bind(_yAxis);
  if ( !hasSecondYAxis && (minY !== undefined) && min>minY ){
      update({ min: minY, startOnTick: true });
  }
};

const _crCrossParam = (point, chart) => {
  return {
    y: point.y,
    date: Highcharts.dateFormat(C.DATE_PATTERN, point.x),
    dX: chart.options.chart.xDeltaCrossLabel,
    dY: chart.options.chart.yDeltaCrossLabel
  };
};

const _crCategoryCrossParam = (point, chart) => {
  return {
    y: ChartFn.toNumberFormat(point.y),
    date: point.x,
    dX: chart.options.chart.xDeltaCrossLabel - C.DX_CATEGORY,
    dY: chart.options.chart.yDeltaCrossLabel - C.DY_CATEGORY
  };
};

const _crYCrossLabelX = (chart, dX) => {
  return chart.yAxis[0].width + chart.plotLeft + dX;
};
const _crYCrossLabelY = (chart, plotY) => {
  return plotY + chart.plotTop + C.CL_DY;
};

const ChartFn = {
  ...WithAreaChartFn,

  addSeriaWithRenderLabel(props){
    const { chart, series, label, hasSecondYAxis } = props;
    const options = _initOptionsZhSeries(chart);
    const color = _addSeries({ chart, series, label, hasSecondYAxis });
    const textEl = _renderSeriesLabel({ chart, options, series, label, color });

    options.zhSeries.count +=1
    options.zhSeries.titleEls.push(textEl)

    _updateYAxisMin({ hasSecondYAxis, series, options, chart })
  },

  handlerMouserOverPoint(event){
     const { isCategory, plotX, plotY, series={} } = this
         , chart = series.chart
         , { y, date, dX, dY } = !isCategory
                ? _crCrossParam(this, chart)
                : _crCategoryCrossParam(this, chart);

     if (chart.xCrossLabel) {
       chart.xCrossLabel.attr({
         x : plotX,
         text: date
       });
       chart.yCrossLabel.attr({
         x: _crYCrossLabelX(chart, dX),
         y: _crYCrossLabelY(chart, plotY),
         text: y
       });
     } else {
       chart.xCrossLabel = chart
          .renderer
          .text(date, plotX, chart.plotTop - dY)
          .attr(C.ATTR_LABEL)
          .css(C.CSS_LABEL)
          .add();
       chart.yCrossLabel = chart
          .renderer
          .text(
            y,
            _crYCrossLabelX(chart, dX),
            _crYCrossLabelY(chart, plotY)
          )
          .attr(C.ATTR_LABEL)
          .css(C.CSS_LABEL)
          .add();
     }
  },

  toggleSeria(chart, item){
    const { name, color, index, isSecondAxes, seria } = item;

    if (isSecondAxes){
      if (!seria.visible){
        chart.addAxis(
          Chart.fSecondYAxis(name, color)
        );
        seria.yAxis = name;
        seria.visible = true;
        chart.addSeries(seria);
      } else {
        seria.visible = false;
        chart.get(name).remove();
      }
    } else {
      const seria = chart.series[index];
      if (seria.visible){
        seria.hide()
      }  else {
        seria.show();
      }
    }
  },

  zoomIndicatorCharts(event){
    const zhDetailCharts = this.chart.options.zhDetailCharts
       , { userMin, userMax, min, max } = event;
    if (userMin){
      zhDetailCharts.forEach( chart => {
        chart.xAxis[0].setExtremes( userMin, userMax, true, true);
      })
    } else {
      zhDetailCharts.forEach( chart => {
        chart.xAxis[0].setExtremes( min, max, true, true);
      })
    }
  },
  afterSetExtremesYAxis(event){
    const { trigger, userMax, userMin } = event;
    if (trigger === 'zoom' && userMax) {
      this.setExtremes(
        userMin, userMax + (userMax-userMin)*0.05,
        true, true
      )
    }
  },

  crValueMoving(chart, prev, dateTo){
    const points = chart.series[0].data
        , millisUTC = DateUtils.dmyToUTC(dateTo)
        , index = _fnFindIndex(points, millisUTC);

    let valueTo;
    if (index !== -1) {
      valueTo = points[index].y
      const valueMoving = Object.assign(
        {}, prev,
        mathFn.crValueMoving({
          nowValue: prev.value,
          prevValue: valueTo,
          Direction: Direction,
          fnFormat: ChartConfig.fnNumberFormat
        }),
        { valueTo, dateTo }
      )
      return valueMoving;
    } else {
      return undefined;
    }
  },

  addDataTo(toChart, color, data, withoutYAxis){
    const _id = withoutYAxis
              ? undefined
              : "pasteId";
    if (!withoutYAxis) {
      toChart.addAxis({
          id: _id,
          opossite: true,
          title: {
            text: ''
          },
          lineColor: color,
          tickColor: color,
          labels: {
            style: {
              color: color
            }
          }
        }, false, true)
    }
    toChart.addSeries({
      type: 'spline',
      yAxis: _id,
      color: color,
      data: data
    }, false)
    toChart.redraw()
  },

  toNumberFormat(value){
    const arrSplit = (value+'').split('.')
        , decimal = (arrSplit[1]) ? 2 : 0;
    return Highcharts.numberFormat(value, decimal, '.', ' ');
  }

}

export default ChartFn
