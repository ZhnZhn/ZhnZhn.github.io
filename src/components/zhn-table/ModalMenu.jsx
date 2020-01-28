import React from 'react'

import ModalPopup from '../zhn-moleculs/ModalPopup'
import D from '../dialogs/DialogCell'

const S = {
  ROW: {
    paddingLeft: 0,
    paddingBottom: 4
  }
};

const ModalMenu = ({
  isShow, style,
  onClose,
  isGridLine,
  onCheck, onUnCheck
}) => (
  <ModalPopup
     style={style}
     isShow={isShow}
     onClose={onClose}
   >
     <D.RowCheckBox
       rootStyle={S.ROW}
       checkedColor="black"
       caption="withStripLines"
       value={isGridLine}
       onCheck={onCheck}
       onUnCheck={onUnCheck}
     />
  </ModalPopup>
);


export default ModalMenu
