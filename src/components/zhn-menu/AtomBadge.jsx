import { useCallback } from '../uiApi';

import useTheme from '../hooks/useTheme';
import ButtonCircle2 from '../zhn/ButtonCircle2';

const TH_ID = 'ELEMENT'
, CL = "menu__badge"
, S_BADGE_OPEN = { color: '#a487d4' };

const AtomBadge = ({
  atomBadge,
  onOpen,
  onClose
}) => {
  const {
    is,
    value
  } = atomBadge.useAtomValue()
  , _hClick = useCallback(evt => {
    evt.stopPropagation();
    if (is){
      onClose();
    } else {
      onOpen();
    }
  }, [is, onOpen, onClose])
  , TS = useTheme(TH_ID)
  , _btStyle = is
       ? S_BADGE_OPEN
       : null;
  return value === 0 ? null : (
    <ButtonCircle2
      tabIndex="-1"
      className={CL}
      style={{..._btStyle, ...TS.BG}}
      caption={value}
      onClick={_hClick}
    />
  );
};

export default AtomBadge
