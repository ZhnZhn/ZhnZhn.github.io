import { safeMap } from '../../uiApi';

import ModalPopup from '../../zhn-moleculs/ModalPopup';

import RowCheckBoxInputLabels from '../rows/RowCheckBoxInputLabels';
import RowCheckBox3 from '../rows/RowCheckBox3';

import {
  S_MODAL_POPUP,
  S_ROW,
  S_INPUT_SWITCH
} from './Style';

const ModalToggleInputs = ({
  isShow,
  isShowLabels,
  configs,
  onToggleLabels,
  onClose
}) => (
  <ModalPopup
    isShow={isShow}
    style={S_MODAL_POPUP}
    onClose={onClose}
  >
    <RowCheckBoxInputLabels
      value={isShowLabels}
      onToggle={onToggleLabels}
    />
    {safeMap(configs, config => (
      <RowCheckBox3
        key={config[0]}
        style={{...S_ROW, ...S_INPUT_SWITCH}}
        caption={config[0]}
        value={config[1]}
        onToggle={config[2]}
      />
    ))}
  </ModalPopup>
);

export default ModalToggleInputs
