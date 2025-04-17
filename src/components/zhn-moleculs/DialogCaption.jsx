import useMenuToggle from '../hooks/useMenuToggle';

import { BtSvgClose } from '../zhn/BtSvgX';
import MenuMore from './MenuMore';

import {
  CL_NOT_SELECTED,
  crElementCn
} from '../styleFn';

const CL_EL = crElementCn()
, S_CAPTION_DIV = {
  position: 'relative',
  padding: '5px 35px 5px 16px',
  textAlign: 'center',
  fontSize: '18px',
  fontWeight: 500,
}
, S_SVG_CLOSE = {
  top: 4
};

const DialogCaption = ({
  refBtMenuMore,
  menuModel,
  caption,
  onClose
}) => {
  const [
    isMenuMore,
    toggleMenuMore
  ] = useMenuToggle(refBtMenuMore);
  return (
    <div className={CL_EL} style={S_CAPTION_DIV}>
      <MenuMore
         refEl={refBtMenuMore}
         isMore={isMenuMore}
         menuModel={menuModel}
         toggle={toggleMenuMore}
      />
      <span className={CL_NOT_SELECTED}>
        {caption}
      </span>
      <BtSvgClose
         style={S_SVG_CLOSE}
         onClick={onClose}
      />
    </div>
  );
}

export default DialogCaption
