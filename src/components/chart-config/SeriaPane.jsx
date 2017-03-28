import React, { Component, PropTypes } from 'react'
import safeGet from 'lodash.get'

import CellSeria from './CellSeria'
import STYLE from './Pane.Style'

class SeriaPane extends Component {
  static propTypes = {
    chart: PropTypes.object
  }

  _renderSeries = (chart) => {
      const series = safeGet(chart, 'series', [])
      return series.map((seriaOptions, index) => {
         return (
           <CellSeria
              key={index}
              chart={chart}
              options={seriaOptions}
              seriaIndex={index}
           />
         )
      })
  }

  render(){
    const { chart } = this.props;
    return (
      <div style={STYLE.ROOT}>
        {this._renderSeries(chart)}
      </div>
    );
  }
}

export default SeriaPane
