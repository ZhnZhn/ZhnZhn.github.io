import {
  isBool,
  isFn
} from '../../utils/isTypeFn';

import formatAllNumber from '../../utils/formatAllNumber';

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  isInputValid,
  focusRefElement
} from '../uiApi';

import {
  S_FLEX,
  crAbsoluteTopLeftStyle
} from '../styleFn';

import ModalPopup from '../zhn-moleculs/ModalPopup';
import {
  SpanValue,
  SpanDate
} from '../zhn/SpanToken';
import DivCompareTo from './DivCompareTo';

const S_MODAL_POPUP = {
  ...crAbsoluteTopLeftStyle(30, 0),
  zIndex: 20,
  padding: '5px 10px 10px 10px'
}
, S_ROW = {
  ...S_FLEX,
  justifyContent: 'space-between'
}
, S_DATE = {
  paddingLeft: 16,
  whiteSpace: 'nowrap'
};

const _isCompareTo = (
  isAdminMode,
  isDenyToChange
) => {
  const _isAdminMode = isFn(isAdminMode)
    ? isAdminMode()
    : isBool(isAdminMode)
        ? isAdminMode
        : false;
  return _isAdminMode && !isDenyToChange;
};

const RowValueDate = ({
  value,
  date
}) => (
  <div style={S_ROW}>
    <SpanValue>{formatAllNumber(value)}</SpanValue>
    <SpanDate style={S_DATE}>{date}</SpanDate>
  </div>
);

const ValueMovingModal = (
  props
) => {
  const {
    isShow,
    updateDateTo,
    valueMoving,
    isAdminMode,
    onClose
  } = props
  , [
    msgDateTo,
    setMsgDateTo
  ] = useState('')
  , _refInput = useRef()
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hEnterDate = useCallback(dateTo => {
    if (isInputValid(_refInput)){
      setMsgDateTo(updateDateTo(dateTo)
         ? ''
         : `No data for ${dateTo}`
      )
    }
  }, []);
  /*eslint-disable react-hooks/exhaustive-deps */

  useEffect(()=>{
    if (isShow) {
      focusRefElement(_refInput)
      setMsgDateTo('')
    }
  }, [props])

  const {
    value,
    date,
    valueTo,
    dateTo,
    isDenyToChange
  } = valueMoving;

  return (
    <ModalPopup
      isShow={isShow}
      style={S_MODAL_POPUP}
      onClose={onClose}
    >
      <RowValueDate value={value} date={date} />
      <RowValueDate value={valueTo} date={dateTo} />
      { _isCompareTo(isAdminMode, isDenyToChange)
        && <DivCompareTo
         refEl={_refInput}
         initialValue={dateTo}
         msgErr={msgDateTo}
         onEnter={_hEnterDate}
      />}
    </ModalPopup>
  );
}

/*
ModalValueMoving.propTypes = {
  valueMoving: PropTypes.shape({
    value: PropTypes.string,
    date: PropTypes.string,
    valueTo: PropTypes.string,
    dateTo: PropTypes.string,
    isDenyToChange: PropTypes.bool
  }),
  isAdminMode: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool
  ]),
  msgDateTo: PropTypes.string,
  updateDateTo: PropTypes.func,
  onClose: PropTypes.func
}
*/

export default ValueMovingModal
