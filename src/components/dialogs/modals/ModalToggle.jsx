import { useCallback } from 'react';

import ModalPopup from '../../zhn-moleculs/ModalPopup';
import RowCheckBox from '../rows/RowCheckBox';
import STYLE from './Style';

const TOGGLE_CHECKBOX_COLOR = '#1b75bb';
const CAPTION_CHECKBOX_COLOR = '#a487d4';

const S = {
  ROW: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: 3
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
      <RowCheckBox
        initValue={true}
        style={{ ...STYLE.ROW_CHB, ...S.INLINE}}
        checkedColor={TOGGLE_CHECKBOX_COLOR}
        caption={item.caption}
        captionStyle={S.CAPTION}
        onToggle={() => onToggle(crIsId(item.id))}
      />
      <RowCheckBox
        initValue={index === 0}
        style={S.CHB_CAPTION}
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
  isCh=true, isShowDate, isShowChart,
  noForDate=false,
  crIsId,
  onToggle,
  onCheckCaption, onUnCheckCaption,
  onClose
}) => {
  /*eslint-disable react-hooks/exhaustive-deps */
  const _toggleFd = useCallback(
    onToggle.bind(null, 'isShowFd'), [])
  , _toggleChart = useCallback(
    onToggle.bind(null, 'isShowChart'), [])
  , _toggleDate = useCallback(
    onToggle.bind(null, 'isShowDate'), []);
    /*eslint-enable react-hooks/exhaustive-deps */
  return (
  <ModalPopup
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
    { isFd && <RowCheckBox
        key="isShowFd"
        value={isShowFd}
        style={STYLE.ROW_CHB}
        checkedColor={TOGGLE_CHECKBOX_COLOR}
        caption="From Date"
        onToggle={_toggleFd}
      />
    }
    { isCh && <RowCheckBox
        key="isShowChart"
        value={isShowChart}
        style={STYLE.ROW_CHB}
        checkedColor={TOGGLE_CHECKBOX_COLOR}
        caption="Chart"
        onToggle={_toggleChart}
      />
    }
    { !noForDate && <RowCheckBox
        key="isForDate"
        value={isShowDate}
        style={STYLE.ROW_CHB}
        checkedColor={TOGGLE_CHECKBOX_COLOR}
        caption="For Date"
        onToggle={_toggleDate}
      />
    }
  </ModalPopup>
  );
}

export default ModalToggle
