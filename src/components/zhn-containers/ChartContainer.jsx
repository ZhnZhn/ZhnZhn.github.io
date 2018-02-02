import React, { Component } from 'react';

import ChartStore from '../../flux/stores/ChartStore';
import { ChartActionTypes as CHAT } from '../../flux/actions/ChartActions';

import { ComponentActionTypes as CAT } from '../../flux/actions/ComponentActions';

import BrowserCaption from '../zhn/BrowserCaption';
import SvgHrzResize from '../zhn/SvgHrzResize';
import ScrollPane from '../zhn/ScrollPane';

import ItemFactory from '../factories/ItemFactory';

const SHOW_POPUP = "show-popup"
    , CHILD_MARGIN = 36
    , RESIZE_INIT_WIDTH = 635
    , RESIZE_MIN_WIDTH = 540
    , RESIZE_MAX_WIDTH = 1200;

const styles = {
  rootDiv : {
    backgroundColor: '#4D4D4D',
    padding : '0px 0px 3px 0px',
    position: 'relative',
    borderRadius: '4px',
    width: '635px',
    height: 'calc(100vh - 71px)',
    minHeight: '500px',
    marginLeft: '16px',
    boxShadow: '1px 4px 6px 1px rgba(0,0,0,0.6)',
    overflowY: 'hidden',
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
  /*
  transitionOption : {
    transitionName : "scaleY",
    transitionEnterTimeout : 400,
    transitionLeave : false
  },
  */
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
  CHAT.SHOW_CHART,
  CHAT.LOAD_STOCK_COMPLETED,
  CHAT.CLOSE_CHART
];


class ChartContainer extends Component {

  constructor(props){
    super();
    this.childMargin = CHILD_MARGIN;
    this.state = {};
  }

  componentDidMount(){
    this.unsubscribe = ChartStore.listen(this._onStore);
    const _initState = ChartStore.getConfigs(this.props.chartType)
    if (_initState) {
       this.setState(_initState);
    }
  }
  componentWillUnmount(){
    this.unsubscribe();
  }

  _isDataForContainer = (data) => {
    const { chartType } = this.props;
    return data === chartType ||
       (data && data.chartType === chartType);
  }
  _onStore = (actionType, data) => {
     if ( this._isDataForContainer(data) ) {
       if (isInArray(compActions, actionType)) {
         if (actionType !== CHAT.CLOSE_CHART) {
           this.spComp.scrollTop()
         }
         this.setState(data);
       } else if (actionType === CAT.CLOSE_CHART_CONTAINER_2){
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
     let i=0
       , max = this.state.configs.length
       , _propName;
     for (; i<max; i++) {
        _propName = 'chart' + i
        if (this.refs[_propName] && typeof this.refs[_propName].reflowChart === 'function'){
          this.refs[_propName].reflowChart(parentWidth - this.childMargin)
        }
     }
   }

   _renderCharts = () => {
     const { chartType, browserType, onCloseItem } = this.props
         , { configs=[] } = this.state
         , _isAdminMode = (typeof ChartStore.isAdminMode == 'function')
              ? ChartStore.isAdminMode.bind(ChartStore)
              : false ;
     return configs.map((config, index) => {
       const { zhConfig={} } = config
           , { id } = zhConfig;
       return ItemFactory.createItem({
          store: ChartStore,
          config, index,
          option: { chartType },
          props: {
            onCloseItem : onCloseItem.bind(null, chartType, browserType, id),            
            isAdminMode : _isAdminMode
          }
       });
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
          <BrowserCaption
             caption={caption}
             onClose={this._handleHide}
          >
             <SvgHrzResize
               initWidth={RESIZE_INIT_WIDTH}
               minWidth={RESIZE_MIN_WIDTH}
               maxWidth={RESIZE_MAX_WIDTH}
               comp={this}
               onResizeAfter={this._handleResizeAfter}
             />
          </BrowserCaption>

          <ScrollPane
             ref={ node => this.spComp = node}
             style={styles.scrollDiv}
          >
            <div>
              { this._renderCharts() }
            </div>
          </ScrollPane>

        </div>
     )
   }
}

export default ChartContainer
