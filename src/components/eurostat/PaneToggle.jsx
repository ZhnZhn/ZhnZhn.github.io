import React from 'react'

import ModalPopup from '../zhn-moleculs/ModalPopup'
import RowCheckBox from '../dialogs/RowCheckBox'

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

const CheckBoxList = ({
  selectProps, crIsId, onToggle
}) => selectProps
 .map(item => (
    <RowCheckBox
      key={item.id}
      initValue={false}
      rootStyle={S.ROW_CB}
      caption={item.caption}
      onToggle={() => onToggle(crIsId(item.id))}
    />
));

const PaneToggle = ({
  isShow, style, className=CL,
  selectProps=[], isShowDate,
  crIsId, onToggle,
  onClose
}) => (
  <ModalPopup
    isShow={isShow}
    style={{...S.ROOT, ...style}}
    className={className}
    onClose={onClose}
  >
    <div>
      <CheckBoxList
        selectProps={selectProps}
        crIsId={crIsId}
        onToggle={onToggle}
      />
      <RowCheckBox
        key="isForDate"
        value={isShowDate}
        rootStyle={S.ROW_CB}
        caption="For Date"
        onToggle={() => onToggle('isShowDate')}
      />
    </div>
  </ModalPopup>
);

export default PaneToggle
