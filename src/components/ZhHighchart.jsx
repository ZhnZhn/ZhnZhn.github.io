import React from 'react';
import Highcharts from 'highcharts';

import ButtonTab from './zhn/ButtonTab';

const styles = {
  rootDivShow : {
    position : 'relative',
    display : 'block'
  },
  rootDivHide : {
    position : 'relative',
    display : 'none'
  }
};

const ZhHighchart = React.createClass({

  displayName: 'ZhHighchart',

  getChart: function(){
    if(!this.chart){
      throw new Error('getChart() should not called before the ZhHighchart component is mounted');
    }
    return this.chart;
  },

  componentDidMount: function(){
    this.renderChart(this.props.config);
  },

  componentWillUnmout: function(){
    this.chart.destroy();
  },

  renderChart: function(config){
    if (!config){
      throw new Error('Config must be specified for the ZhHighchart');
    }

    let chartConfig =  config.chart;
    this.chart = new Highcharts['Chart']({
      ...this.props.config,
      chart: {
        ...chartConfig,
        renderTo: this.refs.chart
      }
    });
  },


  render: function(){
    const {isShow, onClickInfo} = this.props;
    const styleRootDiv = isShow ?
                 styles.rootDivShow : styles.rootDivHide;
     return (
       <div style={styleRootDiv}>
          <ButtonTab
            caption={'Info'}
            onClick={onClickInfo}
          />
          <div ref="chart">
          </div>
        </div>
     )
  }
})

export default ZhHighchart;
