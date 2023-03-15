import ModalPopup from '../zhn-moleculs/ModalPopup';
import RowCheckBox1 from '../dialogs/rows/RowCheckBox1';
import {
  CL_POPUP_MENU,
  S_MODAL_POPUP,
  S_ROW_CHB,
  TOGGLE_INPUT_CHECKBOX_COLOR
} from '../dialogs/modals/Style';

const S_MODAL = {
  ...S_MODAL_POPUP,
  lineHeight: 1.6,
  padding: '6px 14px'
};

const ModalInputToggle = ({
  isShow,
  configs,
  onClose
}) => (
  <ModalPopup
    isShow={isShow}
    className={CL_POPUP_MENU}
    style={S_MODAL}
    onClose={onClose}
  >
    {(configs || []).map(config => (
      <RowCheckBox1
        key={config[0]}
        style={S_ROW_CHB}
        color={TOGGLE_INPUT_CHECKBOX_COLOR}
        caption={config[0]}
        value={config[1]}
        onToggle={config[2]}
      />
    ))}
  </ModalPopup>
);

export default ModalInputToggle
