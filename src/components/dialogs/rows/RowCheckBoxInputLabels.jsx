import {
  S_ROW,
  TOGGLE_INPUT_CHECKBOX_COLOR
} from '../modals/Style';

import RowCheckBox3 from './RowCheckBox3';

const RowCheckBoxInputLabels = props => (
  <RowCheckBox3
    key="isShowLabels"
    style={S_ROW}
    color={TOGGLE_INPUT_CHECKBOX_COLOR}
    caption="Input Labels"
    value={props.value}
    onToggle={props.onToggle}
  />
);

export default RowCheckBoxInputLabels
