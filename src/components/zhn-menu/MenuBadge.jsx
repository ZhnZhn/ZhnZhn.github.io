import { useCallback } from '../uiApi';

import useTheme from '../hooks/useTheme';
import ButtonCircle2 from '../zhn/ButtonCircle2';

const TH_ID = 'ELEMENT'
, CL = "menu__badge"
, S_BADGE_OPEN = { color: '#a487d4' };

const MenuBadge = ({
  isOpen,
  counter,
  onClick,
  onBadgeClose
}) => {
  const _hClick = useCallback(event => {
    event.stopPropagation();
    if (!isOpen){
      onClick();
    } else {
      onBadgeClose();
    }
  }, [isOpen, onClick, onBadgeClose])
  , TS = useTheme(TH_ID)
  , _btStyle = isOpen
        ? S_BADGE_OPEN
        : null;
  return (
    <ButtonCircle2
      tabIndex="-1"
      className={CL}
      style={{..._btStyle, ...TS.BG}}
      caption={counter}
      onClick={_hClick}
    />
  );
};

export default MenuBadge
