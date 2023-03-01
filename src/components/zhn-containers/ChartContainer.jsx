import {
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
  getRefElementStyle
} from '../uiApi';

import useBool from '../hooks/useBool';
import useToggle from '../hooks/useToggle';
import useListen from '../hooks/useListen';

import useHmInstance from './useHmInstance';
import useInitialWidth from './useInitialWidth';
import useSetActiveCheckBox from './useSetActiveCheckBox';
import useChartContainerStyle from './useChartContainerStyle';

import {
  CHAT_SHOW,
  CHAT_LOAD_COMPLETED,
  CHAT_CLOSE
} from '../../flux/actions/ChartActions';
import {
  CAT_CLOSE_CHART_CONTAINER_2
} from '../../flux/actions/ComponentActions';

import crModelMore from './crModelMore';
import A from '../Comp';
import ModalCompareTo from './ModalCompareTo';
import ChartList from './ChartList';

const CL_SCROLL = 'scroll-container-y scroll-items'
, CL_MENU_MORE = "popup-menu charts__menu-more"

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
  top: 2
}
, S_CAPTION = {
  position: 'relative',
  top: -1
};

const CHAT_ACTIONS = [
  CHAT_SHOW,
  CHAT_LOAD_COMPLETED,
  CHAT_CLOSE
];

const _getObjectKeys = Object.keys;
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

const _forEachItem = (refHm, onItem) => {
  const _hmInstances = refHm.current
  , _propNames = _getObjectKeys(_hmInstances);
  let _refInstance
  , _numberOfInstance = 0;
  _propNames.forEach(propName => {
    _refInstance = _hmInstances[propName]
    if (_refInstance) {
      _numberOfInstance += 1
      onItem(_refInstance)
    }
  })
  return _numberOfInstance;
}

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
   /*eslint-disable react-hooks/exhaustive-deps */
  , [
    isMore,
    _hToggleMore
  ] = useToggle()
  , _showMore = useCallback(() => {
    _hToggleMore(true)
  }, [])
  // _hToggleMore
  /*eslint-enable react-hooks/exhaustive-deps */

   /*eslint-disable react-hooks/exhaustive-deps */
  , _hHide = useCallback(() => {
      onCloseContainer()
      setState(prevState => ({
        ...prevState,
        isShow: false
      }))
  }, [])
  // onCloseContainer
  /*eslint-enable react-hooks/exhaustive-deps */
  
  , [
    _initialWidthStyle,
    _INITIAL_WIDTH,
    _MIN_WIDTH
  ] = useInitialWidth(contWidth)
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hResizeAfter = useCallback(parentWidth => {
     _forEachItem(_refHm, _fReflowChartByRef(parentWidth))
  }, [])
  // _refHm
  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */
  , _fitToWidth = useCallback(() => {
    const { width } = getRefElementStyle(_refRootElement) || {};
    if (width) {
      _hResizeAfter(parseInt(width, 10))
    }
  }, [])
  //_hResizeAfter
  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */
  , _onShowCaptions = useCallback(() => {
    _forEachItem(_refHm, _showCaptionByRef)
  }, [])
  // refHm
  /*eslint-enable react-hooks/exhaustive-deps */

  , _isAdminModeFn = _isFn(store.isAdminMode)
       ? store.isAdminMode.bind(store)
       : () => false
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

  /*eslint-disable react-hooks/exhaustive-deps */
  , _compareTo = useCallback(dateTo => {
    const _arrR = []
    , itemLength = _forEachItem(_refHm, refItem => {
      if (_isFn(refItem.compareTo)){
        _arrR.push(refItem.compareTo(dateTo))
      }
    })
    const _r = itemLength - _arrR.filter(Boolean).length;
    if (itemLength > 0 && _r === 0) {
      updateMovingValues(_arrR)
    }
    return _r;
  }, [])
  // updateMovingValues
  /*eslint-enable react-hooks/exhaustive-deps */
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
    TS,
    _style,
    _className
  ] = useChartContainerStyle(isShow);

  return (
    <div
       ref={_refRootElement}
       className={_className}
       style={{
         ..._initialWidthStyle,
         ..._style,
         ...TS.ROOT
       }}
    >
      <A.ModalSlider
        isShow={isMore}
        className={CL_MENU_MORE}
        style={TS.EL_BORDER}
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
         className={CL_SCROLL}
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
