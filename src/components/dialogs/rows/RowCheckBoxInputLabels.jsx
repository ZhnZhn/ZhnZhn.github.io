import {
  S_ROW,
  S_INPUT_SWITCH
} from '../modals/Style';

import RowCheckBox3 from './RowCheckBox3';

const RowCheckBoxInputLabels = props => (
  <RowCheckBox3
    key="isShowLabels"
    style={{...S_ROW, ...S_INPUT_SWITCH}}
    caption="Input Labels"
    value={props.value}
    onToggle={props.onToggle}
  />
);

export default RowCheckBoxInputLabels
