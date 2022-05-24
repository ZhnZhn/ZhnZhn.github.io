//import PropTypes from "prop-types";

import InputSelect from '../zhn-select/InputSelect';
import {
  S_DIALOG_CAPTION,
  S_DIALOG_ROW
} from '../styles/DialogStyles';

const S_CAPTION = {
  ...S_DIALOG_CAPTION,
  width: 120
};

const RowInputSelect = ({
  caption,
  options,
  onSelect
}) => (
  <div style={S_DIALOG_ROW}>
     <span style={S_CAPTION}>
       {caption}
     </span>
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
