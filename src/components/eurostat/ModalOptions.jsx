import React from 'react'

import ModalPopup from '../zhn-moleculs/ModalPopup'
import D from '../dialogs/DialogCell'
import STYLE from './Modal.Style'

const ModalOptions = ({
  isShow,
  style,
  className=STYLE.CL,
  toggleOption,
  onClose
}) => {
  const _toggleZoomMinMax = toggleOption
    .bind(null, 'isNotZoomToMinMax')
  , _toggleFilterZero = toggleOption
      .bind(null, 'isFilterZero');
  return (
  <ModalPopup
    isShow={isShow}
    style={{...STYLE.ROOT, ...style}}
    className={className}
    onClose={onClose}
  >
    <D.RowCheckBox
      initValue={false}
      rootStyle={STYLE.ROW_CB}
      caption="Not Zoom to Min-Max"
      onToggle={_toggleZoomMinMax}
    />
    <D.RowCheckBox
      initValue={false}
      rootStyle={STYLE.ROW_CB}
      caption="Filter Trim Zero Values"
      onToggle={_toggleFilterZero}
    />
  </ModalPopup>
 );
}

export default ModalOptions
