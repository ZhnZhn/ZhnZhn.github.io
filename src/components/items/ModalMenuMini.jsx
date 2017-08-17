import React from 'react'

import ModalPopup from '../zhn-moleculs/ModalPopup'
import SubMenuItem from './SubMenuItem'

import STYLE from './ModalMenu.Style'

const ModalMenuMini = ({
  isShow, onClose,
  onClickVolume, onClickATH, onClickHighLow
}) => (
  <ModalPopup
    isShow={isShow}
    style={STYLE.ROOT}
    onClose={onClose}
  >
    <div style={STYLE.PANE}>
      <SubMenuItem
        caption="Volume"
        onClick={onClickVolume}
      />
      <SubMenuItem
        caption="ATH"
        onClick={onClickATH}
      />
      <SubMenuItem
        caption="Daily HighLow"
        onClick={onClickHighLow}
      />
    </div>
  </ModalPopup>
);

export default ModalMenuMini
