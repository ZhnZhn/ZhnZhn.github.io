import { Component, createRef } from 'react';

import { ChartActionTypes as CHAT } from '../../flux/actions/ChartActions';
import { ComponentActionTypes as CAT } from '../../flux/actions/ComponentActions';

import withTheme from '../hoc/withTheme';
import has from '../has';
import crCn from '../zhn-utils/crCn';
import crModelMore from './crModelMore';
import A from '../Comp';
import ModalCompareTo from './ModalCompareTo';
import ChartList from './ChartList';

const TH_ID = 'CHART_CONTAINER';

const CL = {
  ROOT: "item-container",
  SCROLL: 'scroll-container-y scroll-items',
  SHOW: "show-popup",

  MENU_MORE: "popup-menu charts__menu-more"
};

const CHILD_MARGIN = 36
    , INITIAL_WIDTH = 635
    , MIN_WIDTH_WITH_TAB_MINI = 470
    , MIN_WIDTH = 365
    , MAX_WIDTH = 1200
    , STEP = 10;

const S = {
  BR_CAPTION: {
    paddingTop: 2,
    paddingLeft: 2
  },
  CAPTION: {
    position: 'relative',
    top: -1
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
const _isInArray = (arr=[], value) => Boolean(~arr.indexOf(value))

const _crItemRefPropName = index => 'chart' + index;

const _isContWidth = contWidth => contWidth
 && contWidth <= INITIAL_WIDTH;

const _crFnByNameArgs = (ref, methodName, ...args) => () => {
  const _comp = ref.current;
  if (_comp) {
    _comp[methodName](...args)
  }
};

class ChartContainer extends Component {

  static defaultProps = {
    onSetActive: () => {}
  }

  constructor(props){
    super(props);

    this._refRootNode = createRef()
    this._refSpComp = createRef()
    this._refResize = createRef()

    this.childMargin = CHILD_MARGIN
    this._initWidthProperties(props)
    this._initHandlers(props)

    this._hSetActive = this._toggleChb.bind(this, true)
    this._hSetNotActive = this._toggleChb.bind(this, false)

    this.state = {
      isMore: false,
      isCompareTo: false
    };
  }

  _initWidthProperties = (props) => {
    const { contWidth } = props;

    this._initialWidthStyle = _isContWidth(contWidth)
      ? { width: contWidth }
      : has.initWidthStyle(INITIAL_WIDTH, MIN_WIDTH)
    this._INITIAL_WIDTH = this._initialWidthStyle.width
    this._MIN_WIDTH = this._INITIAL_WIDTH > MIN_WIDTH_WITH_TAB_MINI
      ? MIN_WIDTH_WITH_TAB_MINI
      : MIN_WIDTH
  }

  _initHandlers = (props) => {
    const { onSortBy, onRemoveAll } = this.props
    , _refResize = this._refResize;
    this._HANDLERS = {
      onMinWidth: _crFnByNameArgs(_refResize, 'toWidth', this._MIN_WIDTH, true),
      onInitWidth: _crFnByNameArgs(_refResize, 'toWidth', this._INITIAL_WIDTH, true),
      onPlusWidth: _crFnByNameArgs(_refResize, 'resizeBy', STEP),
      onMinusWidth: _crFnByNameArgs(_refResize, 'resizeBy', -STEP),
      onFit: this._fitToWidth,
      onShowCaptions: this._onShowCaptions,
      onSortBy,
      onRemoveAll,
      onCompareTo: this._onCompareTo
    }
  }

  componentDidMount(){
    const { store, chartType } = this.props;
    this.unsubscribe = store.listen(this._onStore);
    const _initState = store.getConfigs(chartType)
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
           this._refSpComp.current.scrollTop = 0
           //this.spComp.scrollTop()
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

   _fitToWidth = () => {
     const { style } = this._refRootNode.current || {}
     , { width } = style || {};
     if (width) {
       this._hResizeAfter(parseInt(width, 10))
     }
   }

   _onCompareTo = () => {
     this.setState({ isCompareTo: true })
   }
   _closeCompareTo = () => {
     this.setState({ isCompareTo: false })
   }

   render(){
     const  {
       theme, caption,
       chartType, browserType, onCloseItem,
       store
     } = this.props
     , TS = theme.getStyle(TH_ID)
     , _isAdminModeFn = _isFn(store.isAdminMode)
          ? store.isAdminMode.bind(store)
          : () => false
     , _isAdminMode = store.isAdminMode?.() || false
     , _modelMore = crModelMore(_isAdminMode, this._HANDLERS)
     , { isShow, isMore, isCompareTo, configs } = this.state
     , _style = isShow ? S.INLINE : S.NONE
     , _className = crCn(CL.ROOT, [isShow, CL.SHOW]);

     return(
        <div
           ref={this._refRootNode}
           className={_className}
           style={{
             ...this._initialWidthStyle,
             ..._style,
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
          { _isAdminMode && <ModalCompareTo
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
             captionStyle={S.CAPTION}
             onClose={this._hHide}
          >
             <A.SvgHrzResize
               ref={this._refResize}
               initWidth={INITIAL_WIDTH}
               minWidth={this._MIN_WIDTH}
               maxWidth={MAX_WIDTH}
               step={STEP}
               nodeRef={this._refRootNode}
               onResizeAfter={this._hResizeAfter}
             />
          </A.BrowserCaption>
          <A.ScrollPane
             innerRef={this._refSpComp}
             className={CL.SCROLL}
          >
            <ChartList
               refChartFn={this._refChart}
               isAdminMode={_isAdminModeFn}
               configs={configs}
               store={store}
               chartType={chartType}
               browserType={browserType}
               onCloseItem={onCloseItem}
            />
          </A.ScrollPane>
        </div>
     )
   }
}

export default withTheme(ChartContainer)
