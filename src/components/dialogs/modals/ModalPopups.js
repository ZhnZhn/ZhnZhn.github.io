import { fCrModalPopup } from '../../zhn-moleculs/ModalPopup';

import { S_MODAL_POPUP } from './Style';
import ModalOptionsView from './ModalOptionsView';
import ModalPopupInputsView from './ModalPopupInputsView';

const _crModalPopup = fCrModalPopup((
  className,
  style
) => ({
  className,
  style: {...S_MODAL_POPUP, ...style}
}));

export const ModalOptions = _crModalPopup(ModalOptionsView)
export const ModalPopupInputs = _crModalPopup(ModalPopupInputsView)
