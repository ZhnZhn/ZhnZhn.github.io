import { useRef } from '../../uiApi';
import { useAsyncFocusFirstItemIf } from '../../hooks/useFocus';

import ModalPopup from '../../zhn-moleculs/ModalPopup';
import InputSwitch from '../../zhn/InputSwitch';

import {
  S_MODAL_POPUP,
  S_ROW_INPUT_SWITCH
} from './Style';

const ModalPopupInputs = (props) => {
  const _refFirstItem = useRef();
  useAsyncFocusFirstItemIf(
    props.isShow,
    _refFirstItem
  );
  return (
    <ModalPopup
      isShow={props.isShow}
      style={{...S_MODAL_POPUP, ...props.style}}
      className={props.className}
      onClose={props.onClose}
    >
      <InputSwitch
        key="isShowLabels"
        refEl={_refFirstItem}
        style={S_ROW_INPUT_SWITCH}
        caption="Input Labels"
        initialValue={props.isShowLabels}
        onToggle={props.onToggleLabels}
      />
      {props.children}
    </ModalPopup>
  );
}

export default ModalPopupInputs
