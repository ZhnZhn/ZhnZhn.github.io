import React from 'react'

import ShowHide from '../zhn/ShowHide'
import ModalPane from './ModalPane'

const ModalPopup = ({
  isShow, style, children, onClose
}) => (
  <ModalPane
    isShow={isShow}
    onClose={onClose}
  >
    <ShowHide
      style={style}
      isShow={isShow}
    >
      {children}
    </ShowHide>
  </ModalPane>
);

export default ModalPopup
