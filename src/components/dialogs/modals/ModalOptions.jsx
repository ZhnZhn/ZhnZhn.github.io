import React from 'react'

import ModalPopup from '../../zhn-moleculs/ModalPopup'
import RowCheckBox from '../rows/RowCheckBox'
import STYLE from './Style'

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
    <RowCheckBox
      initValue={false}
      rootStyle={STYLE.ROW_CHB}
      caption="Not Zoom to Min-Max"
      onToggle={_toggleZoomMinMax}
    />
    <RowCheckBox
      initValue={false}
      rootStyle={STYLE.ROW_CHB}
      caption="Filter Trim Zero Values"
      onToggle={_toggleFilterZero}
    />
  </ModalPopup>
 );
}

export default ModalOptions
