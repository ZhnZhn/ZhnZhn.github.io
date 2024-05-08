//import PropTypes from "prop-types";
import {
  useRef,
  useImperativeHandle,
  isInputValid,
  getInputValue
} from '../../uiApi';

import { SpanInputLabel } from '../../zhn/SpanToken';
import DateField from '../../zhn/DateField';

import { RowFlex } from './RowFlex';
import crRowLabelStyle from './crRowLabelStyle';

const RowDate = (props) => {
 const {
   innerRef,
   title='',
   initialValue,
   errorMsg,
   onTest
 } = props
 , _refDate = useRef(null);

 useImperativeHandle(innerRef, () => ({
   getValue: () => getInputValue(_refDate),
   isValid: () => isInputValid(_refDate)
 }), []);

 return (
   <RowFlex>
     <SpanInputLabel style={crRowLabelStyle(props)}>
        {title}
     </SpanInputLabel>
     <DateField
        refEl={_refDate}
        initialValue={initialValue}
        errorMsg={errorMsg}
        onTest={onTest}
     />
  </RowFlex>
 );
}

/*
RowDate.propTypes = {
  innerRef: PropTypes.object,
  isShowLabels: PropTypes.bool,
  title: PropTypes.string,
  initialValue: PropTypes.string,
  errorMsg: PropTypes.string,
  onTest: PropTypes.func
}
*/

export default RowDate
