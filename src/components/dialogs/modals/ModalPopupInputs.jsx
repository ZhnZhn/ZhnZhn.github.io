import ModalPopup from '../../zhn-moleculs/ModalPopup';
import RowCheckBox3 from '../rows/RowCheckBox3';

import {
  S_MODAL_POPUP,
  S_ROW_INPUT_SWITCH
} from './Style';

const ModalPopupInputs = (props) => (
  <ModalPopup
    isShow={props.isShow}
    style={{...S_MODAL_POPUP, ...props.style}}
    className={props.className}
    onClose={props.onClose}
  >
    <RowCheckBox3
      key="isShowLabels"
      style={S_ROW_INPUT_SWITCH}
      caption="Input Labels"
      value={props.isShowLabels}
      onToggle={props.onToggleLabels}
    />
    {props.children}
  </ModalPopup>
);

export default ModalPopupInputs
