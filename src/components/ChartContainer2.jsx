import React from 'react';

import ChartStore from '../flux/stores/ChartStore';
import {ChartActionTypes} from '../flux/actions/ChartActions';

import ZhHighchart from './ZhHighchart.js';
import CaptionRow from './CaptionRow.js';
import AreaChartItem from './AreaChartItem.js';

const styles = {
  rootDiv : {
    backgroundColor: '#4D4D4D',
    //padding: '5px',
    paddingTop : '5px',
    paddingLeft : '5px',
    borderRadius: '10px',
    border: 'solid 3px #232F3B',
    position: 'relative',
    width: '635px',
    height: '730px',
    overflowY: 'auto',
    marginLeft: '10px',
  },
  chartDiv : {
    overflowY: 'auto',
    height : '680px'
  }
};

const isInArray = function(array, value){
  for (var i=0; i<array.length; i++){
    if (array[i] === value){
      return true;
    }
  }
  return false;
};

const compActions = [
  ChartActionTypes.SHOW_CHART,
  ChartActionTypes.LOAD_STOCK_COMPLETED,
  ChartActionTypes.CLOSE_CHART
];

const ChartContainer2 = React.createClass({

   componentWillMount: function(){
     this.unsubscribe = ChartStore.listen(this._onStore);
     this.setState(ChartStore.getConfigs(this.props.chartType));
   },
   componentWillUnmount: function(){
     this.unsubscribe();
   },

   _onStore: function(actionType, data){
      if (isInArray(compActions, actionType)) {
        if (data.chartType === this.props.chartType){
          this.setState(data);
        }
      }
   },

   _handlerHide: function(){
      this.setState({isShow: false});
   },


   renderCharts: function(){
     const {chartType, onCloseItem} = this.props;
     let domCharts = this.state.configs.map((config, index)=>{
       return (
         <AreaChartItem
             key={config.stockTicket}
             caption={config.stockTicket}
             config={config}
             onCloseItem={onCloseItem.bind(null, chartType, config.stockTicket)}
         />
       )
     })

     return domCharts;
   },

   render: function(){
     const styleOpen = this.state.isShow ? {display: 'inline-block'} : {display: 'none'};
     //const classOpen = this.state.isShow ? "with-scroll show-popup" : "with-scroll";
     const classOpen = this.state.isShow ? "show-popup" : null;

     return(
        <div className={classOpen} style={Object.assign({},styles.rootDiv, styleOpen)}>
          <CaptionRow
             caption={this.props.caption}
             onClose={this._handlerHide}
          />
          <div className="with-scroll" style={styles.chartDiv}>
            {this.renderCharts()}
          </div>

        </div>
     )
   }
})

export default ChartContainer2;
