import React, { useCallback } from 'react'

import D from '../dialogs/DialogCell'
import STYLE from './Modal.Style'

const TOGGLE_CHECKBOX_COLOR = '#1b75bb';
const CAPTION_CHECKBOX_COLOR = '#a487d4';

const S = {
  ROW: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  INLINE: {
    display: 'inline-block'
  },
  CAPTION: {
    maxWidth: 150
  },
  CHB_CAPTION: {
    display: 'inline-block',
    paddingLeft: 40
  }
};

const CheckBoxList = ({
  selectProps,
  crIsId,
  onToggle,
  onCheckCaption,
  onUnCheckCaption
}) => selectProps
 .map((item, index) => (
    <div style={S.ROW} key={item.id}>
      <D.RowCheckBox
        initValue={true}
        rootStyle={{ ...STYLE.ROW_CB, ...S.INLINE}}
        checkedColor={TOGGLE_CHECKBOX_COLOR}
        caption={item.caption}
        captionStyle={S.CAPTION}
        onToggle={() => onToggle(crIsId(item.id))}
      />
      <D.RowCheckBox
        initValue={index === 0}
        rootStyle={S.CHB_CAPTION}
        checkedColor={CAPTION_CHECKBOX_COLOR}
        onCheck={() => onCheckCaption(index)}
        onUnCheck={() => onUnCheckCaption(index)}
      />
  </div>
));


const ModalToggle = ({
  isShow, style, className=STYLE.CL,
  selectProps=[],
  isFd, isShowFd,
  isShowDate, isShowChart,
  noForDate=false,
  crIsId,
  onToggle,
  onCheckCaption, onUnCheckCaption,
  onClose
}) => {
  const _toggleFd = useCallback(
    onToggle.bind(null, 'isShowFd'), [])
  , _toggleChart = useCallback(
    onToggle.bind(null, 'isShowChart'), [])
  , _toggleDate = useCallback(
    onToggle.bind(null, 'isShowDate'), []);
  return (
  <D.ModalPopup
    isShow={isShow}
    style={{...STYLE.ROOT, ...style}}
    className={className}
    onClose={onClose}
  >
    <CheckBoxList
      selectProps={selectProps}
      crIsId={crIsId}
      onToggle={onToggle}
      onCheckCaption={onCheckCaption}
      onUnCheckCaption={onUnCheckCaption}
    />
    { isFd && <D.RowCheckBox
        key="isShowFd"
        value={isShowFd}
        rootStyle={STYLE.ROW_CB}
        checkedColor={TOGGLE_CHECKBOX_COLOR}
        caption="From Date"
        onToggle={_toggleFd}
      />
    }
    <D.RowCheckBox
      key="isShowChart"
      value={isShowChart}
      rootStyle={STYLE.ROW_CB}
      checkedColor={TOGGLE_CHECKBOX_COLOR}
      caption="Chart"
      onToggle={_toggleChart}
    />
    { !noForDate && <D.RowCheckBox
        key="isForDate"
        value={isShowDate}
        rootStyle={STYLE.ROW_CB}
        checkedColor={TOGGLE_CHECKBOX_COLOR}
        caption="For Date"
        onToggle={_toggleDate}
      />
    }
  </D.ModalPopup>
);
}

export default ModalToggle
