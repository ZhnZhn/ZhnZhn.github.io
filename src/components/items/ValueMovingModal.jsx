import React, { useState, useRef, useCallback, useEffect } from 'react';
//import PropTypes from "prop-types";

import DateUtils from '../../utils/DateUtils'
import formatAllNumber from '../../utils/formatAllNumber'

import ModalPopup from '../zhn-moleculs/ModalPopup'
import SpanValue from '../zhn-span/SpanValue'
import SpanDate from '../zhn-span/SpanDate'
import DivCompareTo from './DivCompareTo'

const { isDmy } = DateUtils;

const S = {
  ROOT: {
    position: 'absolute',
    top: 25,
    left: 0,
    zIndex : 10,
    width: 'auto',
    backgroundColor: 'inherit',
    padding: 10,
    paddingTop: 5,
    paddingBottom: 10,
    border: '2px solid #1b2836',
    borderRadius: 5,
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 5px',
    cursor: 'auto'
  },
  ROW: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  DATE: {
    display: 'inline-block',
    paddingLeft: 16,
    whiteSpace: 'nowrap'
  }
};

const _isNotAdminMode = (isAdminMode, isDenyToChange) => {
  const _isAdminMode = typeof isAdminMode == 'function'
    ? isAdminMode()
    : typeof isAdminMode == 'boolean'
        ? isAdminMode
        : false;
  return !_isAdminMode || isDenyToChange;
};

const RowValueDate = ({ value, date }) => (
  <div style={S.ROW}>
    <SpanValue value={formatAllNumber(value)} />
    <SpanDate date={date} style={S.DATE} />
  </div>
);


const ValueMovingModal = (props) => {
  const {
    isShow, updateDateTo,
    valueMoving, isAdminMode, onClose
  } = props
  , [msgDateTo, setMsgDateTo] = useState('')
  , _refInput = useRef()
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hEnterDate = useCallback(dateTo => {
    if (isDmy(dateTo)){
      if (updateDateTo(dateTo)){
        setMsgDateTo('')
      } else {
        setMsgDateTo(`No data for ${dateTo}`)
      }
    }
  }, []);
  /*eslint-disable react-hooks/exhaustive-deps */

  useEffect(()=>{
    if (isShow) {
      if (_refInput.current) {
        _refInput.current.focus()
      }
      if (msgDateTo) {
        setMsgDateTo('')
      }
    }
  }, [props])

  const {
    value, date,
    valueTo, dateTo,
    isDenyToChange
  } = valueMoving;

  return (
    <ModalPopup
      isShow={isShow}
      style={S.ROOT}
      onClose={onClose}
    >
      <RowValueDate value={value} date={date} />
      <RowValueDate value={valueTo} date={dateTo} />
      { !_isNotAdminMode(isAdminMode, isDenyToChange)
        && <DivCompareTo
         ref={_refInput}
         initialValue={dateTo}
         msgErr={msgDateTo}
         onTest={isDmy}
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
