import { safeMap } from '../../uiApi';

import ModalPopupInputs from './ModalPopupInputs';
import InputSwitch from '../../zhn/InputSwitch';

import { S_ROW_INPUT_SWITCH } from './Style';

const ModalToggleInputs = (props) => (
  <ModalPopupInputs {...props}>
    {safeMap(props.configs, config => (
      <InputSwitch
        key={config[0]}
        style={S_ROW_INPUT_SWITCH}
        caption={config[0]}
        initialValue={config[1]}
        onToggle={config[2]}
      />
    ))}
  </ModalPopupInputs>
);

export default ModalToggleInputs
