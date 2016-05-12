import React from 'react';

import ChartStore from '../flux/stores/ChartStore';
import {ChartActionTypes} from '../flux/actions/ChartActions';
import ComponentActions, {ComponentActionTypes} from '../flux/actions/ComponentActions';

import ZhHighchart from './ZhHighchart';
import CaptionRow from './CaptionRow';
import AreaChartItem from './AreaChartItem';

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

    //paddingRight : '10px',
    overflowX : 'hidden'
  },
  hrzResize : {
    position : 'absolute',
    top : '30px',
    right: '0'
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
  getInitialState(){
    this.childMargin = 36;
    return {}
  },

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
      } else if (actionType === ComponentActionTypes.CLOSE_CHART_CONTAINER_2){
         if (data === this.props.chartType){
           this._handlerHide();
         }
      }
   },

   _handlerHide: function(){
      const {chartType, browserType, onCloseContainer} = this.props;
      onCloseContainer(chartType, browserType);
      this.setState({isShow: false});
   },


   _handlerResizeAfter(parentWidth){
     for (var i=0, max = this.state.configs.length; i<max; i++){
        this.refs['chart' + i].reflowChart(parentWidth - this.childMargin);
     }
   },

   renderCharts: function(){
     const {chartType, browserType, onCloseItem} = this.props;
     let domCharts = this.state.configs.map((config, index)=>{
       return (
         <AreaChartItem
             ref={'chart' + index}
             key={config.stockTicket}
             caption={config.stockTicket}
             config={config}
             onSetActive={ComponentActions.setActiveCheckbox}
             onCloseItem={onCloseItem.bind(null, chartType, browserType, config.stockTicket)}
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
        <div
           className={classOpen}
           style={Object.assign({},styles.rootDiv, styleOpen)}
        >
          <CaptionRow
             caption={this.props.caption}
             isResizable={true}
             minWidth={600}
             maxWidth={1200}
             comp={this}
             onResizeAfter={this._handlerResizeAfter}
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
