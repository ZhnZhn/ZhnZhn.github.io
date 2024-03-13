import { forwardRef } from '../uiApi';

import { SpanInputLabel } from '../zhn/SpanToken';
import InputText from '../zhn/InputText';
import { RowFlex } from '../dialogs/rows/RowFlex';

const S_LH_2 = {
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
  <RowFlex style={S_LH_2}>
     <SpanInputLabel style={S_CAPTION}>
       {caption}
     </SpanInputLabel>
     <InputText
        ref={ref}
        style={S_INPUT_TEXT}
     />
  </RowFlex>
))

export default RowInputText
