//import PropTypes from "prop-types";
import {
  forwardRef,
  useRef,
  useImperativeHandle,
  setRefValue,
  focusRefElement,
  isInputValid,
  getInputValue
} from '../../uiApi';

import {
  crRowLabelStyle
} from '../../styles/DialogStyles';
import { SpanInputLabel } from '../../zhn/SpanToken';
import DateField from '../../zhn/DateField';

const FORMAT_ERR_MSG = "YYYY-MM-DD format must be";
const NEAR_ERR_MSG = "From Date is near that To Date";

const _isPeriodValid = (from, to) => from<=to
, _msgOnNotValidFormat = (item='Date') => `${item} is not in valid format`;

const _getTrimValue = ref => (getInputValue(ref) || '').trim();

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
  , [
    rowStyle,
    labelStyle
  ] = crRowLabelStyle(isShowLabels);

  useImperativeHandle(ref, () => ({
    getValues: () => ({
      fromDate: getInputValue(_refFrom),
      toDate: getInputValue(_refTo)
    }),
    getValidation: () => {
      const datesMsg = [];

      if (!isInputValid(_refFrom)) {
        datesMsg.push(msgOnNotValidFormat('From Date'));
      }
      if (!isInputValid(_refTo)) {
        datesMsg.push(msgOnNotValidFormat('To Date'));
      }

      if (datesMsg.length === 0 && !isPeriodValid(
        _getTrimValue(_refFrom),
        _getTrimValue(_refTo)
      )) {
        datesMsg.push(NEAR_ERR_MSG);
      }
      return datesMsg.length>0
        ? { isValid: false, datesMsg }
        : { isValid: true };
    },
    focusInput: () => focusRefElement(_refFrom),
    setFromTo: (fromStr, toStr) => {
      setRefValue(_refFrom, fromStr)
      setRefValue(_refTo, toStr)
    }
  }), [isPeriodValid, msgOnNotValidFormat])

  return (
    <div>
      <div style={rowStyle}>
        <SpanInputLabel style={labelStyle}>
           {fromCaption}
        </SpanInputLabel>
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
        <SpanInputLabel style={labelStyle}>
          {toCaption}
        </SpanInputLabel>
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
