import React, { Component } from 'react';
import Highcharts from 'highcharts';

const S = {
  SHOW: {
    position: 'relative',
    display: 'block',
    zIndex: 1
  },
  HIDE: {
    position: 'relative',
    display: 'none'
  }
};

class HighchartWrapper extends Component {
  static defaultProps = {
    isShowAbs: true
  }
  componentDidMount(){
    const { config, onLoaded } = this.props;
    this.renderChart(config);
    if ( typeof onLoaded === 'function' ){
      onLoaded(this.chart);
    }
  }

  componentWillUnmount(){
    const { onWillUnLoaded } = this.props;
    if ( typeof onWillUnLoaded === 'function' ){
      onWillUnLoaded(this.chart);
    }

    try {
      this.chart.destroy()
    } catch(err) {
      /*eslint-disable no-undef */
      if ( process.env.NODE_ENV === 'development') {
        console.log('Exception during destroy chart')
        console.log(err)
      }
      /*eslint-enable no-undef */
    }
  }

  renderChart = (config) => {
    if (!config){
      throw new Error('Config must be specified for the ZhHighchart');
    }
    const chartConfig =  config.chart;
    this.chart = new Highcharts['Chart']({
      ...config,
      chart: {
        ...chartConfig,
        renderTo: this.chartEl
      }
    });
  }

  _refChartEl = n => this.chartEl = n

  render() {
    const {
            isShow, rootStyle,
            isShowAbs, absComp
          } = this.props
        , _rootDivStyle = isShow
             ? S.SHOW
             : S.HIDE;
    return (
       <div
         style={{...rootStyle, ..._rootDivStyle}}
       >
          <div ref={this._refChartEl} />
          {isShowAbs && absComp}
        </div>
     );
  }

  getChart() {
    if(!this.chart){
      throw new Error('getChart() should not called before the ZhHighchart component is mounted');
    }
    return this.chart;
  }
}

export default HighchartWrapper
