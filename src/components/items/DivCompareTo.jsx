import { forwardRef } from '../uiApi';

import SpanLabel from '../zhn-span/SpanLabel';
import DateField from '../zhn/DateField';

const S_ROW_INPUT = {
  display: 'flex',
  alignItems: 'center',
  marginTop: 8
}
, S_DATE_FIELD = {
   width: 120,
   marginLeft: 8,
   boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
}
, S_DIV_MSG = { marginTop: 6 }
, S_MSG = {
   color: '#f44336',
   fontWeight: 'bold'
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
     <SpanLabel label="CompareTo:" />
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
   {msgErr && <div style={S_DIV_MSG}>
       <span style={S_MSG}>
         {msgErr}
       </span>
     </div>
   }
 </div>
));

export default DivCompareTo
