import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import ChartStore from '../flux/stores/ChartStore';
import {ChartActionTypes} from '../flux/actions/ChartActions';
import ComponentActions, {ComponentActionTypes} from '../flux/actions/ComponentActions';
import {ModalDialog} from '../constants/Type';

import CaptionRow from './CaptionRow';
import SvgHrzResize from './zhn/SvgHrzResize';
import ScrollPane from './zhn/ScrollPane';
import AreaChartItem from './AreaChartItem';

const CHILD_MARGIN = 36;

const styles = {
  rootDiv : {
    backgroundColor: '#4D4D4D',
    paddingTop : '5px',
    paddingLeft : '5px',
    borderRadius: '10px',
    border: 'solid 3px #232F3B',
    position: 'relative',
    width: '635px',
    /* eslint-disable no-dupe-keys */
    height: '730px',
    height: 'calc(100vh - 71px)',
    /* eslint-enable no-dupe-keys */
    overflowY: 'hidden',
    marginLeft: '10px',
    overflowX : 'hidden'
  },
  hrzResize : {
    position : 'absolute',
    top : '30px',
    right: '0'
  },
  scrollDiv : {
    overflowY: 'auto',
    height: '92%',
    paddingRight: '10px'
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
    this.childMargin = CHILD_MARGIN;
    return {}
  },

   componentWillMount(){
     this.unsubscribe = ChartStore.listen(this._onStore);
     this.setState(ChartStore.getConfigs(this.props.chartType));
   },
   componentWillUnmount(){
     this.unsubscribe();
   },

   _onStore(actionType, data){
      if (isInArray(compActions, actionType)) {
        if (data && data.chartType === this.props.chartType){
          this.setState(data);
        }
      } else if (actionType === ComponentActionTypes.CLOSE_CHART_CONTAINER_2){
         if (data === this.props.chartType){
           this._handlerHide();
         }
      }
   },

   _handlerHide(){
      const { chartType, browserType, onCloseContainer } = this.props;
      onCloseContainer(chartType, browserType);
      this.setState({isShow: false});
   },

   _handlerResizeAfter(parentWidth){
     for (var i=0, max = this.state.configs.length; i<max; i++){
        this.refs['chart' + i].reflowChart(parentWidth - this.childMargin);
     }
   },

   renderCharts(){
     const { chartType, browserType, onCloseItem } = this.props;
     let domCharts = this.state.configs.map((config, index)=>{
       const {id, key} = config.zhConfig;
       return (
         <AreaChartItem
             ref={'chart' + index}
             key={key}
             chartType={chartType}
             caption={id}
             config={config}
             onSetActive={ComponentActions.setActiveCheckbox}
             onCloseItem={onCloseItem.bind(null, chartType, browserType, id)}
             onAddToWatch={ComponentActions.showModalDialog.bind(null, ModalDialog.ADD_TO_WATCH)}
         />
       )
     })

     return domCharts;
   },

   render(){     
     const transitionOption = {
             transitionName : "scaleY",
             transitionEnterTimeout : 400,
             transitionLeave : false
           }
         , styleOpen = this.state.isShow ? {display: 'inline-block'} : {display: 'none'}
         , classOpen = this.state.isShow ? "show-popup" : null;

     return(
        <div
           className={classOpen}
           style={Object.assign({},styles.rootDiv, styleOpen)}
        >
          <CaptionRow
             caption={this.props.caption}
             onClose={this._handlerHide}
          >
             <SvgHrzResize
               minWidth={600}
               maxWidth={1200}
               comp={this}
               onResizeAfter={this._handlerResizeAfter}
             />
          </CaptionRow>

          <ScrollPane style={styles.scrollDiv}>
            <ReactCSSTransitionGroup {...transitionOption} >
              {this.renderCharts()}
            </ReactCSSTransitionGroup>
          </ScrollPane>

        </div>
     )
   }
})

export default ChartContainer2;
