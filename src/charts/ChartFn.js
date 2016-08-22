import Highcharts from 'highcharts';

import Chart from './Chart';

const C = {
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

const ChartFn = {
  addSeriaWithRenderLabel(chart, series, label){
    const options = chart.options;
    
    const seriesText = (label.length>C.SERIA_LABEL_CHARS)
              ? label.substring(0,C.SERIA_LABEL_CHARS)
              : label
        , seriesCount = options.zhSeries.count
        , row = Math.floor(seriesCount/C.SERIA_LABELS_IN_ROW)
        , x = C.SERIA_LABEL_X_DELTA
              + C.SERIA_LABEL_WIDTH*seriesCount
              - row*(C.SERIA_LABEL_WIDTH*C.SERIA_LABELS_IN_ROW)
        , y = C.SERIA_LABEL_Y_DELTA + C.SERIA_LABEL_HEIGHT*row;

    chart.addSeries(series, true, true);
    chart.renderer.text(seriesText, x, y)
          .css({ color: options.colors[series._colorIndex], 'font-size': '16px' })
          .add();

    options.zhSeries.count +=1;

    if ( (series.minY !== undefined) && options.yAxis[0].min>series.minY ){
        chart.yAxis[0].update({ min: series.minY, startOnTick: true });
    }

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
  }

}

export default ChartFn
