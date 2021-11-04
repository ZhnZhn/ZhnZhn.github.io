import { useCallback } from 'react';

import ModalPopup from '../../zhn-moleculs/ModalPopup';
import ItemStack from '../../zhn/ItemStack';
import RowCheckBox from '../rows/RowCheckBox';
import {
  CL_POPUP_MENU,
  S_MODAL_POPUP,
  S_ROW_CHB
} from './Style';

const TOGGLE_CHECKBOX_COLOR = '#1b75bb'
, CAPTION_CHECKBOX_COLOR = '#a487d4'

, S_ROW = {
  display: 'flex',
  justifyContent: 'space-between',
  paddingTop: 3
}
, S_INLINE = { display: 'inline-block' }
, S_CAPTION = { maxWidth: 150 }
, S_CHB_CAPTION = {
  display: 'inline-block',
  paddingLeft: 40
};

const _isBool = is => typeof is === 'boolean'

const _crCheckBoxItem = (
  item,
  index, {
    crIsId,
    onToggle,
    onCheckCaption,
    onUnCheckCaption
  }
) => (
  <div style={S_ROW} key={item.id}>
    <RowCheckBox
      initValue={_isBool(item.isRow) ? item.isRow : true}
      style={{...S_ROW_CHB, ...S_INLINE}}
      checkedColor={TOGGLE_CHECKBOX_COLOR}
      caption={item.caption}
      captionStyle={S_CAPTION}
      onToggle={() => onToggle(crIsId(item.id))}
    />
    <RowCheckBox
      initValue={index === 0}
      style={S_CHB_CAPTION}
      checkedColor={CAPTION_CHECKBOX_COLOR}
      onCheck={() => onCheckCaption(index)}
      onUnCheck={() => onUnCheckCaption(index)}
    />
  </div>
);

const ModalToggle = ({
  isShow,
  style, className=CL_POPUP_MENU,
  selectProps,
  isFd, isShowFd,
  isCh=true, isShowDate, isShowChart,
  noForDate=false,
  crIsId,
  onToggle,
  onCheckCaption,
  onUnCheckCaption,
  onClose
}) => {
  /*eslint-disable react-hooks/exhaustive-deps */
  const _toggleFd = useCallback(
    onToggle.bind(null, 'isShowFd'), [])
  , _toggleChart = useCallback(
    onToggle.bind(null, 'isShowChart'), [])
  , _toggleDate = useCallback(
    onToggle.bind(null, 'isShowDate'), []);
    //onToggle
    /*eslint-enable react-hooks/exhaustive-deps */
  return (
  <ModalPopup
    isShow={isShow}
    style={{...S_MODAL_POPUP, ...style}}
    className={className}
    onClose={onClose}
  >
    <ItemStack
      items={selectProps}
      crItem={_crCheckBoxItem}
      crIsId={crIsId}
      onToggle={onToggle}
      onCheckCaption={onCheckCaption}
      onUnCheckCaption={onUnCheckCaption}
    />
    { isFd && <RowCheckBox
        key="isShowFd"
        value={isShowFd}
        style={S_ROW_CHB}
        checkedColor={TOGGLE_CHECKBOX_COLOR}
        caption="From Date"
        onToggle={_toggleFd}
      />
    }
    { isCh && <RowCheckBox
        key="isShowChart"
        value={isShowChart}
        style={S_ROW_CHB}
        checkedColor={TOGGLE_CHECKBOX_COLOR}
        caption="Chart"
        onToggle={_toggleChart}
      />
    }
    { !noForDate && <RowCheckBox
        key="isForDate"
        value={isShowDate}
        style={S_ROW_CHB}
        checkedColor={TOGGLE_CHECKBOX_COLOR}
        caption="For Date"
        onToggle={_toggleDate}
      />
    }
  </ModalPopup>
  );
}

export default ModalToggle
