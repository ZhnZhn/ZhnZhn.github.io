import { forwardRef } from '../uiApi';

import { SpanLabel } from '../zhn/SpanToken';
import DateField from '../zhn/DateField';
import {
  S_BOX_SHADOW,
  S_ERR
} from '../zhn/Input.Style';

const S_ROW_INPUT = {
  display: 'flex',
  alignItems: 'center',
  marginTop: 8
}
, S_DATE_FIELD = {
   ...S_BOX_SHADOW,
   width: 120,
   marginLeft: 8
}
, S_MT_6 = {
  marginTop: 6
};

const DivCompareTo = forwardRef(({
  initialValue,
  msgErr,
  onTest,
  onEnter
}, ref) => (
  <div>
   {/* eslint-disable jsx-a11y/label-has-associated-control */ }
   <label style={S_ROW_INPUT} >
     <SpanLabel>CompareTo:</SpanLabel>
     <DateField
       ref={ref}
       style={S_DATE_FIELD}
       initialValue={initialValue}
       placeholder="DD-MM-YYYY"
       errorMsg="DD-MM-YYYY"
       onTest={onTest}
       onEnter={onEnter}
     />
   </label>
   {/* eslint-enable jsx-a11y/label-has-associated-control */ }
   {msgErr && <div style={S_MT_6}>
       <span style={S_ERR}>
         {msgErr}
       </span>
     </div>
   }
 </div>
));

export default DivCompareTo
