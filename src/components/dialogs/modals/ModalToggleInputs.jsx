import { safeMap } from '../../uiApi';

import ModalPopupInputs from './ModalPopupInputs';
import RowCheckBox3 from '../rows/RowCheckBox3';

import {
  S_ROW,
  S_INPUT_SWITCH
} from './Style';

const ModalToggleInputs = (props) => (
  <ModalPopupInputs {...props}>
    {safeMap(props.configs, config => (
      <RowCheckBox3
        key={config[0]}
        style={{...S_ROW, ...S_INPUT_SWITCH}}
        caption={config[0]}
        value={config[1]}
        onToggle={config[2]}
      />
    ))}
  </ModalPopupInputs>
);

export default ModalToggleInputs
