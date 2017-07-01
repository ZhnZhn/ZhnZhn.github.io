import Highcharts from 'highcharts';

import mathFn from '../math/mathFn'

import ArrayUtil from '../utils/ArrayUtil';
import DateUtils from '../utils/DateUtils';
import safeGet from '../utils/safeGet';

import Chart from './Chart';
import ChartConfig from './ChartConfig';
import { Direction } from '../constants/Type';

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
  }
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
  const _ = chart.yAxis.length;
  if (_ === 1) {
    return C.C1_SECOND_Y_AXIS;
  } else if (_ === 2) {
    return C.C2_SECOND_Y_AXIS;
  } else {
    return C.C1_SECOND_Y_AXIS;
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
  chart.addSeries(series, true, true)
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

const ChartFn = {
  addSeriaWithRenderLabel(props){
    const { chart, series, label, hasSecondYAxis } = props;

    const options = _initOptionsZhSeries(chart);
    const color = _addSeries({ chart, series, label, hasSecondYAxis })
    const textEl = _renderSeriesLabel({ chart, options, series, label, color })

    options.zhSeries.count +=1
    options.zhSeries.titleEls.push(textEl)

    _updateYAxisMin({ hasSecondYAxis, series, options, chart })
  },

  handlerMouserOverPoint(event){
     const chart = this.series.chart
         , x = this.x
         , y = this.y
         , plotX = this.plotX
         , plotY = this.plotY
         , date = Highcharts.dateFormat(C.DATE_PATTERN, x)
         , dX = chart.options.chart.xDeltaCrossLabel
         , dY = chart.options.chart.yDeltaCrossLabel;


     if (chart.xCrossLabel) {
       chart.xCrossLabel.attr({
         x : plotX,
         text: date
       });
       chart.yCrossLabel.attr({
         x : chart.yAxis[0].width + chart.plotLeft + dX,
         y: plotY + chart.plotTop,
         text: y
       });
     } else {
       chart.xCrossLabel = chart.renderer.text(date, plotX, chart.plotTop - dY)
                             .attr(C.ATTR_LABEL)
                             .css(C.CSS_LABEL)
                             .add();
       chart.yCrossLabel = chart.renderer.text(y, chart.yAxis[0].width + chart.plotLeft + dX , plotY + chart.plotTop)
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
    const zhDetailCharts = this.chart.options.zhDetailCharts;
    if (event.userMin){
      zhDetailCharts.forEach((chart)=>{
        chart.xAxis[0].setExtremes(
          event.userMin, event.userMax, true, true
        );
      })
    } else {
      zhDetailCharts.forEach((chart) => {
        chart.xAxis[0].setExtremes(
          event.min, event.max, true, true
        );
      })
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
  }
}

export default ChartFn
