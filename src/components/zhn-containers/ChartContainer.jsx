import {
  Component,
  createRef,
  getRefElementStyle
} from '../uiApi';

import {
  CHAT_SHOW,
  CHAT_LOAD_COMPLETED,
  CHAT_CLOSE
} from '../../flux/actions/ChartActions';
import {
  CAT_CLOSE_CHART_CONTAINER_2
} from '../../flux/actions/ComponentActions';

import withTheme from '../hoc/withTheme';
import { initWidthStyle } from '../has';
import crCn from '../zhn-utils/crCn';
import crModelMore from './crModelMore';
import A from '../Comp';
import ModalCompareTo from './ModalCompareTo';
import ChartList from './ChartList';

const TH_ID = 'CHART_CONTAINER';

const CL_ROOT = "item-container"
, CL_SCROLL = 'scroll-container-y scroll-items'
, CL_SHOW_CONT = "show-cont"
, CL_MENU_MORE = "popup-menu charts__menu-more"

, CHILD_MARGIN = 36
, INITIAL_WIDTH = 635
, MIN_WIDTH_WITH_TAB_MINI = 470
, MIN_WIDTH = 365
, MAX_WIDTH = 1200
, STEP = 10

, S_BR_CAPTION = {
  paddingTop: 2,
  paddingLeft: 2
}
, S_SVG_MORE = {
  position: 'relative',
  top: 2
}
, S_CAPTION = {
  position: 'relative',
  top: -1
}
, S_INLINE = { display: 'inline-block' }
, S_NONE = { display: 'none' };

const CHAT_ACTIONS = [
  CHAT_SHOW,
  CHAT_LOAD_COMPLETED,
  CHAT_CLOSE
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

const _isDataForContainer = (
  data,
  chartType
) => data === chartType ||
  (data && data.chartType === chartType);

class ChartContainer extends Component {

  static defaultProps = {
    onSetActive: () => {}
  }

  constructor(props){
    super(props);

    this._refRootElement = createRef()
    this._refSpComp = createRef()
    this._refResize = createRef()

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
      : initWidthStyle(INITIAL_WIDTH, MIN_WIDTH)
    this._INITIAL_WIDTH = this._initialWidthStyle.width
    this._MIN_WIDTH = this._INITIAL_WIDTH > MIN_WIDTH_WITH_TAB_MINI
      ? MIN_WIDTH_WITH_TAB_MINI
      : MIN_WIDTH
  }

  _initHandlers = (props) => {
    const {
      onSortBy,
      onRemoveAll
    } = this.props
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
    const {
      store,
      chartType
    } = this.props;
    this.unsubscribe = store.listen(this._onStore);
    const _initialConfigState = store.getConfigs(chartType)
    if (_initialConfigState) {
       this.setState(_initialConfigState);
    }
  }
  componentWillUnmount(){
    this.unsubscribe();
  }

  _onStore = (actionType, data) => {
     const { chartType } = this.props;
     if (_isDataForContainer(data, chartType)) {
       if (_isInArray(CHAT_ACTIONS, actionType)) {
         if (actionType !== CHAT_CLOSE) {
           this._refSpComp.current.scrollTop = 0
           //this.spComp.scrollTop()
         }
         this.setState(data);
       } else if (actionType === CAT_CLOSE_CHART_CONTAINER_2){
         this._hHide();
       }
     }
   }

   _toggleChb = (isCheck, checkBox) => {
      const {
        chartType,
        browserType,
        onSetActive
      } = this.props;
      checkBox.chartType = chartType
      checkBox.browserType = browserType
      onSetActive(isCheck, checkBox)
   }

   _hHide = () => {
      this.props.onCloseContainer()
      this.setState({ isShow: false });
   }

   _forEachItem = (onItem) => {
     const max = this.state.configs.length
     let i=0, _refItem;
     for (; i<max; i++) {
        _refItem = this[_crItemRefPropName(i)]
        if (_refItem){
          onItem(_refItem)
        }
     }
     return max;
   }

   _hResizeAfter = (parentWidth) => {
     this._forEachItem(refItem => {
       if (_isFn(refItem.reflowChart)){
         refItem.reflowChart(parentWidth - CHILD_MARGIN)
       }
     })
   }

   _compareTo = (dateTo) => {
     const _arrR = []
     , itemLength = this._forEachItem(refItem => {
       if (_isFn(refItem.compareTo)){
         _arrR.push(refItem.compareTo(dateTo))
       }
     })
     const _r = itemLength - _arrR.filter(Boolean).length;
     if (itemLength > 0 && _r === 0) {
       this.props.updateMovingValues(_arrR)
     }
     return _r;
   }

   _onShowCaptions = () => {
     this._forEachItem(refItem => {
       if (_isFn(refItem.showCaption)){
         refItem.showCaption()
       }
     })
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
     const { width } = getRefElementStyle(this._refRootElement) || {};
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
       theme,
       caption,
       chartType,
       browserType,
       onCloseItem,
       store
     } = this.props
     , TS = theme.getStyle(TH_ID)
     , _isAdminModeFn = _isFn(store.isAdminMode)
          ? store.isAdminMode.bind(store)
          : () => false
     , _isAdminMode = store.isAdminMode?.() || false
     , _modelMore = crModelMore(_isAdminMode, this._HANDLERS)
     , { isShow, isMore, isCompareTo, configs } = this.state
     , _style = isShow ? S_INLINE : S_NONE
     , _className = crCn(CL_ROOT, [isShow, CL_SHOW_CONT]);

     return(
        <div
           ref={this._refRootElement}
           className={_className}
           style={{
             ...this._initialWidthStyle,
             ..._style,
             ...TS.ROOT
           }}
        >
          <A.ModalSlider
            isShow={isMore}
            className={CL_MENU_MORE}
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
             style={S_BR_CAPTION}
             onMore={this._showMore}
             onCheck={this._hSetActive}
             onUnCheck={this._hSetNotActive}
             caption={caption}
             captionStyle={S_CAPTION}
             svgMoreStyle={S_SVG_MORE}
             onClose={this._hHide}
          >
             <A.SvgHrzResize
               ref={this._refResize}
               initWidth={INITIAL_WIDTH}
               minWidth={this._MIN_WIDTH}
               maxWidth={MAX_WIDTH}
               step={STEP}
               elementRef={this._refRootElement}
               onResizeAfter={this._hResizeAfter}
             />
          </A.BrowserCaption>
          <A.ScrollPane
             ref={this._refSpComp}
             className={CL_SCROLL}
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
