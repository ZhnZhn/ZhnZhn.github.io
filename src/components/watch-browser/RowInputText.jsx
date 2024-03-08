import { forwardRef } from '../uiApi';

import { SpanInputLabel } from '../zhn/SpanToken';
import InputText from '../zhn/InputText';
import { S_DIALOG_ROW } from '../styles/DialogStyles';

const S_ROW = {
  ...S_DIALOG_ROW,
  lineHeight: 2
}
, S_CAPTION = {
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
     <SpanInputLabel style={S_CAPTION}>
       {caption}
     </SpanInputLabel>
     <InputText
        ref={ref}
        style={S_INPUT_TEXT}
     />
  </div>
))

export default RowInputText
