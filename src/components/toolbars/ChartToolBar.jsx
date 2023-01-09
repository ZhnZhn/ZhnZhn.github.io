//import PropTypes from "prop-types";
import {
  useRef,
  useCallback,
  getRefValue
} from '../uiApi';

import useToggle from '../hooks/useToggle';
import useChartMethods from './useChartMethods';

import ButtonTab from '../zhn/ButtonTab'
import ModalMenuIndicator from './ModalMenuIndicator'
import ModalMenuInd2 from './ModalMenuInd2'
import ModalMenuFn from './ModalMenuFn'
import ModalMenuMini from './ModalMenuMini'

const CL_SCROLL_X = "with-scroll-x"
, CL_BT_R = `${CL_SCROLL_X}__bt-r`

, S_BT_IND = { left: 8 }
, S_M_IND = {
  top: 60,
  left: 5
}
, S_BT_LEGEND = { left: 115 }
, S_BT_FN = { left: 190 }
, S_M_FN = {
  top: 60,
  left: 150
}
, S_BT_ADD = { left: 250 }
, S_BT_MINI = {
  left: 350,
  width: 68
}
, S_M_MINI = {
  top: 60,
  left: 290
}
, S_BT_R = {
  left: 440,
  width: 36
};

const _isFn = fn => typeof fn === 'function';
const _isNumber = n => typeof n === 'number';
const _isArr = Array.isArray;

const _isHrzScrollable = node => node
  && node.scrollWidth > node.clientWidth;

const _scrollNodeToLeft = (
  ref,
  left
) => {
  const node = getRefValue(ref);
  if (_isHrzScrollable(node)) {
   if (_isFn(node.scroll)) {
     node.scroll({ left, behavior: 'smooth'})
   } else {
     node.scrollLeft = left
   }
  }
};

const LINE_TYPES = ['area', 'spline', 'line'];
const _isColumnCategoryConfig = (
 { type, categories }={}
) => type === 'category' && _isArr(categories);

const _isIndicatorTab = ({ series, xAxis }, isWithoutIndicator) => !isWithoutIndicator
  && _isArr(series) && series[0]
  && ( LINE_TYPES.indexOf(series[0].type) !== -1
       || _isColumnCategoryConfig(xAxis)
     );

const _crModalMenuStyle = (
  ref,
  left
) => {
  const node = getRefValue(ref);
  return node && _isNumber(node.scrollLeft)
    ? { left: left - node.scrollLeft }
    : void 0;
};

const ChartToolbar = ({
  hasError,
  style,
  config={},
  onMiniChart,
  getChart,
  onAddMfi,
  onRemoveMfi,
  onClickLegend,
  onAddToWatch,
  onCopy,
  onPasteTo,
  onZoom,
  onClickInfo
}) => {
  const _refToolbar = useRef()
  , {
      onClick2H,
      onMinMax,
      onZoomChart,
      onCopyChart,
      onPasteToChart
    } = useChartMethods(
      getChart,
      onZoom,
      onCopy,
      onPasteTo
    )
  , [isShowInd, toggleInd] = useToggle(false)
  , [isShowFn, toggleFn] = useToggle(false)
  , [isShowMini, toggleMini] = useToggle(false)
  , _hClickR = useCallback(() => {
      _scrollNodeToLeft(_refToolbar, 0)
    }, []);

  const {
    zhConfig,
    info,
    zhMiniConfigs
  } = config
  , {
    isWithoutIndicator,
    itemConf,
    legend
  } = zhConfig || {}
  , _modalMenuArr = [];

  const _btInfo = (<ButtonTab
    is={!!info}
    caption="Info"
    onClick={onClickInfo}
  />)

  if (hasError) {
    return (
      <div
         ref={_refToolbar}
         className={CL_SCROLL_X}
         style={style}
      >
        {_btInfo}
      </div>
    );
  }

  let _btTabIndicator = null;
  if (_isIndicatorTab(config, isWithoutIndicator)) {
    let _tabIndCaption = "Indicator";
    if (_isColumnCategoryConfig(config.xAxis)) {
      _tabIndCaption = "Math"
      _modalMenuArr.push(<ModalMenuInd2
        key="menu_ind"
        isShow={isShowInd}
        style={S_M_IND}
        config={config}
        getChart={getChart}
        onClose={toggleInd}
      />)
    } else {
     _modalMenuArr.push(<ModalMenuIndicator
        key="menu_ind"
        isShow={isShowInd}
        style={S_M_IND}
        config={config}
        getChart={getChart}
        onAddMfi={onAddMfi}
        onRemoveMfi={onRemoveMfi}
        onClose={toggleInd}
     />)
    }
    _btTabIndicator = (<ButtonTab
       style= {S_BT_IND}
       caption={_tabIndCaption}
       isShow={isShowInd}
       isMenu={true}
       onClick={toggleInd}
    />)
  }

  const _btLegend = (<ButtonTab
    is={!!legend}
    style={S_BT_LEGEND}
    caption="Legend"
    onClick={onClickLegend}
  />)

  const _btAdd = (<ButtonTab
    is={!!itemConf}
    style={S_BT_ADD}
    caption="Add"
    onClick={onAddToWatch}
  />);

  let _btTabMini = null;
  if (zhMiniConfigs && zhMiniConfigs.length) {
    _btTabMini = (<ButtonTab
       style= {S_BT_MINI}
       caption="Mini"
       isShow={isShowMini}
       isMenu={true}
       onClick={toggleMini}
    />)
    const _miniStyle = isShowMini
      ? _crModalMenuStyle(_refToolbar, S_M_MINI.left)
      : void 0;
   _modalMenuArr.push(<ModalMenuMini
      key="menu_mini"
      isShow={isShowMini}
      style={{...S_M_MINI, ..._miniStyle}}
      configs={zhMiniConfigs}
      onClickItem={onMiniChart}
      onClose={toggleMini}
    />)
  }

  const _fnStyle = isShowFn
    ? _crModalMenuStyle(_refToolbar, S_BT_FN.left)
    : void 0;

  return (
    <>
      <ModalMenuFn
        isShow={isShowFn}
        style={{...S_M_FN, ..._fnStyle}}
        config={config}
        getChart={getChart}
        onX2H={onClick2H}
        onMinMax={onMinMax}
        onZoom={onZoomChart}
        onCopy={onCopyChart}
        onPasteTo={onPasteToChart}
        onClose={toggleFn}
      />
      {_modalMenuArr}
      <div
         ref={_refToolbar}
         className={CL_SCROLL_X}
         style={style}
      >
         {_btTabIndicator}
         {_btLegend}
         <ButtonTab
           style={S_BT_FN}
           caption="Fn"
           isShow={isShowFn}
           isMenu={true}
           onClick={toggleFn}
         />
         {_btAdd}
         {_btInfo}
         {_btTabMini}
         <ButtonTab
            is={!!_btTabMini}
            className={CL_BT_R}
            style={S_BT_R}
            caption=">"
            onClick={_hClickR}
          />
      </div>
    </>
  );
};

/*
ChartToolbar.propTypes = {
  hasError: PropTypes.bool,

  style: PropTypes.object,
  config: PropTypes.object,

  getChart: PropTypes.func,

  onMiniChart: PropTypes.func,
  onAddMfi: PropTypes.func,
  onRemoveMfi: PropTypes.func,
  onClickLegend: PropTypes.func,
  onAddToWatch: PropTypes.func,
  onCopy: PropTypes.func,
  onPasteTo: PropTypes.func,
  onZoom: PropTypes.func,
  onClickInfo: PropTypes.func
}
*/

export default ChartToolbar
