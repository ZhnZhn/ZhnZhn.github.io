import React, { Component } from 'react'

import ScrollPane from '../zhn/ScrollPane'
import SeriaRow from './SeriaRow'

const CL = {
  ELL: 'ellipsis'
}

const S = {
  ROOT_DIV: {
    paddingTop: '8px'
  },
  TITLE: {
    paddingBottom: '4px',
    marginLeft: '16px',
    marginBottom: '8px',
    fontWeight: 'bold',
    borderBottom: '2px solid black'
  },
  CHART_ID: {
    width: '200px',
    verticalAlign: 'bottom',
    color: 'rgb(164, 135, 212)',
  }
};

class SeriesPane extends Component {

   constructor(){
     super()
     this.compSeries = []
   }

  _regSeriaRow = (comp) => {
    const compIndex = comp.props.compIndex
    this.compSeries[compIndex] = comp
  }
  _unregSeriaRow = (comp) => {
    const compIndex = comp.props.compIndex
    this.compSeries[compIndex] = null
  }

  _renderSeries = (chartId, series) => {
    return series
      .filter(seria => seria.visible)
      .map((seria, index) => {
         return (
           <SeriaRow
              key={chartId + index}
              seria={seria}
              compIndex={index}
              onReg={this._regSeriaRow}
              onUnReg={this._unregSeriaRow}
           />
        );
    })
  }

  render(){
    const { rootStyle, fromChart={} } = this.props
        , { userOptions={}, series=[] } = fromChart
        , { zhConfig={} } = userOptions
        , { id:chartId='id' } = zhConfig;
    return (
      <ScrollPane style={rootStyle}>
        <div style={S.ROOT_DIV}>
          <div style={S.TITLE}>
            <span>From Chart:&nbsp;</span>
            <span
               className={CL.ELL}
               style={S.CHART_ID}
            >
              {chartId}
            </span>
          </div>
          <div>
            {this._renderSeries(chartId, series)}
          </div>
        </div>
      </ScrollPane>
    );
  }

  getValues(){
    return this.compSeries
      .filter(comp => comp !== null )
      .map(comp => comp.getValue())
      .filter(config => config.isChecked);
  }
}

export default SeriesPane
