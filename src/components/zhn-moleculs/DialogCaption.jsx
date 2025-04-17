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
  padding: '8px 35px 5px 16px',
  height: 34,
  borderRadius: '5px 5px 0 0',
  textAlign: 'center',
  fontSize: '18px',
  fontWeight: 500,
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
      <BtSvgClose onClick={onClose} />
    </div>
  );
}

export default DialogCaption
