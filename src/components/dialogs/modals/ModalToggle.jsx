import { isBool } from '../../../utils/isTypeFn';

import ModalPopup from '../../zhn-moleculs/ModalPopup';
import ItemStack from '../../zhn/ItemStack';

import RowCheckBox1 from '../rows/RowCheckBox1';
import RowCheckBox2 from '../rows/RowCheckBox2';
import RowCheckBox3 from '../rows/RowCheckBox3';

import {
  CL_POPUP_MENU,
  S_MODAL_POPUP,
  S_ROW,
  TOGGLE_INPUT_CHECKBOX_COLOR,
  TOGGLE_CAPTION_CHECKBOX_COLOR
} from './Style';

const S_ROW_FLEX = {
  ...S_ROW,
  display: 'flex',
  justifyContent: 'space-between'
}
, S_CAPTION = {
  maxWidth: 150,
  textAlign: 'left'
}
, S_CHB_TOGGLE = {
  display: 'inline-block',
  padding: void 0
}
, S_CHB_CAPTION = {
  display: 'inline-block',
  padding: '0 0 0 40px'
};

const _crChbToggleInitValue = (
  isRow
) => isBool(isRow)
  ? isRow
  : true;

const _crCheckBoxItem = (
  item,
  index, {
    onToggle,
    onCheckCaption,
    onUnCheckCaption
  }
) => (
  <div style={S_ROW_FLEX} key={item.id}>
    <RowCheckBox2
      initialValue={_crChbToggleInitValue(item.isRow)}
      style={S_CHB_TOGGLE}
      color={TOGGLE_INPUT_CHECKBOX_COLOR}
      caption={item.caption}
      captionStyle={S_CAPTION}
      onToggle={() => onToggle(item.id)}
    />
    <RowCheckBox1
      style={S_CHB_CAPTION}
      color={TOGGLE_CAPTION_CHECKBOX_COLOR}
      initialValue={index === 0}
      onCheck={() => onCheckCaption(index)}
      onUnCheck={() => onUnCheckCaption(index)}
    />
  </div>
);

const ModalToggle = ({
  isShow,
  style,
  className=CL_POPUP_MENU,
  selectProps,
  isFd,
  isShowFd,
  isCh,
  isShowChart,
  onToggle,
  onCheckCaption,
  onUnCheckCaption,
  onToggleFd,
  onToggleChart,
  onClose
}) => (
  <ModalPopup
    isShow={isShow}
    style={{...S_MODAL_POPUP, ...style}}
    className={className}
    onClose={onClose}
  >
    <ItemStack
      items={selectProps}
      crItem={_crCheckBoxItem}
      onToggle={onToggle}
      onCheckCaption={onCheckCaption}
      onUnCheckCaption={onUnCheckCaption}
    />
    { isFd && <RowCheckBox3
        key="isShowFd"
        style={S_ROW}
        color={TOGGLE_INPUT_CHECKBOX_COLOR}
        caption="From Date"
        value={isShowFd}
        onToggle={onToggleFd}
      />
    }
    { isCh && onToggleChart && <RowCheckBox3
        key="isShowChart"
        style={S_ROW}
        color={TOGGLE_INPUT_CHECKBOX_COLOR}
        caption="Chart"
        value={isShowChart}
        onToggle={onToggleChart}
      />
    }
  </ModalPopup>
);

export default ModalToggle
