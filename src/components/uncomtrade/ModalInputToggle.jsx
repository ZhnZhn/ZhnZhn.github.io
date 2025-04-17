import ModalPopup from '../zhn-moleculs/ModalPopup';
import RowCheckBox3 from '../dialogs/rows/RowCheckBox3';
import {
  S_MODAL_POPUP,
  S_ROW,
  TOGGLE_INPUT_CHECKBOX_COLOR
} from '../dialogs/modals/Style';

const ModalInputToggle = ({
  isShow,
  configs,
  onClose
}) => (
  <ModalPopup
    isShow={isShow}
    style={S_MODAL_POPUP}
    onClose={onClose}
  >
    {(configs || []).map(config => (
      <RowCheckBox3
        key={config[0]}
        style={S_ROW}
        color={TOGGLE_INPUT_CHECKBOX_COLOR}
        caption={config[0]}
        value={config[1]}
        onToggle={config[2]}
      />
    ))}
  </ModalPopup>
);

export default ModalInputToggle
