import { fCrModalPopup } from '../zhn-moleculs/ModalPopup';
import { S_MODAL_MENU } from './ModalMenu.Style';

const crModalPopup = fCrModalPopup((_, style)=>({
  style: {...S_MODAL_MENU, ...style}
}));

export default crModalPopup
