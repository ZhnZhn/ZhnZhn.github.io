import {
  useRef,
  useState,
  useCallback,
  getRefValue,
  getRefElementStyle
} from '../uiApi';

import {
  crPresentationRole
} from '../a11yFn';

import {
  crScrollYCn
} from '../styleFn';

import { useBool } from '../hooks/useBool';
import { useKeyEscape } from '../hooks/fUseKey';

import useHmInstance from './useHmInstance';
import useInitialWidth from './useInitialWidth';
import useChartContainerMenuMore from './useChartContainerMenuMore';
import useSetActiveCheckBox from './useSetActiveCheckBox';
import useCompareTo from './useCompareTo';

import crChartContainerStyle from './crChartContainerStyle';

import {
  getConfigs,
  useMsItemLoaded
} from '../../flux/stores/itemStore';

import A from '../Comp';
import SvgHrzResize from '../zhn-resize/SvgHrzResize';
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
  , [
    state,
    setState
  ] = useState(() => ({
    configs: getConfigs(chartType)
  }))
  , {
    configs
  } = state
  , [
    isShow,
    showChartContainer,
    hideChartContainer
  ] = useBool(true)

  /*eslint-disable react-hooks/exhaustive-deps */
  , _hHideChartContainer = useCallback(() => {
      onCloseContainer()
      hideChartContainer()
    }
  , [])
  // onCloseContainer, hideChartContainer
  /*eslint-enable react-hooks/exhaustive-deps */
  , _hKeyDown = useKeyEscape(_hHideChartContainer)
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

  useMsItemLoaded(msItemLoaded => {
    if (msItemLoaded && _isDataForContainer(msItemLoaded, chartType)) {
      if (msItemLoaded.isShow) {
        (getRefValue(_refSpComp) || {}).scrollTop = 0
        setState({
          configs: msItemLoaded.configs
        })
        showChartContainer()
      } else {
        _hHideChartContainer()
      }
    }
  })

  const [
    _style,
    _className
  ] = crChartContainerStyle(isShow);

  /*eslint-disable jsx-a11y/no-static-element-interactions*/
  return (
    <div
       {...crPresentationRole(isShow)}
       ref={_refRootElement}
       className={_className}
       style={{
         ..._initialWidthStyle,
         ..._style
       }}
       onKeyDown={_hKeyDown}
    >
  {/*eslint-enable jsx-a11y/no-static-element-interactions*/}
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
         <SvgHrzResize
           refEl={_refResize}
           elementRef={_refRootElement}
           isBts={_hasBtsResize(_refRootElement, _INITIAL_WIDTH, caption)}
           style={S_SVG_RESIZE}
           initWidth={_INITIAL_WIDTH}
           minWidth={_MIN_WIDTH}
           maxWidth={MAX_WIDTH}
           step={STEP}
           onResizeAfter={_hResizeAfter}
         />
      </A.BrowserCaption>
      <A.ScrollPane
         refEl={_refSpComp}
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
