import { forwardRef } from 'react';

import InputText from '../zhn/InputText';
import {
  S_DIALOG_CAPTION,
  S_DIALOG_ROW
} from '../styles/DialogStyles';

const S_ROW = {
  ...S_DIALOG_ROW,
  lineHeight: 2
}
, S_CAPTION = {
  ...S_DIALOG_CAPTION,
  width: 120
}
, S_INPUT_TEXT = {
  width: 250,
  height: 30,
  paddingLeft: 10,
  marginLeft: 0,
  marginRight: 0
};

const RowInputText = forwardRef((
  { caption },
  ref
) => (
  <div style={S_ROW}>
     <span style={S_CAPTION}>
       {caption}
     </span>
     <InputText
        ref={ref}
        style={S_INPUT_TEXT}
     />
  </div>
))

export default RowInputText
