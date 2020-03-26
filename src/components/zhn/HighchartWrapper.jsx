import React, { Component } from 'react';
import Highcharts from 'highcharts';

const S = {
  DIV: {
    position: 'relative',
    zIndex: 1
  },
  SHOW: {
    display: 'block',
  },
  HIDE: {
    display: 'none'
  }
};

const _isFn = fn => typeof fn === 'function';

class HighchartWrapper extends Component {
  static defaultProps = {
    isShow: true,
    isShowAbs: true
  }

  constructor(props){
    super(props)
    this._refChart = React.createRef()
  }

  componentDidMount(){
    const { config, onLoaded } = this.props;
    this._renderChart(config);
    if ( this.chart && _isFn(onLoaded) ){
      onLoaded(this.chart);
    }
  }

  componentWillUnmount(){
    try {
      const { onWillUnLoaded } = this.props;
      if ( _isFn(onWillUnLoaded) ){
        onWillUnLoaded(this.chart);
      }
      this.chart.destroy()
      this.chart = null
    } catch(err) {
      /*eslint-disable no-undef */
      if ( process.env.NODE_ENV === '_development') {
        console.log('Exception during destroy chart')
        console.log(err)
      }
      /*eslint-enable no-undef */
    }
  }

  _renderChart = (config) => {
    if (!config){
      throw new Error('Config must be specified for the ZhHighchart');
    }
    this.chart = new Highcharts['Chart'](
      this._refChart.current, config
    );
  }

  render() {
    const {
      isShow, style,
      isShowAbs, absComp
    } = this.props
    , _style = isShow ? S.SHOW : S.HIDE;
    return (
       <div
         style={{...style, ...S.DIV, ..._style}}
       >
          <div ref={this._refChart} />
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
