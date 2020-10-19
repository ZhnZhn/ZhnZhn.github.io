import { useRef, useCallback } from 'react';
//import PropTypes from "prop-types";

import useToggle from '../hooks/useToggle'

import ButtonTab from '../zhn/ButtonTab'
import ModalMenuIndicator from './ModalMenuIndicator'
import ModalMenuFn from './ModalMenuFn'
import ModalMenuMini from './ModalMenuMini'

const CL = {
  SCROLL: "with-scroll-x",
  BT_R: "with-scroll-x__bt-r"
};

const S = {
  BT_IND: {
    left: 8
  },
  M_IND: {
    top: 60,
    left: 5
  },
  BT_LEGEND: {
    left: 115
  },
  BT_FN: {
    left: 190
  },
  M_FN: {
    top: 60,
    left: 150
  },
  BT_ADD: {
    left: 250
  },
  BT_MINI: {
    left: 350,
    width: 68
  },
  M_MINI: {
    top: 60,
    left: 290
  },
   BT_CONF: {
    left: 430
  },
  BT_R: {
    left: 440,
    width: 36
  }
};

const _isFn = fn => typeof fn === 'function';
const _isNumber = n => typeof n === 'number';
const _isArr = Array.isArray;

const _isHrzScrollable = node  => node
  && node.scrollWidth > node.clientWidth;

const _scrollNodeToLeft = (ref, left) => {
  const node = ref.current;
  if ( _isHrzScrollable(node) ) {
   if (_isFn(node.scroll)) {
     node.scroll({ left, behavior: 'smooth'})
   } else {
     node.scrollLeft = left
   }
  }
};

const LINE_TYPES = [ 'area', 'spline', 'line' ];
const _isColumnCategoryConfig = (
 { type, categories }={}
) => type === 'category' && _isArr(categories);

const _isIndicatorTab = ({ series, xAxis }, isWithoutIndicator) => !isWithoutIndicator
  && _isArr(series) && series[0]
  && ( LINE_TYPES.indexOf(series[0].type) !== -1
       || !_isColumnCategoryConfig(xAxis)
     );

const _crModalMenuStyle = (ref, left) => {
  const node = ref.current
  if (node && _isNumber(node.scrollLeft)) {
    return { left: left - node.scrollLeft };
  }
  return void 0;
};

const ChartToolbar = ({
  hasError,
  style, config={},
  onMiniChart,
  getChart,
  onAddMfi, onRemoveMfi,
  onClickLegend,
  onClick2H,
  onAddToWatch,
  onCopy,
  onPasteTo,
  onMinMax,
  onZoom,
  onClickInfo
}) => {
  const _refToolbar = useRef()
  , [isShowInd, toggleInd] = useToggle(false)
  , [isShowFn, toggleFn] = useToggle(false)
  , [isShowMini, toggleMini] = useToggle(false)
  , _hClickR = useCallback(() => {
      _scrollNodeToLeft(_refToolbar, 0)
    }, []);

  const { zhConfig={}, info, zhMiniConfigs } = config
  , { isWithoutIndicator, itemConf, legend } = zhConfig
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
         className={CL.SCROLL}
         style={style}
      >
        {_btInfo}
      </div>
    );
  }

  let _btTabIndicator = null;
  if (_isIndicatorTab(config, isWithoutIndicator)) {
    _btTabIndicator = (<ButtonTab
       style= {S.BT_IND}
       caption="Indicator"
       isShow={isShowInd}
       isMenu={true}
       onClick={toggleInd}
    />)
    _modalMenuArr.push(<ModalMenuIndicator
       key="menu_ind"
       isShow={isShowInd}
       style={S.M_IND}
       config={config}
       getChart={getChart}
       onAddMfi={onAddMfi}
       onRemoveMfi={onRemoveMfi}
       onClose={toggleInd}
    />)
  }

  const _btLegend = (<ButtonTab
    is={!!legend}
    style={S.BT_LEGEND}
    caption="Legend"
    onClick={onClickLegend}
  />)

  const _btAdd = (<ButtonTab
    is={!!itemConf}
    style={S.BT_ADD}
    caption="Add"
    onClick={onAddToWatch}
  />);

  let _btTabMini = null;
  if (zhMiniConfigs && zhMiniConfigs.length) {
    _btTabMini = (<ButtonTab
       style= {S.BT_MINI}
       caption="Mini"
       isShow={isShowMini}
       isMenu={true}
       onClick={toggleMini}
    />)
    const _miniStyle = isShowMini
      ? _crModalMenuStyle(_refToolbar, S.M_MINI.left)
      : void 0;
   _modalMenuArr.push(<ModalMenuMini
      key="menu_mini"
      isShow={isShowMini}
      style={{...S.M_MINI, ..._miniStyle}}
      configs={zhMiniConfigs}
      onClickItem={onMiniChart}
      onClose={toggleMini}
    />)
  }

  const _fnStyle = isShowFn
    ? _crModalMenuStyle(_refToolbar, S.BT_FN.left)
    : void 0;

  return (
    <>
      <ModalMenuFn
        isShow={isShowFn}
        style={{...S.M_FN, ..._fnStyle}}
        config={config}
        getChart={getChart}
        onX2H={onClick2H}
        onMinMax={onMinMax}
        onZoom={onZoom}
        onCopy={onCopy}
        onPasteTo={onPasteTo}
        onClose={toggleFn}
      />
      {_modalMenuArr}
      <div
         ref={_refToolbar}
         className={CL.SCROLL}
         style={style}
      >
         {_btTabIndicator}
         {_btLegend}
         <ButtonTab
           style={S.BT_FN}
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
            className={CL.BT_R}
            style={S.BT_R}
            caption=">"
            onClick={_hClickR}
          />
      </div>
    </>
  );
}

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
  onClick2H: PropTypes.func,
  onAddToWatch: PropTypes.func,
  onCopy: PropTypes.func,
  onPasteTo: PropTypes.func,
  onMinMax: PropTypes.func,
  onZoom: PropTypes.func,
  onClickInfo: PropTypes.func
}
*/

export default ChartToolbar
