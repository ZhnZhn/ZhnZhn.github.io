import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import ChartStore from '../flux/stores/ChartStore';
import { ChartActionTypes } from '../flux/actions/ChartActions';

import { ComponentActionTypes } from '../flux/actions/ComponentActions';

import CaptionRow from './CaptionRow';
import SvgHrzResize from './zhn/SvgHrzResize';
import ScrollPane from './zhn/ScrollPane';

import ItemFactory from './factories/ItemFactory';

const CSS_CLASS_SHOW_POPUP = "show-popup"
    , CHILD_MARGIN = 36;

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
  },
  transitionOption : {
    transitionName : "scaleY",
    transitionEnterTimeout : 400,
    transitionLeave : false
  }
};

const isInArray = function(array, value){
  for (let i=0, len=array.length; i<len; i++){
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
    return {};
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
      this.setState({ isShow: false });
   },

   _handlerResizeAfter(parentWidth){
     for (let i=0, max = this.state.configs.length; i<max; i++){
        if (typeof this.refs['chart' + i].reflowChart === 'function'){
          this.refs['chart' + i].reflowChart(parentWidth - this.childMargin);
        }
     }
   },

   _renderCharts(){
     const { chartType, browserType, onCloseItem } = this.props;

     return this.state.configs.map((config, index) => {
       const { zhConfig } = config
          ,  { id } = zhConfig

       return ItemFactory.createItem(
             config, index,
             { chartType },
             { onCloseItem : onCloseItem.bind(null, chartType, browserType, id) }
       );
     });
   },

   render(){
     const { isShow } = this.state

          , _styleIsShow = (isShow)
               ? {display: 'inline-block'}
               : {display: 'none'}
         , _classIsShow = (isShow)
               ? CSS_CLASS_SHOW_POPUP
               : undefined;
     return(
        <div
           className={_classIsShow}
           style={Object.assign({}, styles.rootDiv, _styleIsShow)}
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
            <ReactCSSTransitionGroup
               {...styles.transitionOption}
               component="div"
            >
               { this._renderCharts() }
            </ReactCSSTransitionGroup>
          </ScrollPane>

        </div>
     )
   }
})

export default ChartContainer2;
