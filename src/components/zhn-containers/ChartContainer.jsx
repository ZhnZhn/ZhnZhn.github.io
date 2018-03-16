import React, { Component } from 'react';

import ChartStore from '../../flux/stores/ChartStore';
import { ChartActionTypes as CHAT } from '../../flux/actions/ChartActions';

import { ComponentActionTypes as CAT } from '../../flux/actions/ComponentActions';

import ChartMorePopup from './ChartMorePopup'

import BrowserCaption from '../zhn/BrowserCaption';
import SvgHrzResize from '../zhn/SvgHrzResize';
import ScrollPane from '../zhn/ScrollPane';

import ItemFactory from '../factories/ItemFactory';

const CL = {
  ROOT: "item-container",
  SHOW: "show-popup"
};

const CHILD_MARGIN = 36
    , RESIZE_INIT_WIDTH = 635
    , RESIZE_MIN_WIDTH = 395
    , RESIZE_MAX_WIDTH = 1200
    , DELTA = 10;

const S = {
  SCROLL: {
    overflowY: 'auto',
    height: '92%',
    paddingRight: '10px'
  },
  /*
  transitionOption : {
    transitionName : "scaleY",
    transitionEnterTimeout : 400,
    transitionLeave : false
  },
  */
  INLINE: {
    display: 'inline-block'
  },
  NONE: {
    display: 'none'
  }
};

const isInArray = function(array=[], value){
  const len=array.length;
  let i=0;
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

const _getWidth = (style) => {
  return parseInt(style.width, 10)
    || RESIZE_INIT_WIDTH;
}

class ChartContainer extends Component {

  constructor(props){
    super();
    this.childMargin = CHILD_MARGIN;
    this.state = {
      isMore: false
    };
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
         this._hHide();
       }
     }
   }

   _hHide = () => {
      const { chartType, browserType, onCloseContainer } = this.props;
      onCloseContainer(chartType, browserType);
      this.setState({ isShow: false });
   }

   _hResizeAfter = (parentWidth) => {
     let i=0
       , max = this.state.configs.length
       , _propName;
     for (; i<max; i++) {
        _propName = this._crChartPropName(i)
        if (this[_propName] && typeof this[_propName].reflowChart === 'function'){
          this[_propName].reflowChart(parentWidth - this.childMargin)
        }
     }
   }

   _showMore = () => {
     if (!this.state.isMore) {
       this.setState({ isMore: true })
     }
   }
   _closeMore = () => {
     this.setState({ isMore: false })
   }

  _crChartPropName = (index) => 'chart' + index
  _refChart = (index, comp) => this[this._crChartPropName(index)] = comp

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
            ref: this._refChart.bind(null, index),
            onCloseItem: onCloseItem.bind(null, chartType, browserType, id),
            isAdminMode: _isAdminMode
          }
       });
     });
   }

   _resizeTo = (width) => {
     this._rootNode.style.width = width + 'px';
     this._hResizeAfter(width)
   }
   _resizeToMin = () => {
     this._resizeTo(RESIZE_MIN_WIDTH)
   }
   _resizeToInit = () => {
     this._resizeTo(RESIZE_INIT_WIDTH)
   }

   _plusToWidth = () => {
     const { _rootNode={} } = this
         , { style={} } = _rootNode
         , w = _getWidth(style) + DELTA;
     if (w < RESIZE_MAX_WIDTH) {
        style.width = w + 'px'
     }
   }
   _minusToWidth = () => {
     const { _rootNode={} } = this
         , { style={} } = _rootNode
         , w = _getWidth(style) - DELTA;
     if (w > RESIZE_MIN_WIDTH) {
       style.width = w  + 'px'
     }
   }
   _fitToWidth = () => {
     this._hResizeAfter(parseInt(
       this._rootNode.style.width, 10
     ))
   }

   _refRootNode = node => this._rootNode = node
   _refSpComp = node => this.spComp = node

   render(){
     const  { caption } = this.props
          , { isShow, isMore } = this.state
          , _styleIsShow = (isShow)
               ? S.INLINE
               : S.NONE
         , _classIsShow = (isShow)
               ? `${CL.ROOT} ${CL.SHOW}`
               : CL.ROOT;
     return(
        <div
           ref={this._refRootNode}
           className={_classIsShow}
           style={_styleIsShow}
        >
          <ChartMorePopup
            isShow={isMore}
            onClose={this._closeMore}
            onResizeToMin={this._resizeToMin}
            onResizeToInit={this._resizeToInit}
            onPlusWidth={this._plusToWidth}
            onMinusWidth={this._minusToWidth}
            onFit={this._fitToWidth}
          />
          <BrowserCaption
             isMore={true}
             caption={caption}
             onMore={this._showMore}
             onClose={this._hHide}
          >
             <SvgHrzResize
               initWidth={RESIZE_INIT_WIDTH}
               minWidth={RESIZE_MIN_WIDTH}
               maxWidth={RESIZE_MAX_WIDTH}
               comp={this}
               onResizeAfter={this._hResizeAfter}
             />
          </BrowserCaption>
          <ScrollPane
             ref={this._refSpComp}
             style={S.SCROLL}
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
