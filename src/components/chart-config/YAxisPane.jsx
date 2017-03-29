import React, { Component, PropTypes } from 'react'

import safeGet from '../../utils/safeGet'

import CellYAxis from './CellYAxis'
import STYLE from './Pane.Style'

class YAxisPane extends Component{
  static propTypes = {
    chart: PropTypes.shape({
      options: PropTypes.shape({
        yAxis: PropTypes.arrayOf(PropTypes.object)
      })
    })
  }

  _renderCells = (chart) => {
    const arrAxis = safeGet(chart, 'options.yAxis', [])
    return arrAxis.map((options, index) => {
       return (
         <CellYAxis
            key={index}
            chart={chart}
            options={options}
            axisIndex={index}
         />
       )
    })
  }

  render(){
    const { chart } = this.props;
    return (
      <div style={STYLE.ROOT}>
        {this._renderCells(chart)}
      </div>
    )
  }
}

export default YAxisPane
