import useMenuToggle from '../hooks/useMenuToggle';

import { BtSvgClose } from '../zhn/BtSvgX';
import MenuMore from './MenuMore';

import {
  CL_NOT_SELECTED,
  crElementCn
} from '../styleFn';
import {
  S_CAPTION_DIV,
  S_SVG_CLOSE
} from './Dialog.Style';

const CL_EL = crElementCn();

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
         ref={refBtMenuMore}
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
