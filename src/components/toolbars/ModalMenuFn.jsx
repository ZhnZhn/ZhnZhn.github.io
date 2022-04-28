import { mlsToDmy } from '../../utils/DateUtils';

import ModalPopup from '../zhn-moleculs/ModalPopup'
import SubMenuItem from './SubMenuItem'

import {
  S_MODAL_MENU,
  S_MODAL_MENU_PANE
} from './ModalMenu.Style'

const _isFn = fn => typeof fn === 'function';

const _isMinMax = config => {
  const { yAxis } = config
  , { plotLines } = yAxis || {}
  return (plotLines || {}).length > 0;
};

const EPOCH_DMY = '01-01-1970';
const _isZoom = (getChart) => {
  if (!_isFn(getChart)) {
    return false;
  }
  const chart = getChart();
  if (!chart || !_isFn(chart.zhGetFromToDates)) {
    return false;
  }
  const { from, to } = chart.zhGetFromToDates({
    format: mlsToDmy
  });
  return (from === to) && to === EPOCH_DMY
    ? false
    : true;
};

const ModalMenuFn = ({
  style,
  isShow,
  onClose,
  config,
  getChart,
  onX2H,
  onMinMax,
  onZoom,
  onCopy,
  onPasteTo
}) => (
  <ModalPopup
    isShow={isShow}
    style={{...S_MODAL_MENU, ...style}}
    onClose={onClose}
  >
    <div style={S_MODAL_MENU_PANE}>
      <SubMenuItem
        caption="x2H"
        onClick={onX2H}
      />
      { _isMinMax(config) && <SubMenuItem
           caption="MinMax"
           initialIsActive={true}
           onClick={onMinMax}
         />
      }
      { _isZoom(getChart) && <SubMenuItem
          caption="Zoom"
          onClick={onZoom}
          onClose={onClose}
        />
      }
      <SubMenuItem
        caption="Copy"
        onClick={onCopy}
        onClose={onClose}
      />
      <SubMenuItem
        caption="PasteTo"
        onClick={onPasteTo}
        onClose={onClose}
      />
    </div>
  </ModalPopup>
);

export default ModalMenuFn
