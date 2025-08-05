import {
  isDmy
} from '../../utils/dateFn';

import {
  useState,
  useCallback
} from '../uiApi';

import {
  crAbsoluteTopLeftStyle
} from '../styleFn';
import {
  useRefFocusIf
} from '../hooks/useFocus';

import ModalPane from '../zhn-moleculs/ModalPane';
import DivCompareTo from '../items/DivCompareTo';

const S_MODAL_POPUP = {
  ...crAbsoluteTopLeftStyle(38, 6),
  zIndex: 20,
  padding: '5px 10px 12px 10px'
};

const ModalCompareTo = ({
  isShow,
  onCompareTo,
  onClose,
}) => {
  const _refInput = useRefFocusIf(isShow)
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
    <ModalPane
      isShow={isShow}
      style={S_MODAL_POPUP}
      onClose={onClose}
    >
      <DivCompareTo
        refEl={_refInput}
        msgErr={msgErr}
        onTest={isDmy}
        onEnter={_onEnterDateTo}
      />
    </ModalPane>
  );
};

export default ModalCompareTo
