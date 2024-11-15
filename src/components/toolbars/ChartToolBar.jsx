import {
  useRef,
  useMemo,
  getRefValue,
  isFn,
  isNumber
} from '../uiApi';

import { crWithScrollCn } from '../styleFn';

import useChartMethods from './useChartMethods';
import useChartToolBar from './useChartToolBar';

import ButtonTab from '../zhn/ButtonTab';

const CL_WITH_SCROLL_X = "with-scroll-x"
, CL_SCROLL_X = crWithScrollCn(CL_WITH_SCROLL_X)
, CL_BT_R = `${CL_WITH_SCROLL_X}__bt-r`
, S_BT_R = {
  left: 440,
  width: 36
};

const _isHrzScrollable = (
  nodeEl
) => nodeEl && nodeEl.scrollWidth > nodeEl.clientWidth;

const _scrollNodeToLeft = (
  ref,
  left
) => {
  const nodeEl = getRefValue(ref);
  if (_isHrzScrollable(nodeEl)) {
    if (isFn(nodeEl.scroll)) {
      nodeEl.scroll({ left, behavior: "smooth"})
    } else {
      nodeEl.scrollLeft = left
    }
  }
};

const ChartToolbar = ({
  hasError,
  config,
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
  , chartHandlers = useChartMethods(
     getChart,
     onZoom,
     onCopy,
     onPasteTo
  )
  , [
    _crModalMenuLeftStyle,
    _hClickR
  ] = useMemo(() => [
    (isShow, style) => {
      if (!isShow) { return; }
      const nodeEl = getRefValue(_refToolbar)
      , { scrollLeft } = nodeEl || {};
      return isNumber(scrollLeft)
        ? {left: style.left - scrollLeft}
        : void 0;
    },
    () => {
      _scrollNodeToLeft(_refToolbar, 0)
    }
  ], []);

  const  [
    _btInfo,
    _btTabIndicator,
    _btAppearance,
    _btLegend,
    _btFn,
    _btTabMini,
    _modalMenuArr
  ] = useChartToolBar(
    hasError,
    _crModalMenuLeftStyle,
    config,
    getChart,
    onClickInfo,
    onClickLegend,
    onAddToWatch,
    onAddMfi,
    onRemoveMfi,
    onMiniChart,
    chartHandlers
  );

  if (hasError) {
    return (
      <div
         ref={_refToolbar}
         className={CL_SCROLL_X}
      >
        {_btInfo}
      </div>
    );
  }

  return (
    <>
      {_modalMenuArr}
      <div
         ref={_refToolbar}
         className={CL_SCROLL_X}
      >
         {_btTabIndicator}
         {_btAppearance}
         {_btLegend}
         {_btFn}
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
