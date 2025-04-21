import { isDmy } from '../../utils/dateFn';

import { S_FLEX } from '../styleFn';

import { SpanBoldBlack } from './SpanToken';
import DateField from './DateField';
import { S_BOX_SHADOW } from './Input.Style';

const S_ROW_INPUT = {
  ...S_FLEX,
  alignItems: 'center',
  marginTop: 8
}
, S_DATE_FIELD = {
   ...S_BOX_SHADOW,
   width: 120,
   marginLeft: 8
}
, REQUIRED_DATE_FORMAT = "DD-MM-YYYY";

const InputDmy = ({
  refEl,
  caption,
  initialValue,
  onTest=isDmy,
  onEnter
}) => (
  <label style={S_ROW_INPUT} >
    <SpanBoldBlack>{caption}</SpanBoldBlack>
    <DateField
      refEl={refEl}
      style={S_DATE_FIELD}
      initialValue={initialValue}
      placeholder={REQUIRED_DATE_FORMAT}
      errorMsg={REQUIRED_DATE_FORMAT}
      onTest={onTest}
      onEnter={onEnter}
    />
  </label>
);

export default InputDmy
