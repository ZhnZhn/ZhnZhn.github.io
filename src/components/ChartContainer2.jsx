import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import ChartStore from '../flux/stores/ChartStore';
import { ChartActionTypes } from '../flux/actions/ChartActions';

import { ComponentActionTypes } from '../flux/actions/ComponentActions';

import CaptionRow from './CaptionRow';
import SvgHrzResize from './zhn/SvgHrzResize';
import ScrollPane from './zhn/ScrollPane';

import ItemFactory from './factories/ItemFactory';

const SHOW_POPUP = "show-popup"
    , CHILD_MARGIN = 36
    , RESIZE_MIN_WIDTH = 600
    , RESIZE_MAX_WIDTH = 1200;

const styles = {
  rootDiv : {
    backgroundColor: '#4D4D4D',
    padding : '8px 3px 3px 8px',    
    position: 'relative',
    width: '635px',
    height: 'calc(100vh - 71px)',
    minHeight: '500px',
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
  },
  inlineBlock : {
    display : 'inline-block'
  },
  none : {
    display: 'none'
  }
};

const isInArray = function(array=[], value){
  let i=0, len=array.length;
  for (; i<len; i++){
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


class ChartContainer2 extends Component {

  constructor(props){
    super();
    this.childMargin = CHILD_MARGIN;
    this.state = {};
  }

  componentWillMount(){
    this.unsubscribe = ChartStore.listen(this._onStore);
    this.setState(ChartStore.getConfigs(this.props.chartType));
  }
  componentWillUnmount(){
    this.unsubscribe();
  }

   _onStore = (actionType, data) => {
      if (isInArray(compActions, actionType)) {
        if (data && data.chartType === this.props.chartType){
          this.setState(data);
        }
      } else if (actionType === ComponentActionTypes.CLOSE_CHART_CONTAINER_2){
         if (data === this.props.chartType){
           this._handleHide();
         }
      }
   }

   _handleHide = () => {
      const { chartType, browserType, onCloseContainer } = this.props;
      onCloseContainer(chartType, browserType);
      this.setState({ isShow: false });
   }

   _handleResizeAfter = (parentWidth) => {
     let i=0, max = this.state.configs.length;
     for (; i<max; i++){
        if (typeof this.refs['chart' + i].reflowChart === 'function'){
          this.refs['chart' + i].reflowChart(parentWidth - this.childMargin);
        }
     }
   }

   _renderCharts = () => {
     const { chartType, browserType, onCloseItem } = this.props;
     return this.state.configs.map((config, index) => {
       const { zhConfig={} } = config
           , { id } = zhConfig;
       return ItemFactory.createItem(
             config, index,
             { chartType },
             { onCloseItem : onCloseItem.bind(null, chartType, browserType, id) }
       );
     });
   }

   render(){
     const  { caption } = this.props
          , { isShow } = this.state
          , _styleIsShow = (isShow)
               ? styles.inlineBlock
               : styles.none
         , _classIsShow = (isShow)
               ? SHOW_POPUP
               : undefined;
     return(
        <div
           className={_classIsShow}
           style={Object.assign({}, styles.rootDiv, _styleIsShow)}
        >
          <CaptionRow
             caption={caption}
             onClose={this._handleHide}
          >
             <SvgHrzResize
               minWidth={RESIZE_MIN_WIDTH}
               maxWidth={RESIZE_MAX_WIDTH}
               comp={this}
               onResizeAfter={this._handleResizeAfter}
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
}

export default ChartContainer2
