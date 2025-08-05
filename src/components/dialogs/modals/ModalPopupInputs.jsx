import { useRef } from '../../uiApi';
import { useAsyncFocusFirstItemIf } from '../../hooks/useFocus';

import ModalPane from '../../zhn-moleculs/ModalPane';
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
    <ModalPane
      isShow={props.isShow}
      className={props.className}
      style={{...S_MODAL_POPUP, ...props.style}}
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
    </ModalPane>
  );
}

export default ModalPopupInputs
