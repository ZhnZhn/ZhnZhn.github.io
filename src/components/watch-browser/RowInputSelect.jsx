//import PropTypes from "prop-types";

import InputSelect from '../zhn-select/InputSelect';
import STYLE from '../styles/DialogStyles';

const S = {
  CAPTION: {
    ...STYLE.CAPTION,
    width: 120
  }
};

const RowInputSelect = ({ caption, options, onSelect }) => (
  <div style={STYLE.ROW}>
     <span style={S.CAPTION}>
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
