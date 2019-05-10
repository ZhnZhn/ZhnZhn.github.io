import React from 'react'

import ModalPopup from '../zhn-moleculs/ModalPopup'
import SubMenuItem from './SubMenuItem'

import STYLE from './ModalMenu.Style'

const _isMinMax = config => config.yAxis
 && config.yAxis.plotLines
 && config.yAxis.plotLines.length > 0
   ? true
   : false;

const ModalMenuFn = ({
  isShow, onClose,
  config,
  onX2H, onMinMax, onZoom,
  onCopy, onPasteTo
}) => (
  <ModalPopup
    isShow={isShow}
    style={STYLE.ROOT}
    onClose={onClose}
  >
    <div style={STYLE.PANE}>
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
      <SubMenuItem
        caption="Zoom"
        isNotActive={true}
        onClick={onZoom}
        onClose={onClose}
      />
      <SubMenuItem
        caption="Copy"
        isNotActive={true}
        onClick={onCopy}
      />
      <SubMenuItem
        caption="PasteTo"
        isNotActive={true}
        onClick={onPasteTo}
        onClose={onClose}
      />
    </div>
  </ModalPopup>
);

export default ModalMenuFn
