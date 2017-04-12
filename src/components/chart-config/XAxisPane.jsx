import React, { Component, PropTypes } from 'react'

import safeGet from '../../utils/safeGet'

import RowCheckBox from '../dialogs/RowCheckBox'
import RowInputText from './RowInputText'
import STYLE from './Pane.Style'

const CATEGORY_SERIA_PROPS = {
    xAxis: 'x-category',
    pointPlacement: 'between'
}
const CATEGORY_XAXIS_PROPS = {
  id: 'x-category',
  opposite: true,
  //tickPosition: 'inside',
  //tickmarkPlacement: 'on',
  tickmarkPlacement: 'between',
  tickLength: 0,
  labels: {
    y : -5
  }
}

const _crNextSeries = (series, seriaProps) => {
  return series.map((seria) => {
    const nextData = seria.data.map(point => {
      return point.y;
    })
    return {
      data : nextData,
      type: seria.options.type,
      color: seria.options.color,
      ...seriaProps
    }
  });
}

const _crCategoryXAxis = (arr, props) => {
  return {
    ...props,
    categories: arr
   };
}

class XAxisPane extends Component {
  static propTypes = {
    chart: PropTypes.shape({
      xAxis: PropTypes.arrayOf(PropTypes.object),
      series: PropTypes.arrayOf(PropTypes.object)
    })
  }

 _handleToCategory = (value) => {
    const categories = (''+value).split(',')
        , { chart={} } = this.props
        , xAxis = safeGet(chart, 'xAxis[0]')
        , series = safeGet(chart, 'series', [])
        , nextSeries = _crNextSeries(series, CATEGORY_SERIA_PROPS);

    xAxis.remove(false)
    chart.addAxis(
      _crCategoryXAxis(categories, CATEGORY_XAXIS_PROPS), 
      true, true
    )
    nextSeries.forEach((seria) => {
      chart.addSeries(seria, false)
    })
    chart.redraw()
 }

  _handleEnterLabelsX = (value) => {
    const { chart={} } = this.props
        , xAxis = safeGet(chart, 'xAxis[0]')
        , _n = parseInt(value, 10);
    if (!isNaN(_n) && isFinite(_n)) {
      xAxis.update({labels: { x: _n }})
    }
  }

  _handleOnTick = (is) => {
    const { chart={} } = this.props
        , xAxis = safeGet(chart, 'xAxis[0]');
    xAxis.update({
      endOnTick: is,
      startOnTick: is
    })
  }

  _handleEnterX = (propName, value) => {
     const { chart={} } = this.props
         , year = parseInt(value, 10)
         , ml = Date.UTC(year, 5, 1)
         , xAxis = safeGet(chart, 'xAxis[0]');

     xAxis.update({ [propName] : ml })
  }

  render(){
    return (
      <div style={STYLE.ROOT}>
        <RowInputText
          caption="ToCtgrs:"
          onEnter={this._handleToCategory}
        />
        <RowInputText
           caption="labelsX:"
           initValue=""
           onEnter={this._handleEnterLabelsX}
        />

        <RowCheckBox
          caption="Not Start on tick"
          onCheck={this._handleOnTick.bind(null, false)}
          onUnCheck={this._handleOnTick.bind(null, true)}
        />
        <RowInputText
           caption="minX:"
           initValue=""
           onEnter={this._handleEnterX.bind(null, 'min')}
        />
        <RowInputText
           caption="maxX:"
           initValue=""
           onEnter={this._handleEnterX.bind(null, 'max')}
        />
      </div>
    );
  }
}

export default XAxisPane
