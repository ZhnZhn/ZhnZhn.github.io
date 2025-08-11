import { ModalPopup } from '../../zhn-moleculs/ModalPopup';
import { S_MODAL_POPUP } from './Style';

const fModalPopup = Comp => ({
  isShow,
  style,
  className,
  onClose,
  ...restProps
}) => (
  <ModalPopup
    isShow={isShow}
    className={className}
    style={{...S_MODAL_POPUP, ...style}}
    onClose={onClose}
  >
    <Comp {...restProps} />
  </ModalPopup>
);

export default fModalPopup
