import React, { Component } from 'react';

import withTheme from '../hoc/withTheme'

import ChartStore from '../../flux/stores/ChartStore';
import { ChartActionTypes as CHAT } from '../../flux/actions/ChartActions';

import { ComponentActionTypes as CAT } from '../../flux/actions/ComponentActions';

import ModalSlider from '../zhn-modal-slider/ModalSlider'
import crModelMore from './ModelMore'

import BrowserCaption from '../zhn/BrowserCaption';
import SvgHrzResize from '../zhn/SvgHrzResize';
import ScrollPane from '../zhn/ScrollPane';

import ItemFactory from '../factories/ItemFactory';

const TH_ID = 'CHART_CONTAINER';

const CL = {
  ROOT: "item-container",
  SCROLL: 'scroll-container-y scroll-items',
  SHOW: "show-popup",

  MENU_MORE: "popup-menu charts__menu-more"
};

const CHILD_MARGIN = 36
    , RESIZE_INIT_WIDTH = 635
    , RESIZE_MIN_WIDTH = 395
    , RESIZE_MAX_WIDTH = 1200
    , DELTA = 10;

const S = {
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
    const { chartType } = props;
    this.childMargin = CHILD_MARGIN;

    this._MODEL = crModelMore({
      chartType,
      onMinWidth: this._resizeTo.bind(this, RESIZE_MIN_WIDTH),
      onInitWidth: this._resizeTo.bind(this, RESIZE_INIT_WIDTH),
      onPlusWidth: this._plusToWidth,
      onMinusWidth: this._minusToWidth,
      onFit: this._fitToWidth,
    })

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
      this.setState({ isMore: true })
   }
   _hToggleMore = () => {
     this.setState(prevState => ({
       isMore: !prevState.isMore
     }))
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
     const  { caption, theme } = this.props
          , TS = theme.getStyle(TH_ID)
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
           style={{ ..._styleIsShow, ...TS.ROOT }}
        >
          <ModalSlider
            isShow={isMore}
            className={CL.MENU_MORE}
            style={TS.EL_BORDER}            
            model={this._MODEL}
            onClose={this._hToggleMore}
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
             className={CL.SCROLL}
          >
            <div>
              { this._renderCharts() }
            </div>
          </ScrollPane>
        </div>
     )
   }
}

export default withTheme(ChartContainer)
