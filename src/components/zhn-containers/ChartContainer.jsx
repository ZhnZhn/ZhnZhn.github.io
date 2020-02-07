import React, { Component } from 'react';

import { ChartActionTypes as CHAT } from '../../flux/actions/ChartActions';
import { ComponentActionTypes as CAT } from '../../flux/actions/ComponentActions';

import ItemFactory from '../factories/ItemFactory';

import withTheme from '../hoc/withTheme'
import has from '../has'
import A from '../Comp'
import crModelMore from './ModelMore'
import ModalCompareTo from './ModalCompareTo'

const TH_ID = 'CHART_CONTAINER';

const CL = {
  ROOT: "item-container",
  SCROLL: 'scroll-container-y scroll-items',
  SHOW: "show-popup",

  MENU_MORE: "popup-menu charts__menu-more"
};

const CHILD_MARGIN = 36
    , INITIAL_WIDTH = 635
    , MIN_WIDTH = 395
    , MAX_WIDTH = 1200
    , DELTA = 10;

const S = {
  BR_CAPTION: {
    paddingLeft: 4
  },
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


const _isFn = fn => typeof fn === "function";
const _isBool = bool => typeof bool === 'boolean';
const _isInArray = (arr=[], value) => Boolean(~arr.indexOf(value))

const _getWidth = style => parseInt(style.width, 10)
  || INITIAL_WIDTH;
const _toStyleWidth = width => width + 'px';

const _crItemRefPropName = index => 'chart' + index;

const _isInitialWidth = contWidth => contWidth
 && contWidth <= INITIAL_WIDTH ;
const _crMinWidth = ({ width }) => width !== INITIAL_WIDTH
  ? width
  : MIN_WIDTH;


class ChartContainer extends Component {

  static defaultProps = {
    onSetActive: () => {}
  }

  constructor(props){
    super(props);
    const { contWidth } = props
    , _isWidth = _isInitialWidth(contWidth);

    this.childMargin = CHILD_MARGIN;
    this._initialWidthStyle = _isWidth
      ? contWidth
      : has.initWidthStyle(INITIAL_WIDTH, MIN_WIDTH)
    this._MIN_WIDTH = _isWidth
      ? MIN_WIDTH
      : _crMinWidth(this._initialWidthStyle)
    this._MODEL = this._crModelMore()

    this._hSetActive = this._toggleChb.bind(this, true)
    this._hSetNotActive = this._toggleChb.bind(this, false)

    this.state = {
      isMore: false,
      isCompareTo: false
    };
  }

  _crModelMore = (isAdminMode) => {
    const {
      store,
      onRemoveAll, onSortBy
    } = this.props;
    this._isAdminMode = _isBool(isAdminMode)
      ? isAdminMode
      : store.isAdminMode();

    return crModelMore({
      onMinWidth: this._resizeTo.bind(this, this._MIN_WIDTH),
      onInitWidth: this._resizeTo.bind(this, INITIAL_WIDTH),
      onPlusWidth: this._plusToWidth,
      onMinusWidth: this._minusToWidth,
      onFit: this._fitToWidth,
      onShowCaptions: this._onShowCaptions,
      onSortBy,
      onRemoveAll,
      isAdminMode: this._isAdminMode,
      onCompareTo: this._onCompareTo
    });
  }

  componentDidMount(){
    const { store } = this.props;
    this.unsubscribe = store.listen(this._onStore);
    const _initState = store.getConfigs(this.props.chartType)
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

   _getItemMax = () => this.state.configs.length

   _hResizeAfter = (parentWidth) => {
     const max = this._getItemMax();
     let i=0, _refItem;
     for (; i<max; i++) {
        _refItem = this[_crItemRefPropName(i)]
        if (_refItem && _isFn(_refItem.reflowChart)){
          _refItem.reflowChart(parentWidth - this.childMargin)
        }
     }
   }

   _compareTo = (dateTo) => {
     const _arrR = []
     , max = this._getItemMax();
     let i=0, _refItem;
     for (; i<max; i++) {
        _refItem = this[_crItemRefPropName(i)]
        if (_refItem && _isFn(_refItem.compareTo)){
          _arrR.push(_refItem.compareTo(dateTo))
        }
     }
     const _r = max - _arrR.filter(Boolean).length;
     if (max > 0 && _r === 0) {
       this.props.updateMovingValues(_arrR)
     }
     return _r;
   }

   _onShowCaptions = (parentWidth) => {
     const max = this._getItemMax()
     let i=0, _refItem;
     for (; i<max; i++) {
        _refItem = this[_crItemRefPropName(i)]
        if (_refItem && _isFn(_refItem.showCaption)){
          _refItem.showCaption()
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

  _refChart = (index, comp) => this[_crItemRefPropName(index)] = comp

  _renderCharts = () => {
     const {
       chartType, browserType, onCloseItem,
       store
     } = this.props
     , { configs=[] } = this.state
     , _isAdminMode = _isFn(store.isAdminMode)
           ? store.isAdminMode.bind(store)
           : false ;
     return configs.map((config, index) => {
       const { zhConfig={} } = config
           , { id } = zhConfig;
       return ItemFactory.createItem({
          store,
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
     if (w < MAX_WIDTH) {
        style.width = _toStyleWidth(w)
     }
   }
   _minusToWidth = () => {
     const style = this._getRootNodeStyle()
         , w = _getWidth(style) - DELTA;
     if (w > MIN_WIDTH) {
       style.width = _toStyleWidth(w)
     }
   }
   _fitToWidth = () => {
     this._hResizeAfter(parseInt(
       this._rootNode.style.width, 10
     ))
   }

   _onCompareTo = () => {
     this.setState({ isCompareTo: true })
   }
   _closeCompareTo = () => {
     this.setState({ isCompareTo: false })
   }

   _getModelMore = () => {
     const { store } = this.props
     , _isAdminMode = store.isAdminMode?.() || false;
     return this._isAdminMode === _isAdminMode
       ? this._MODEL
       : (this._MODEL = this._crModelMore(_isAdminMode));
   }

   _refRootNode = node => this._rootNode = node
   _refSpComp = node => this.spComp = node

   render(){
     const  {
       theme, caption
     } = this.props
     , TS = theme.getStyle(TH_ID)
     , { isShow, isMore, isCompareTo } = this.state
     , _styleIsShow = isShow
          ? S.INLINE
          : S.NONE
     , _classIsShow = isShow
          ? `${CL.ROOT} ${CL.SHOW}`
          : CL.ROOT
     , _modelMore = this._getModelMore();
     return(
        <div
           ref={this._refRootNode}
           className={_classIsShow}
           style={{
             ...this._initialWidthStyle,
             ..._styleIsShow,
             ...TS.ROOT
           }}
        >
          <A.ModalSlider
            isShow={isMore}
            className={CL.MENU_MORE}
            style={TS.EL_BORDER}
            model={_modelMore}
            onClose={this._hToggleMore}
          />
          { this._isAdminMode && <ModalCompareTo
              isShow={isCompareTo}
              onClose={this._closeCompareTo}
              onCompareTo={this._compareTo}
            />
          }
          <A.BrowserCaption
             style={S.BR_CAPTION}
             onMore={this._showMore}
             onCheck={this._hSetActive}
             onUnCheck={this._hSetNotActive}
             caption={caption}
             onClose={this._hHide}
          >
             <A.SvgHrzResize
               initWidth={INITIAL_WIDTH}
               minWidth={this._MIN_WIDTH}
               maxWidth={MAX_WIDTH}
               comp={this}
               onResizeAfter={this._hResizeAfter}
             />
          </A.BrowserCaption>
          <A.ScrollPane
             ref={this._refSpComp}
             className={CL.SCROLL}
          >
            <div>
              { this._renderCharts() }
            </div>
          </A.ScrollPane>
        </div>
     )
   }
}

export default withTheme(ChartContainer)
