import React, { Component, PropTypes } from 'react'
import safeGet from 'lodash.get'

import CellYAxis from './CellYAxis'
import STYLE from './Pane.Style'

/*
ROOT: {
   paddingTop: '8px',
   minWidth: '300px'
}
*/

class YAxisPane extends Component{
  static propTypes = {
    chart: PropTypes.object
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
