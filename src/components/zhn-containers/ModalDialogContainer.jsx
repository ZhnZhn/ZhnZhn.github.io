import { crPresentationRole } from '../a11yFn';
import {
  S_BLOCK,
  S_NONE
} from '../styleFn';

const CL_MODAL_ROOT = 'modal-root'
, CL_MODAL_ROOT_SHOWING = `${CL_MODAL_ROOT} show-modal`;

const ModalDialogContainer = ({
  isShow,
  onClose,
  children
}) => {
  const [
    _className,
    _style
  ] = isShow
    ? [CL_MODAL_ROOT_SHOWING, S_BLOCK]
    : [CL_MODAL_ROOT, S_NONE];
  /*eslint-disable jsx-a11y/no-static-element-interactions*/
  /*eslint-disable jsx-a11y/click-events-have-key-events*/
  return (
    <div
      {...crPresentationRole(isShow)}
      className={_className}
      style={_style}
      onClick={onClose}
    >
      {children}
    </div>
  );
  /*eslint-enable jsx-a11y/no-static-element-interactions*/
  /*eslint-enable jsx-a11y/click-events-have-key-events*/
};

export default ModalDialogContainer
