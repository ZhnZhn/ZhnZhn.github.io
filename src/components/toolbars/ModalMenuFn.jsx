import { filterBoolean } from '../../utils/arrFn';
import { mlsToDmy } from '../../utils/dateFn';

import {
  isFn,
  useMemo
} from '../uiApi';
import {
  CL_ROW_PANE_TOPIC
} from '../styleFn';

import {
  crSubItem,
  crItem,
  addToggleTo,
  crSliderMenu
} from '../menuModelFn';
import {
  ModalSliderMemoIsShow
} from '../zhn-modal-slider/ModalSlider';
import {
  S_MODAL_MENU
} from './ModalMenu.Style';

const _isMinMax = (
  config
) => ((config.yAxis || {}).plotLines || []).length > 0;

const EPOCH_DMY = '01-01-1970';
const _isZoom = (getChart) => {
  if (!isFn(getChart)) {
    return !1;
  }
  const chart = getChart();
  if (!chart || !isFn(chart.zhGetFromToDates)) {
    return !1;
  }
  const { from, to } = chart.zhGetFromToDates({
    format: mlsToDmy
  });

  return !(from === to && to === EPOCH_DMY);
};

const _crModelMore = (
  props,
  isItemZoom
) => crSliderMenu(
  CL_ROW_PANE_TOPIC,
  125,
  2, {
  p0: filterBoolean([
    crSubItem("p1", "Chart"),
    isFn(props.onAddToWatch)
      ? crItem("Add To", props.onAddToWatch)
      : void 0,
    _isMinMax(props.config)
      ? addToggleTo(crItem("MinMax", props.onMinMax, !1), !0)
      : void 0,
    isItemZoom
      ? crItem("Zoom", props.onZoom)
      : void 0,
    crItem("Copy", props.onCopy),
    crItem("PasteTo", props.onPasteTo)
  ]),
  p1: [
    addToggleTo(crItem("x2 Height", props.onX2H, !1)),
    crItem("Full Screen", props.onFullScreen),
    crItem("Export As", props.onExport),
    crItem("Print", props.onPrint)
  ]}
);

const ModalMenuFn = (props) => {
  const {
    getChart,
    style,
    isShow,
    onClose,
  } = props
  , _isItemZoom = _isZoom(getChart)
  /*eslint-disable react-hooks/exhaustive-deps*/
  , _model = useMemo(
     () => _crModelMore(props, _isItemZoom),
     [_isItemZoom]
  );
  /*eslint-enable react-hooks/exhaustive-deps*/
 return (
   <ModalSliderMemoIsShow
     isShow={isShow}
     style={{...S_MODAL_MENU, ...style}}
     model={_model}
     onClose={onClose}
   />
 );
};

export default ModalMenuFn
