import React from 'react';
import Highcharts from 'highcharts';

const styles = {
  rootDivShow : {
    position : 'relative',
    display : 'block',
    zIndex : 1
  },
  rootDivHide : {
    position : 'relative',
    display : 'none'
  }
};

const ZhHighchart = React.createClass({

  displayName: 'ZhHighchart',

  componentDidMount(){
    const { config, onLoaded } = this.props;
    this.renderChart(config);
    if ( typeof onLoaded === 'function' ){
      onLoaded(this.chart);
    }
  },

  componentWillUnmount(){
    const { onWillUnLoaded } = this.props;
    if ( typeof onWillUnLoaded === 'function' ){
      onWillUnLoaded(this.chart);
    }
  },

  componentWillUnmout(){
    this.chart.destroy();
  },

  renderChart(config){
    if (!config){
      throw new Error('Config must be specified for the ZhHighchart');
    }

    const chartConfig =  config.chart;
    this.chart = new Highcharts['Chart']({
      ...config,
      chart: {
        ...chartConfig,
        renderTo: this.refs.chart
      }
    });
  },

  render() {
    const { isShow } = this.props
        , _styleRootDiv = isShow ? styles.rootDivShow : styles.rootDivHide;

    return (
       <div style={_styleRootDiv}>
          <div ref="chart">
          </div>
        </div>
     )
  },


  getChart(){
    if(!this.chart){
      throw new Error('getChart() should not called before the ZhHighchart component is mounted');
    }
    return this.chart;
  }

})

export default ZhHighchart;
