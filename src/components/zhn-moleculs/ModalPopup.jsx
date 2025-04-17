import {
  CL_POPUP_MENU,
  crCn,
  crElementBorderCn
} from '../styleFn';

import ShowHide from '../zhn/ShowHide';
import ModalPane from './ModalPane';

const ModalPopup = ({
  isShow,
  className,
  style,
  children,
  onClose
}) => (
  <ModalPane
    isShow={isShow}
    onClose={onClose}
  >
    <ShowHide
      className={crElementBorderCn(crCn(CL_POPUP_MENU, className))}
      style={style}
      isShow={isShow}
    >
      {children}
    </ShowHide>
  </ModalPane>
);

export default ModalPopup
