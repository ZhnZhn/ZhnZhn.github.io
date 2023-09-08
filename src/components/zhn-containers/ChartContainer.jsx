import {
  useRef,
  useState,
  useMemo,
  useEffect,
  getRefElementStyle
} from '../uiApi';

import {
  crScrollYCn
} from '../styleFn';

import useBool from '../hooks/useBool';
import useToggle from '../hooks/useToggle';
import useListen from '../hooks/useListen';

import useHmInstance from './useHmInstance';
import useInitialWidth from './useInitialWidth';
import useSetActiveCheckBox from './useSetActiveCheckBox';
import useCompareTo from './useCompareTo';

import crChartContainerStyle from './crChartContainerStyle';

import {
  CHAT_SHOW,
  CHAT_LOAD_COMPLETED,
  CHAT_CLOSE
} from '../../flux/actions/ChartActions';
import {
  CAT_CLOSE_CHART_CONTAINER_2
} from '../../flux/actions/ComponentActions';

import crModelMore from './crModelMore';
import forEachInstance from './forEachInstance';
import A from '../Comp';
import ModalCompareTo from './ModalCompareTo';
import ChartList from './ChartList';


const CL_SCROLL_ITEMS = crScrollYCn('scroll-items')
, CL_MENU_MORE = "popup-menu charts__menu-more el-b"

, CHILD_MARGIN = 36
//, INITIAL_WIDTH = 635
, MAX_WIDTH = 1200
, STEP = 10

, S_BR_CAPTION = {
  paddingTop: 2,
  paddingLeft: 2
}
, S_SVG_MORE = {
  position: 'relative',
  top: -1
}
, S_CAPTION = {
  paddingTop: 7
}
, S_SVG_RESIZE = {
  position: 'relative',
  top: -3
};


const CHAT_ACTIONS = [
  CHAT_SHOW,
  CHAT_LOAD_COMPLETED,
  CHAT_CLOSE
];

const _isFn = fn => typeof fn === "function";
const _isInArray = (
  arr=[],
  value
) => Boolean(~arr.indexOf(value))

const _crFnByNameArgs = (
  ref,
  methodName,
  ...args
) => () => {
  const _compInstance = ref.current;
  if (_compInstance) {
    _compInstance[methodName](...args)
  }
};

const _isDataForContainer = (
  data,
  chartType
) => data === chartType ||
  (data && data.chartType === chartType);


const _fReflowChartByRef = parentWidth => refItem => {
  if (_isFn(refItem.reflowChart)){
    refItem.reflowChart(parentWidth - CHILD_MARGIN)
  }
};

const _showCaptionByRef = refItem => {
  if (_isFn(refItem.showCaption)){
    refItem.showCaption()
  }
};

const _crIsAdminModeFn = (
  store
) => _isFn(store.isAdminMode)
  ? store.isAdminMode.bind(store)
  : () => false;

const _hasBtsResize = (
  refEl,
  initialWidth,
  caption
) => {
  const _style = getRefElementStyle(refEl)
  , _widthEl = _style
     ? parseInt(_style.width, 10) || initialWidth
     : initialWidth;
  return _widthEl > caption.length * 10 + 155;
};

const DF_ONS_SET_ACTIVE = () => {};

