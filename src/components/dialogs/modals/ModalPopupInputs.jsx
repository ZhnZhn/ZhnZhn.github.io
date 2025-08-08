import { useRef } from '../../uiApi';
import { useFocusFirstItem } from '../../hooks/useFocus';

import ModalPane from '../../zhn-moleculs/ModalPane';
import FocusTrap from '../../zhn-moleculs/FocusTrap';
import InputSwitch from '../../zhn/InputSwitch';

import {
  S_MODAL_POPUP,
  S_ROW_INPUT_SWITCH
} from './Style';

const ModalPopupInputs = (props) => {
  const _refFirstItem = useFocusFirstItem(props.isShow)
  , _refLastItem = useRef();
  return (
    <ModalPane
      isShow={props.isShow}
      className={props.className}
      style={{...S_MODAL_POPUP, ...props.style}}
      onClose={props.onClose}
    >
      <FocusTrap
        refFirst={_refFirstItem}
        refLast={_refLastItem}
      >
        <InputSwitch
          key="isShowLabels"
          refEl={_refFirstItem}
          style={S_ROW_INPUT_SWITCH}
          caption="Input Labels"
          initialValue={props.isShowLabels}
          onToggle={props.onToggleLabels}
        />
        {props.children(_refLastItem)}
      </FocusTrap>
    </ModalPane>
  );
}

export default ModalPopupInputs
