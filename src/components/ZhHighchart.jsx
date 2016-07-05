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
    this.renderChart(this.props.config);
    if (this.props.onLoaded){
      this.props.onLoaded(this.chart);
    }
  },

  componentWillUnmount(){
    if (this.props.onWillUnLoaded){
      this.props.onWillUnLoaded(this.chart);
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
    const { isShow, toolBar } = this.props;
    const _styleRootDiv = isShow ?
                 styles.rootDivShow : styles.rootDivHide;
     return (
       <div style={_styleRootDiv}>
          {toolBar}
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
