import { Component } from 'react'

import ScrollPane from '../zhn/ScrollPane'
import SeriaRow from './SeriaRow'

const CL = {
  ELL: 'ellipsis'
};

const S = {
  ROOT_DIV: {
    paddingTop: 8
  },
  TITLE: {
    paddingBottom: 4,
    marginLeft: 16,
    marginBottom: 8,
    fontWeight: 'bold',
    borderBottom: '2px solid black'
  },
  CHART_ID: {
    width: 200,
    verticalAlign: 'bottom',
    color: 'rgb(164, 135, 212)',
  }
};

/*
const DF_FROM_CHART = {
  userOptions: {
    zhConfig: {
      id: 'id'
    }
  },
  series: []
};
*/

const _crYAxisOption = (toChart) => {
  const options = [{
    caption: 'withYAxis',
    value: -1
  }];
  toChart.yAxis.forEach((yAxis, index) => {
    options.push ({
      caption: `toYAxis${index+1}`,
      value: index
    })
  })
  return options;
};

class SeriesPane extends Component {

   compSeries = []

  _regSeriaRow = (comp) => {
    const compIndex = comp.props.compIndex;
    this.compSeries[compIndex] = comp
  }
  _unregSeriaRow = (comp) => {
    const compIndex = comp.props.compIndex;
    this.compSeries[compIndex] = null
  }

  _renderSeries = (chartId, series, options) => {
    return series
      .filter(seria => seria.visible)
      .map((seria, index) => {
         return (
           <SeriaRow
              key={chartId + index}
              seria={seria}
              compIndex={index}
              yAxisOptions={options}
              onReg={this._regSeriaRow}
              onUnReg={this._unregSeriaRow}
           />
        );
    })
  }

  render(){
    const { style, toChart, fromChart={} } = this.props
        , _yAxisOption = _crYAxisOption(toChart)
        , { userOptions={}, series=[] } = fromChart
        , { zhConfig={} } = userOptions
        , { id:chartId='id' } = zhConfig;

    return (
      <ScrollPane style={style}>
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
            {this._renderSeries(chartId, series, _yAxisOption)}
          </div>
        </div>
      </ScrollPane>
    );
  }

  getValues(){
    const {
      fromChart={}
    } = this.props
    , {
      dataMin, dataMax,
      userMin, userMax
    } = (fromChart.xAxis
      && fromChart.xAxis[0].getExtremes()) || {};
    return this.compSeries
      .filter(comp => comp !== null )
      .map(comp => comp.getValue())
      .filter(config => config.isChecked)
      .map(config => {
        config.userMin = userMin || dataMin
        config.userMax = userMax || dataMax
        return config;
      });
  }
}

export default SeriesPane
