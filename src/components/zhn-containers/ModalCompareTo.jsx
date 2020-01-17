import React, { useState, useCallback, useRef, useEffect } from 'react'

import DateUtils from '../../utils/DateUtils'

import ModalPopup from '../zhn-moleculs/ModalPopup'
import DivCompareTo from '../modals/DivCompareTo'

const { isDmy } = DateUtils;

const S = {
  ROOT: {
    position: 'absolute',
    top: 38,
    left: 6,
    zIndex : 10,
    width: 'auto',

    backgroundColor: 'inherit',
    border: '2px solid #1b2836',
    borderRadius: 5,
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 5px',
    padding: 10,
    paddingTop: 5,
    paddingBottom: 12,
    cursor: 'auto'
  }
};

const ModalCompareTo = ({ isShow, onClose, onCompareTo }) => {
  const _refInput = useRef()
   , [msgErr, setMsgErr] = useState('')
   , _onEnterDateTo = useCallback(dateTo => {
       if (isDmy(dateTo)) {
          const _r = onCompareTo(dateTo);
          if (_r !== 0) {
            setMsgErr(`No ${_r} data for ${dateTo}`)
          } else {
            setMsgErr('')
          }
        }
     }, []);
   useEffect(() => {
    if (isShow && _refInput.current) {
      _refInput.current.focusInput()
    }
   }, [isShow]);
  return (
    <ModalPopup
      isShow={isShow}
      style={S.ROOT}
      onClose={onClose}
    >
      <DivCompareTo
        ref={_refInput}
        msgErr={msgErr}
        onTest={isDmy}
        onEnter={_onEnterDateTo}
      />
    </ModalPopup>
  );
};

export default ModalCompareTo
