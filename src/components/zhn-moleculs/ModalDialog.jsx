import { useRef } from '../uiApi';
import { crDialogRole } from '../a11yFn';

import {
  crDialogCn,
  crShowHide,
  crAbsoluteTopLeftStyle,
  S_BOX_SHADOW
} from '../styleFn';

import { useKeyEscape } from '../hooks/fUseKey';
import useDialogFocus from './useDialogFocus';

import { RowFlexEnd } from '../dialogs/rows/RowFlex';
import FlatButton from '../zhn-m/FlatButton';
import FocusTrap from './FocusTrap';
import DialogCaption from './DialogCaption';

const CL_MODAL_DIALOG = crDialogCn('modal-dialog')
, S_ROOT_DIV_MODAL = {
  ...S_BOX_SHADOW,
  ...crAbsoluteTopLeftStyle('20%', '50%'),
  width: 380,
  marginLeft: -190,
  zIndex: 10
};

const CommandButtons = ({
  refBtClose,
  commandButtons,
  withoutClose,
  onClose
}) => (
  <RowFlexEnd>
    {commandButtons}
    {!withoutClose &&
       <FlatButton
         key="close"
         refBt={refBtClose}
         caption="Close"
         title="Close Modal Dialog"
         timeout={0}
         onClick={onClose}
       />
    }
  </RowFlexEnd>
);

const FN_NOOP = () => {};
const _hClickDialog = evt => {
  evt.stopPropagation()
}

const ModalDialog = ({
  refFocusLast,
  isShow,
  style,
  menuModel,
  caption,
  styleCaption,
  commandButtons,
  withoutClose,
  isWithButton=true,
  children,
  timeout=450,
  onClose=FN_NOOP
}) => {
  const refRoot = useRef()
  , refBtClose = useRef()
  , refBtMenuMore = useRef()
  , _hKeyDown = useKeyEscape(onClose)
  , [
    _className,
    _showHideStyle
  ] = crShowHide(
    isShow,
    CL_MODAL_DIALOG
  );

  useDialogFocus(isShow, refBtMenuMore, refRoot)

  return (
    <FocusTrap
      refEl={refRoot}
      refFirst={refBtMenuMore}
      refLast={refFocusLast || refBtClose}
      style={_showHideStyle}
    >
    {/*eslint-disable jsx-a11y/no-static-element-interactions*/}
     <div
        {...crDialogRole(isShow, caption)}
        ref={refRoot}
        className={_className}
        style={{
          ...S_ROOT_DIV_MODAL,
          ...style,
          ..._showHideStyle
        }}
        onClick={_hClickDialog}
        onKeyDown={_hKeyDown}
     >
     {/*eslint-enable jsx-a11y/no-static-element-interactions*/}
         <DialogCaption
            refBtMenuMore={refBtMenuMore}
            menuModel={menuModel}
            caption={caption}
            onClose={onClose}
         />
         <div>
           {children}
         </div>
         {isWithButton && <CommandButtons
            refBtClose={!withoutClose && isShow
              ? refBtClose
              : void 0
            }
            commandButtons={commandButtons}
            withoutClose={withoutClose}
            onClose={onClose}
         />}
    </div>
    </FocusTrap>
  );
};

export default ModalDialog
