import React from 'react'

import ShowHide from '../zhn/ShowHide'
import ModalPane from './ModalPane'

const ModalPopup = ({
  isShow, className, style, children, onClose
}) => (
  <ModalPane
    isShow={isShow}
    onClose={onClose}
  >
    <ShowHide
      className={className}
      style={style}
      isShow={isShow}
    >
      {children}
    </ShowHide>
  </ModalPane>
);

export default ModalPopup
