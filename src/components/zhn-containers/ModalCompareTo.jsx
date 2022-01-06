import { useState, useCallback } from 'react';

import useFocus from '../hooks/useFocus';
import DateUtils from '../../utils/DateUtils';

import ModalPopup from '../zhn-moleculs/ModalPopup';
import DivCompareTo from '../items/DivCompareTo';

const { isDmy } = DateUtils;

const S_MODAL_POPUP = {
  position: 'absolute',
  top: 38,
  left: 6,
  zIndex : 20,
  width: 'auto',
  padding: '5px 10px 12px 10px',
  backgroundColor: 'inherit',
  border: '2px solid #1b2836',
  borderRadius: 5,
  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 5px',
  cursor: 'auto'
};

const ModalCompareTo = ({
  isShow,
  onCompareTo,
  onClose,
}) => {
  const _refInput = useFocus(isShow)
  , [msgErr, setMsgErr] = useState('')
  , _onEnterDateTo = useCallback(dateTo => {
   if (isDmy(dateTo)) {
      const _r = onCompareTo(dateTo)
      , _msgErr = (_r !== 0)
          ? `No ${_r} data for ${dateTo}`
          : '';
      setMsgErr(_msgErr)
   }
  }, [onCompareTo]);

  return (
    <ModalPopup
      isShow={isShow}
      style={S_MODAL_POPUP}
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
