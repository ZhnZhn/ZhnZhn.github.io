import React from 'react'

import SvgCheckBox from '../zhn/SvgCheckBox'
import ModalPopup from '../zhn-moleculs/ModalPopup'

const S = {
  STRIP: {
    paddingLeft: '8px',
    fontWeight: 'bold'
  }
};

const StylePopup = ({
  isShow, style,
  onClose,
  isGridLine,
  onCheck, onUnCheck
}) => {
  return (
    <ModalPopup
       style={style}
       isShow={isShow}
       onClose={onClose}
     >
      <SvgCheckBox
        value={isGridLine}
        onCheck={onCheck}
        onUnCheck={onUnCheck}
      />
      <span style={S.STRIP}>withStripLines</span>
    </ModalPopup>
  );
}

export default StylePopup
