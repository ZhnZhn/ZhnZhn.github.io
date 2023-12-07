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
import useChartContainerMenuMore from './useChartContainerMenuMore';
import useSetActiveCheckBox from './useSetActiveCheckBox';
import useCompareTo from './useCompareTo';

import crChartContainerStyle from './crChartContainerStyle';

import { useMsChartCont } from '../../flux/stores/compStore';
import {
  getConfigs,
  useMsItemLoaded
} from '../../flux/stores/itemStore';

import A from '../Comp';
import ModalCompareTo from './ModalCompareTo';
import ChartList from './ChartList';

const CL_SCROLL_ITEMS = crScrollYCn('scroll-items')
, CL_MENU_MORE = "popup-menu charts__menu-more el-b"

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

const _isDataForContainer = (
  data,
  chartType
) => data === chartType ||
  (data && data.chartType === chartType);

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

const ChartContainer = (props) => {
  const {
    chartType,
    browserType,
    contWidth,
    caption,
    isAdminMode,
    onCloseContainer,
    onCloseItem,
    onSetActive=DF_ONS_SET_ACTIVE,
    updateMovingValues
  } = props
  , _isAdminMode = isAdminMode()
  , _refSpComp = useRef()
  //{ isShow: false, configs: [], chartType }
  , [
    state,
    setState
  ] = useState(() => getConfigs(chartType))
  , {
    isShow,
    configs
  } = state

  /*eslint-disable react-hooks/exhaustive-deps */
  , _hHideChartContainer = useMemo(() => () => {
      onCloseContainer()
      setState(prevState => ({
        ...prevState,
        isShow: false
      }))
    }
  , [])
  // onCloseContainer
  /*eslint-enable react-hooks/exhaustive-deps */

  , [
    isCompareTo,
    _showCompareTo,
    _hideCompareTo
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
  , [
    _hmCharts,
    _refChartFn
  ] = useHmInstance()
  , [
    _refRootElement,
    _refResize,
    _modelMore,
    _hResizeAfter
  ] = useChartContainerMenuMore(
    _isAdminMode,
    props,
    _INITIAL_WIDTH,
    _MIN_WIDTH,
    STEP,
    _hmCharts,
    _showCompareTo
  )      
  , _compareTo = useCompareTo(
     _hmCharts,
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
      _hHideChartContainer()
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
          onClose={_hideCompareTo}
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
         onClose={_hHideChartContainer}
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
