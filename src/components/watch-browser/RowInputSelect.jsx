import React, { PropTypes } from 'react';

//import InputSelect from '../zhn/InputSelect';
import InputSelect from '../zhn-select/InputSelect';
import STYLE from '../styles/DialogStyles';

const S = {
  CAPTION : {
    width: '120px'
  }
};

const RowInputSelect = ({ caption, options, isUpdateOptions, onSelect }) => (
  <div style={STYLE.rowDiv}>
     <span style={{...STYLE.labelSpan, ...S.CAPTION}}>
       {caption}
     </span>
     <InputSelect
        width="250"
        options={options}
        isUpdateOptions={isUpdateOptions}
        onSelect={onSelect}

     />
  </div>
);

RowInputSelect.propTypes = {
  caption : PropTypes.string,
  options : PropTypes.array,
  isUpdateOptions : PropTypes.bool,
  onSelect : PropTypes.func
}

export default RowInputSelect
