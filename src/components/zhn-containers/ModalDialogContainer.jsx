import { crPresentationRole } from '../a11yFn';

const CL_INIT = 'modal-root'
, CL_SHOWING = 'modal-root show-modal'
, S_SHOW = { display: 'block' }
, S_HIDE = { display: 'none' };

const ModalDialogContainer = ({
  isShow,
  onClose,
  children
}) => {
  const [
    _className,
    _style
  ] = isShow
    ? [CL_SHOWING, S_SHOW]
    : [CL_INIT, S_HIDE];
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
