import {
  useRef,
  useState,
  useMemo,
  getRefValue,
  getRefElementStyle
} from '../uiApi';

import {
  crScrollYCn
} from '../styleFn';

import useBool from '../hooks/useBool';

import useHmInstance from './useHmInstance';
import useInitialWidth from './useInitialWidth';
import useSetActiveCheckBox from './useSetActiveCheckBox';
import useCompareTo from './useCompareTo';

import crChartContainerStyle from './crChartContainerStyle';

import { useMsChartCont } from '../../flux/stores/compStore';
import {
  getConfigs,
  useMsItemLoaded
} from '../../flux/stores/itemStore';

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

const _isFn = fn => typeof fn === "function";

const _crFnByNameArgs = (
  ref,
  methodName,
  ...args
) => () => {
  const _compInstance = getRefValue(ref);
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
  chartType,
  browserType,
  contWidth,
  caption,
  isAdminMode,
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
  //{ isShow: false, configs: [], chartType }
  , [
    state,
    setState
  ] = useState(() => getConfigs(chartType))  
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
    isMenuMore,
    _showMenuMore,
    _hideMenuMore
  ] = useBool()
  , [
    _initialWidthStyle,
    _INITIAL_WIDTH,
    _MIN_WIDTH
  ] = useInitialWidth(contWidth)
  /*eslint-disable react-hooks/exhaustive-deps */
  , [
    _hHide,
    _hResizeAfter,
    _onShowCaptions
  ] = useMemo(() => [
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
  , _isAdminMode = isAdminMode()
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

  useMsChartCont(msChartCont => {
    if (msChartCont && msChartCont.id === chartType) {
      _hHide()
    }
  })

  useMsItemLoaded(msItemLoaded => {
    if (msItemLoaded && _isDataForContainer(msItemLoaded, chartType)) {
      if (msItemLoaded.isShow) {
        (getRefValue(_refSpComp) || {}).scrollTop = 0
      }
      setState(prevState => ({
        ...prevState,
        ...msItemLoaded
      }));
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
        isShow={isMenuMore}
        className={CL_MENU_MORE}
        model={_modelMore}
        onClose={_hideMenuMore}
      />
      { _isAdminMode && <ModalCompareTo
          isShow={isCompareTo}
          onClose={_closeCompareTo}
          onCompareTo={_compareTo}
        />
      }
      <A.BrowserCaption
         style={S_BR_CAPTION}
         onMore={_showMenuMore}
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
           isAdminMode={isAdminMode}
           configs={configs}
           chartType={chartType}
           browserType={browserType}
           onCloseItem={onCloseItem}
        />
      </A.ScrollPane>
    </div>
  );
};

export default ChartContainer
