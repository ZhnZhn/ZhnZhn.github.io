import React from 'react'

import ModalPopup from '../zhn-moleculs/ModalPopup'
import SubMenuItem from './SubMenuItem'

import STYLE from './ModalMenu.Style'

const ModalMenuFn = ({
  isShow, onClose,
  onX2H,
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
      <SubMenuItem
        caption="Copy"
        isNotActive={true}
        onClick={onCopy}
      />
      <SubMenuItem
        caption="PasteTo"
        isNotActive={true}
        onClick={onPasteTo}
      />
    </div>
  </ModalPopup>
);

export default ModalMenuFn
