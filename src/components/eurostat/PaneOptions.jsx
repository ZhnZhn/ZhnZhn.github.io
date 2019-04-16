import React from 'react'

import ModalPopup from '../zhn-moleculs/ModalPopup'
import D from '../dialogs/DialogCell'

const CL = 'popup-menu';

const S = {
  ROOT: {
    left: 8,
    zIndex: 100,
    padding: 12
  },
  ROW_CB: {
    paddingLeft: 0
  }
};

const PaneOptions = ({
  isShow,
  style,
  className=CL,
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
    style={{...S.ROOT, ...style}}
    className={className}
    onClose={onClose}
  >
    <div>
      <D.RowCheckBox
        initValue={false}
        rootStyle={S.ROW_CB}
        caption="Not Zoom to Min-Max"
        onToggle={_toggleZoomMinMax}
      />
      <D.RowCheckBox
        initValue={false}
        rootStyle={S.ROW_CB}
        caption="Filter Zero Values"
        onToggle={_toggleFilterZero}
      />
    </div>
  </ModalPopup>
);
}

export default PaneOptions
