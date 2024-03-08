//import PropTypes from "prop-types";

import { SpanInputLabel } from '../zhn/SpanToken';
import InputSelect from '../zhn-select/InputSelect';

import { S_DIALOG_ROW } from '../styles/DialogStyles';

const S_CAPTION = {
  width: 120
};

const RowInputSelect = ({
  caption,
  options,
  onSelect
}) => (
  <div style={S_DIALOG_ROW}>
     <SpanInputLabel style={S_CAPTION}>
       {caption}
     </SpanInputLabel>
     <InputSelect
        width="250"
        options={options}
        onSelect={onSelect}
     />
  </div>
);

/*
RowInputSelect.propTypes = {
  caption: PropTypes.string,
  options: PropTypes.array,
  onSelect: PropTypes.func
}
*/

export default RowInputSelect
