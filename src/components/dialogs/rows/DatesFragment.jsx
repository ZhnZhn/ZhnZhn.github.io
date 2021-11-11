import { forwardRef, useRef, useImperativeHandle } from 'react';
//import PropTypes from "prop-types";

import DateField from '../../zhn/DateField';
import crRowStyle from './crRowStyle'

const FORMAT_ERR_MSG = "YYYY-MM-DD format must be";
const NEAR_ERR_MSG = "From Date is near that To Date";

const _isPeriodValid = (from, to) => from<=to
, _msgOnNotValidFormat = (item='Date') => `${item} is not in valid format`;

const _getValue = ref => ref.current.getValue()
, _getTrimValue = ref => _getValue(ref).trim()
, _isValid = ref => ref.current.isValid()
, _setValue = (ref, value) => ref.current.setValue(value);

const DatesFragment = forwardRef(({
  isShowLabels=true,
  placeholder,
  fromCaption='From Date',
  initFromDate,
  toCaption='To Date',
  initToDate,
  dateStyle,
  errMsg=FORMAT_ERR_MSG,
  isPeriodValid=_isPeriodValid,
  msgOnNotValidFormat=_msgOnNotValidFormat,
  onTestDate,
  onEnter
}, ref) => {
  const _refFrom = useRef()
  , _refTo = useRef()
  , { rowStyle, labelStyle } = crRowStyle({ isShowLabels });

  useImperativeHandle(ref, () => ({
    getValues: () => ({
      fromDate: _getValue(_refFrom),
      toDate: _getValue(_refTo)
    }),
    getValidation: () => {
      const datesMsg = [];

      if (!_isValid(_refFrom)) {
        datesMsg.push(msgOnNotValidFormat('From Date'));
      }
      if (!_isValid(_refTo)) {
        datesMsg.push(msgOnNotValidFormat('To Date'));
      }

      if (datesMsg.length === 0 && !isPeriodValid(
        _getTrimValue(_refFrom),
        _getTrimValue(_refTo)
      )) {
        datesMsg.push(NEAR_ERR_MSG);
      }

      if (datesMsg.length>0){
        return { isValid: false, datesMsg };
      }
      return { isValid: true };
    },
    focusInput: () => _refFrom.current.focus(),
    setFromTo: (fromStr, toStr) => {
      _setValue(_refFrom, fromStr)
      _setValue(_refTo, toStr)
    }
  }), [isPeriodValid, msgOnNotValidFormat])

  return (
    <div>
      <div style={rowStyle}>
        <span style={labelStyle}>
           {fromCaption}
        </span>
        <DateField
           ref={_refFrom}
           style={dateStyle}
           placeholder={placeholder}
           initialValue={initFromDate}
           errorMsg={errMsg}
           onTest={onTestDate}
           onEnter={onEnter}
        />
     </div>
     <div style={rowStyle}>
        <span style={labelStyle}>
          {toCaption}
        </span>
        <DateField
           ref={_refTo}
           style={dateStyle}
           placeholder={placeholder}
           initialValue={initToDate}
           errorMsg={errMsg}
           onTest={onTestDate}
           onEnter={onEnter}
        />
     </div>
   </div>
  );
})

/*
DatesFragment.propTypes = {
  isShowLabels: PropTypes.bool,
  dateStyle: PropTypes.object,
  placeholder: PropTypes.string,
  initFromDate: PropTypes.string,
  initToDate: PropTypes.string,
  fromCaption: PropTypes.string,
  toCaption: PropTypes.string,
  errMsg: PropTypes.string,
  onTestDate: PropTypes.func,
  isPeriodValid: PropTypes.func,
  msgOnNotValidFormat: PropTypes.func,
  onEnter: PropTypes.func
}
*/

export default DatesFragment
