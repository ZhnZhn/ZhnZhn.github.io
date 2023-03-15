//import PropTypes from "prop-types";
import {
  useRef,
  useImperativeHandle,
  isInputValid,
  getInputValue
} from '../../uiApi';

import {
  crRowLabelStyle
} from '../../styles/DialogStyles';
import DateField from '../../zhn/DateField';

const RowDate = ({
  innerRef,
  isShowLabels,
  title='',
  initialValue,
  errorMsg,
  onTest
}) => {
 const _refDate = useRef(null)
 , [
   rowStyle,
   labelStyle
 ] = crRowLabelStyle(isShowLabels);

 useImperativeHandle(innerRef, () => ({
   getValue: () => getInputValue(_refDate),
   isValid: () => isInputValid(_refDate)
 }), []);

 return (
   <div style={rowStyle}>
     <span style={labelStyle}>
        {title}
     </span>
     <DateField
        ref={_refDate}
        initialValue={initialValue}
        errorMsg={errorMsg}
        onTest={onTest}
     />
  </div>
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
