import { useRef, useImperativeHandle } from 'react';
//import PropTypes from "prop-types";

import DateField from '../../zhn/DateField';
import crRowStyle from './crRowStyle'

const RowDate = ({
  innerRef,
  isShowLabels, labelTitle='', initValue,
  errorMsg, onTestDate
}) => {
 const _refDate = useRef(null)
 , { rowStyle, labelStyle } = crRowStyle({ isShowLabels });
 useImperativeHandle(innerRef, () => ({
   getValue: () => _refDate.current.getValue(),
   isValid: () => _refDate.current.isValid
 }), []);
 return (
   <div style={rowStyle}>
     <span style={labelStyle}>
        {labelTitle}
     </span>
     <DateField
        ref={_refDate}
        initialValue={initValue}
        errorMsg={errorMsg}
        onTest={onTestDate}
     />
  </div>
 );
}

/*
RowDate.propTypes = {
  innerRef: PropTypes.object,
  isShowLabels: PropTypes.bool,
  labelTitle : PropTypes.string,
  initValue : PropTypes.string,
  errorMsg : PropTypes.string,
  onTestDate : PropTypes.func
}
*/

export default RowDate
