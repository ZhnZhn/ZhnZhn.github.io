import { useRef, useImperativeHandle } from 'react';
//import PropTypes from "prop-types";

import DateField from '../../zhn/DateField';
import crRowStyle from './crRowStyle';

const _getCurrent = ref => ref.current;

const RowDate = ({
  innerRef,
  isShowLabels,
  title='', initialValue,
  errorMsg, onTest
}) => {
 const _refDate = useRef(null)
 , { rowStyle, labelStyle } = crRowStyle({ isShowLabels });
 useImperativeHandle(innerRef, () => ({
   getValue: () => _getCurrent(_refDate).getValue(),
   isValid: () => _getCurrent(_refDate).isValid()
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