const ChartContainer = ({
  store,
  chartType,
  browserType,
  contWidth,
  caption,
  onSortBy,
  onRemoveAll,
  onCloseContainer,
  onCloseItem,
  onSetActive=DF_ONS_SET_ACTIVE,
  updateMovingValues
}) => {
  const _refRootElement = useRef()
  , _refSpComp = useRef()
  , _refResize = useRef()
  , [
    _refHm,
    _refChartFn
  ] = useHmInstance()
  , [
    state,
    setState
  ] = useState(() => ({
    isShow: false,
    configs: [],
    chartType
  }))
  , {
    isShow,
    configs
  } = state
  , [
    isCompareTo,
    _onCompareTo,
    _closeCompareTo
  ] = useBool()
  , [
    isMore,
    _hToggleMore
  ] = useToggle()
  , [
    _initialWidthStyle,
    _INITIAL_WIDTH,
    _MIN_WIDTH
  ] = useInitialWidth(contWidth)
  /*eslint-disable react-hooks/exhaustive-deps */
  , [
    _showMore,
    _hHide,
    _hResizeAfter,
    _onShowCaptions
  ] = useMemo(() => [
    () => {
      _hToggleMore(true)
    },
    () => {
      onCloseContainer()
      setState(prevState => ({
        ...prevState,
        isShow: false
      }))
    },
    (parentWidth) => {
      forEachInstance(_refHm, _fReflowChartByRef(parentWidth))
    },
    () => {
      forEachInstance(_refHm, _showCaptionByRef)
    }
  ], [])
  // _hToggleMore, onCloseContainer
  // _refHm
  /*eslint-enable react-hooks/exhaustive-deps */

  , _fitToWidth = useMemo(() => () => {
    const { width } = getRefElementStyle(_refRootElement) || {};
    if (width) {
      _hResizeAfter(parseInt(width, 10))
    }
  }, [_hResizeAfter])
  , _isAdminModeFn = _crIsAdminModeFn(store)
  , _isAdminMode = _isAdminModeFn()
  /*eslint-disable react-hooks/exhaustive-deps */
  , _modelMore = useMemo(() => crModelMore(_isAdminMode, {
      onMinWidth: _crFnByNameArgs(_refResize, 'toWidth', _MIN_WIDTH, true),
      onInitWidth: _crFnByNameArgs(_refResize, 'toWidth', _INITIAL_WIDTH, true),
      onPlusWidth: _crFnByNameArgs(_refResize, 'resizeBy', STEP),
      onMinusWidth: _crFnByNameArgs(_refResize, 'resizeBy', -STEP),
      onFit: _fitToWidth,
      onShowCaptions: _onShowCaptions,
      onSortBy,
      onRemoveAll,
      onCompareTo: _onCompareTo
  }), [_isAdminMode])
  // _INITIAL_WIDTH, _MIN_WIDTH
  // _fitToWidth, _onCompareTo, _onShowCaptions
  // onRemoveAll, onSortBy
  /*eslint-enable react-hooks/exhaustive-deps */

  , _compareTo = useCompareTo(
     _refHm,
     updateMovingValues
  )
  , [
     _hSetActive,
     _hSetNotActive
  ] = useSetActiveCheckBox(
     chartType,
     browserType,
     onSetActive
  );

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      ...store.getConfigs(chartType)
    }))
  }, [])
  // store, chartType
  /*eslint-enable react-hooks/exhaustive-deps */

  useListen((actionType, data) => {
     if (_isDataForContainer(data, chartType)) {
       if (_isInArray(CHAT_ACTIONS, actionType)) {
         if (actionType !== CHAT_CLOSE) {
           _refSpComp.current.scrollTop = 0
         }
         setState(prevState => ({
           ...prevState,
           ...data
         }));
       } else if (actionType === CAT_CLOSE_CHART_CONTAINER_2){
         _hHide();
       }
     }
  })

  const [
    _style,
    _className
  ] = crChartContainerStyle(isShow);

  return (
    <div
       ref={_refRootElement}
       className={_className}
       style={{
         ..._initialWidthStyle,
         ..._style
       }}
    >
      <A.ModalSlider
        isShow={isMore}
        className={CL_MENU_MORE}
        //style={TS.EL_BORDER}
        model={_modelMore}
        onClose={_hToggleMore}
      />
      { _isAdminMode && <ModalCompareTo
          isShow={isCompareTo}
          onClose={_closeCompareTo}
          onCompareTo={_compareTo}
        />
      }
      <A.BrowserCaption
         style={S_BR_CAPTION}
         onMore={_showMore}
         onCheck={_hSetActive}
         onUnCheck={_hSetNotActive}
         caption={caption}
         captionStyle={S_CAPTION}
         svgMoreStyle={S_SVG_MORE}
         onClose={_hHide}
      >
         <A.SvgHrzResize
           ref={_refResize}
           isBts={_hasBtsResize(_refRootElement, _INITIAL_WIDTH, caption)}
           style={S_SVG_RESIZE}
           initWidth={_INITIAL_WIDTH}
           minWidth={_MIN_WIDTH}
           maxWidth={MAX_WIDTH}
           step={STEP}
           elementRef={_refRootElement}
           onResizeAfter={_hResizeAfter}
         />
      </A.BrowserCaption>
      <A.ScrollPane
         ref={_refSpComp}
         className={CL_SCROLL_ITEMS}
      >
        <ChartList
           refChartFn={_refChartFn}
           isAdminMode={_isAdminModeFn}
           configs={configs}
           store={store}
           chartType={chartType}
           browserType={browserType}
           onCloseItem={onCloseItem}
        />
      </A.ScrollPane>
    </div>
  );
};

export default ChartContainer
