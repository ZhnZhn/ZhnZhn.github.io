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

const COMP_ACTIONS = [
  CHAT.SHOW_CHART,
  CHAT.LOAD_STOCK_COMPLETED,
  CHAT.CLOSE_CHART
];

const _isInArray = (arr=[], value) => Boolean(~arr.indexOf(value))

const _getWidth = style => parseInt(style.width, 10)
  || RESIZE_INIT_WIDTH;
const _toStyleWidth = width => width + 'px';

const _isFn = fn => typeof fn === "function";


class ChartContainer extends Component {

  static defaultProps = {
    onSetActive: () => {}
  }

  constructor(props){
    super(props);
    const { chartType, onRemoveAll } = props;
    this.childMargin = CHILD_MARGIN;

    this._MODEL = crModelMore({
      chartType,
      onMinWidth: this._resizeTo.bind(this, RESIZE_MIN_WIDTH),
      onInitWidth: this._resizeTo.bind(this, RESIZE_INIT_WIDTH),
      onPlusWidth: this._plusToWidth,
      onMinusWidth: this._minusToWidth,
      onFit: this._fitToWidth,
      onShowCaptions: this._onShowCaptions,
      onRemoveAll
    })

    this._hSetActive = this._toggleChb.bind(this, true)
    this._hSetNotActive = this._toggleChb.bind(this, false)

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
       if (_isInArray(COMP_ACTIONS, actionType)) {
         if (actionType !== CHAT.CLOSE_CHART) {
           this.spComp.scrollTop()
         }
         this.setState(data);
       } else if (actionType === CAT.CLOSE_CHART_CONTAINER_2){
         this._hHide();
       }
     }
   }

   _toggleChb = (isCheck, checkBox) => {
      const {
        onSetActive,
        chartType, browserType
      } = this.props;
      checkBox.chartType = chartType
      checkBox.browserType = browserType
      onSetActive(isCheck, checkBox)
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
        if (this[_propName] && _isFn(this[_propName].reflowChart)){
          this[_propName].reflowChart(parentWidth - this.childMargin)
        }
     }
   }

   _onShowCaptions = (parentWidth) => {
     let i=0
       , max = this.state.configs.length
       , _propName;
     for (; i<max; i++) {
        _propName = this._crChartPropName(i)
        if (this[_propName] && _isFn(this[_propName].showCaption)){
          this[_propName].showCaption()
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
         , _isAdminMode = _isFn(ChartStore.isAdminMode)
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

   _getRootNodeStyle = () => {
     const { _rootNode } = this
     , { style={} } = _rootNode || {};
     return style;
   }

   _resizeTo = (width) => {
     this._getRootNodeStyle().width = _toStyleWidth(width);
     this._hResizeAfter(width)
   }

   _plusToWidth = () => {
     const style = this._getRootNodeStyle()
         , w = _getWidth(style) + DELTA;
     if (w < RESIZE_MAX_WIDTH) {
        style.width = _toStyleWidth(w)
     }
   }
   _minusToWidth = () => {
     const style = this._getRootNodeStyle()
         , w = _getWidth(style) - DELTA;
     if (w > RESIZE_MIN_WIDTH) {
       style.width = _toStyleWidth(w)
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
     const  {
       theme, caption
     } = this.props
     , TS = theme.getStyle(TH_ID)
     , { isShow, isMore } = this.state
     , _styleIsShow = isShow
          ? S.INLINE
          : S.NONE
     , _classIsShow = isShow
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
             onMore={this._showMore}
             onCheck={this._hSetActive}
             onUnCheck={this._hSetNotActive}
             caption={caption}
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
