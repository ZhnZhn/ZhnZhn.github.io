import { forwardRef } from 'react';
//import PropTypes from "prop-types";

import InputText from '../zhn/InputText';
import STYLE from '../styles/DialogStyles';

const S = {
  ROW : {
    ...STYLE.ROW,
    lineHeight: 2
  },
  CAPTION : {
    ...STYLE.CAPTION,
    width: 120
  },
  INPUT_TEXT : {
    width : 250,
    height: 30,
    paddingLeft: 10,
    marginLeft : 0,
    marginRight: 0
  }
}

const RowInputText = forwardRef(({ caption }, ref) => (
  <div style={S.ROW}>
     <span style={S.CAPTION}>
       {caption}
     </span>
     <InputText
        ref={ref}
        style={S.INPUT_TEXT}
     />
  </div>
))

/*
RowInputText.propTypes = {
  caption: PropTypes.string
}
*/

export default RowInputText
