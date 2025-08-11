import { safeMap } from '../../uiApi';

import { ModalPopupInputs } from './ModalPopups';
import InputSwitch from '../../zhn/InputSwitch';

import { S_ROW_INPUT_SWITCH } from './Style';

const ModalToggleInputs = (props) => (
  <ModalPopupInputs {...props}>
    {(refLastItem) => safeMap(props.configs, (config, index) => (
      <InputSwitch
        key={config[0]}
        refEl={index === props.configs.length - 1 ? refLastItem : void 0}
        style={S_ROW_INPUT_SWITCH}
        caption={config[0]}
        initialValue={config[1]}
        onToggle={config[2]}
      />
    ))}
  </ModalPopupInputs>
);

export default ModalToggleInputs
