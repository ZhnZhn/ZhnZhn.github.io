import { isBool } from '../../../utils/isTypeFn';

import {
  S_FLEX,
  S_INLINE
} from '../../styleFn';

import ItemStack from '../../zhn/ItemStack';
import InputSwitch from '../../zhn/InputSwitch';

import { ModalPopupInputs } from './ModalPopups';
import RowCheckBox1 from '../rows/RowCheckBox1';

import {
  S_ROW,
  S_INPUT_SWITCH,
  S_ROW_INPUT_SWITCH,
  TOGGLE_CAPTION_CHECKBOX_COLOR
} from './Style';

const S_ROW_FLEX = {
  ...S_ROW,
  ...S_FLEX,
  justifyContent: 'space-between'
}
, S_CHB_CAPTION = {
  ...S_INLINE,
  padding: '0 0 0 40px'
};

const _crChbToggleInitValue = (
  isRow
) => isBool(isRow)
  ? isRow
  : !0;

const _crCheckBoxItem = (
  item,
  index, {
    onToggle,
    onCheckCaption,
    onUnCheckCaption
  }
) => (
  <div style={S_ROW_FLEX} key={item.id}>
    <InputSwitch
      initialValue={_crChbToggleInitValue(item.isRow)}
      style={S_INPUT_SWITCH}
      caption={item.caption}
      onCheck={() => onToggle(item.id, !0)}
      onUnCheck={() => onToggle(item.id, !1)}
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

const ModalToggle = (props) => (
  <ModalPopupInputs {...props}>
    {(refLastItem) => (<>
      <ItemStack
        items={props.selectProps}
        crItem={_crCheckBoxItem}
        onToggle={props.onToggle}
        onCheckCaption={props.onCheckCaption}
        onUnCheckCaption={props.onUnCheckCaption}
      />
      {props.isFd && <InputSwitch
        key="isShowFd"
        refEl={refLastItem}
        style={S_ROW_INPUT_SWITCH}
        caption="From Date"
        initialValue={props.isShowFd}
        onToggle={props.onToggleFd}
      />}
      {props.isCh && props.onToggleChart && <InputSwitch
        key="isShowChart"
        refEl={refLastItem}
        style={S_ROW_INPUT_SWITCH}
        caption="Chart"
        initialValue={props.isShowChart}
        onToggle={props.onToggleChart}
      />}
    </>)}
  </ModalPopupInputs>
);

export default ModalToggle
